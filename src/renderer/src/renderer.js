// src/renderer/main.js

const TAGS = [
  'javascript',
  'python',
  'webdev',
  'devops',
  'react',
  'rust',
  'ai',
  'github',
  'beginners',
  'tutorial'
]
let currentTag = null

function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return ''
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function isValidHttpUrl(string) {
  try {
    const url = new URL(string)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch (_) {
    return false
  }
}

async function loadArticles(tag = null) {
  const grid = document.getElementById('articles-grid')
  if (!grid) return

  try {
    let url = 'https://dev.to/api/articles?per_page=30'
    if (tag) url += `&tag=${encodeURIComponent(tag)}`

    grid.innerHTML = '<div class="loading">Chargement des articles…</div>'

    const res = await fetch(url)
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    const articles = await res.json()

    grid.innerHTML = ''

    if (!articles.length) {
      grid.innerHTML = '<div class="error">Aucun article trouvé.</div>'
      return
    }

    articles.forEach((article) => {
      // Fallback image fiable
      const fallbackImage = 'https://via.placeholder.com/300x160/2d2d2d/aaaaaa?text=No+Image'
      let imageUrl = fallbackImage
      if (article.cover_image && isValidHttpUrl(article.cover_image)) {
        imageUrl = article.cover_image
      }

      const tagElements =
        article.tag_list
          ?.slice(0, 3)
          .map((tag) => `<span class="card-tag">${escapeHtml(tag)}</span>`)
          .join('') || ''

      const readingTime = article.reading_time ? `${article.reading_time} min` : '5 min'
      const authorName = escapeHtml(article.user?.name || 'Anonyme')
      const authorImage =
        article.user?.profile_image && isValidHttpUrl(article.user.profile_image)
          ? article.user.profile_image
          : 'https://via.placeholder.com/40x40/cccccc/666666?text=?'

      // Créer la card
      const card = document.createElement('div')
      card.className = 'article-card'

      // Créer l'image de manière sécurisée
      const img = document.createElement('img')
      img.className = 'card-image'
      img.alt = escapeHtml(article.title)
      img.loading = 'lazy'

      // Gestion d'erreur robuste
      img.onerror = () => {
        img.src = fallbackImage
        img.onerror = null // Évite la boucle
      }
      img.src = imageUrl

      // Contenu textuel
      card.innerHTML = `
        <div class="card-content">
          <h3 class="card-title">${escapeHtml(article.title)}</h3>
          <div class="card-tags">
            ${tagElements}
          </div>
          <div class="card-meta">
            <div class="card-author">
              <img src="${authorImage}" alt="${authorName}"
                   onerror="this.src='https://via.placeholder.com/40x40/cccccc/666666?text=?'; this.onerror=null;">
              <span>${authorName}</span>
            </div>
            <div class="card-time">
              <span>• ${readingTime}</span>
            </div>
          </div>
        </div>
      `

      // Insérer l'image en haut
      card.insertBefore(img, card.firstChild)

      // Clic → ouvrir l'article
      card.addEventListener('click', () => {
        if (window.electron?.ipcRenderer) {
          window.electron.ipcRenderer.send('open-external-url', article.url)
        } else {
          window.open(article.url, '_blank')
        }
      })

      grid.appendChild(card)
    })
  } catch (err) {
    console.error('Erreur chargement articles:', err)
    grid.innerHTML = `<div class="error">❌ Échec du chargement.<br>${err.message}</div>`
  }
}

function renderTagList() {
  const tagList = document.getElementById('tag-list')
  if (!tagList) return

  tagList.innerHTML = ''

  const allItem = document.createElement('li')
  allItem.textContent = 'Tous'
  if (currentTag === null) allItem.classList.add('active')
  allItem.addEventListener('click', () => {
    currentTag = null
    renderTagList()
    loadArticles(null)
  })
  tagList.appendChild(allItem)

  TAGS.forEach((tag) => {
    const li = document.createElement('li')
    li.textContent = `#${tag}`
    if (currentTag === tag) li.classList.add('active')
    li.addEventListener('click', () => {
      currentTag = tag
      renderTagList()
      loadArticles(tag)
    })
    tagList.appendChild(li)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  renderTagList()
  loadArticles(null)
})
