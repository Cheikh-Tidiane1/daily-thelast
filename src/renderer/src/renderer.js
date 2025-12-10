// src/renderer/main.js
const ICONS = {
  all: `<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
  javascript: `<svg viewBox="0 0 24 24"><path d="M3 3h18v18H3V3zm10.5 13.5h3v-9h-3v9zm-4.5 0V12H6v4.5h3z"/></svg>`,
  python: `<svg viewBox="0 0 24 24"><path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>`,
  webdev: `<svg viewBox="0 0 24 24"><path d="M19 9h-4V5H9v4H5v6h4v4h6v-4h4V9zm-8 8H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>`,
  devops: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
  react: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.26.02-.52.05-.78L8 12l-4-.5C3.4 12.3 3 13.13 3 14c0 3.87 3.13 7 7 7v-3l4-4 4 4v3c3.87 0 7-3.13 7-7 0-.87-.4-1.7-1-2.5L16 11.5V12c0 4.41-3.59 8-8 8z"/></svg>`,
  rust: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`,
  ai: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>`,
  github: `<svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.497.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.34-3.369-1.34-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.029 1.592 1.029 2.683 0 3.843-2.339 4.687-4.566 4.935.359.31.678.92.678 1.854 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.139 20.163 22 16.42 22 12c0-5.523-4.477-10-10-10z"/></svg>`,
  beginners: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`,
  tutorial: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>`
}
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
let currentPage = 1
let isLoading = false
let hasMore = true // suppose qu’il y a plus au départ

const fallbackImage = 'https://via.placeholder.com/300x160/2d2d2d/aaaaaa?text=No+Image'
const fallbackAuthor = 'https://via.placeholder.com/40x40/cccccc/666666?text=?'

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

// Charger les articles (remplace ou ajoute selon reset)
async function loadArticles(tag = null, page = 1, reset = true) {
  const grid = document.getElementById('articles-grid')
  const content = document.getElementById('content')
  if (!grid || !content) return

  if (isLoading) return
  if (!hasMore && !reset) return

  isLoading = true

  try {
    let url = `https://dev.to/api/articles?per_page=30&page=${page}`
    if (tag) url += `&tag=${encodeURIComponent(tag)}`

    if (reset) {
      grid.innerHTML = '<div class="loading">Chargement…</div>'
      currentPage = 1
      hasMore = true
    }

    const res = await fetch(url)
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    const articles = await res.json()

    if (reset) {
      grid.innerHTML = ''
    }

    if (articles.length === 0) {
      hasMore = false
      if (reset) {
        grid.innerHTML = '<div class="error">Aucun article trouvé.</div>'
      }
      return
    }

    // Ajouter chaque article
    articles.forEach((article) => {
      const imageUrl =
        article.cover_image && isValidHttpUrl(article.cover_image)
          ? article.cover_image
          : fallbackImage

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
          : fallbackAuthor

      const card = document.createElement('div')
      card.className = 'article-card'

      const img = document.createElement('img')
      img.className = 'card-image'
      img.alt = escapeHtml(article.title)
      img.loading = 'lazy'
      img.src = imageUrl
      img.onerror = () => {
        img.src = fallbackImage
        img.onerror = null
      }

      card.innerHTML = `
        <div class="card-content">
          <h3 class="card-title">${escapeHtml(article.title)}</h3>
          <div class="card-tags">${tagElements}</div>
          <div class="card-meta">
            <div class="card-author">
              <img src="${authorImage}" alt="${authorName}"
                   onerror="this.src='${fallbackAuthor}'; this.onerror=null;">
              <span>${authorName}</span>
            </div>
            <div class="card-time"><span>• ${readingTime}</span></div>
          </div>
        </div>
      `
      card.insertBefore(img, card.firstChild)

      card.addEventListener('click', () => {
        if (window.electron?.ipcRenderer) {
          window.electron.ipcRenderer.send('open-external-url', article.url)
        } else {
          window.open(article.url, '_blank')
        }
      })

      grid.appendChild(card)
    })

    // Si on a moins de 30 articles, c’est la fin
    if (articles.length < 30) {
      hasMore = false
    }

    if (hasMore && !reset) {
      // Ajouter un indicateur de chargement en bas
      const loader = document.createElement('div')
      loader.className = 'loading'
      loader.style.gridColumn = '1 / -1'
      loader.textContent = 'Chargement…'
      loader.id = 'infinite-loader'
      grid.appendChild(loader)
    } else if (!hasMore) {
      // Fin du flux
      const end = document.createElement('div')
      end.style.gridColumn = '1 / -1'
      end.style.textAlign = 'center'
      end.style.color = '#666'
      end.style.padding = '20px'
      end.textContent = '🔚 Fin du flux'
      grid.appendChild(end)
    }
  } catch (err) {
    console.error('Erreur chargement articles:', err)
    if (reset) {
      document.getElementById('articles-grid').innerHTML =
        `<div class="error">❌ Échec du chargement.<br>${err.message}</div>`
    }
  } finally {
    isLoading = false
    // Supprimer l’ancien loader si présent
    const loader = document.getElementById('infinite-loader')
    if (loader) loader.remove()
  }
}

// Charger plus d’articles
function loadMoreArticles() {
  if (isLoading || !hasMore) return
  currentPage++
  loadArticles(currentTag, currentPage, false)
}

// Gérer le scroll infini
function setupInfiniteScroll() {
  const content = document.getElementById('content')
  if (!content) return

  let ticking = false

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = content
        if (scrollTop + clientHeight >= scrollHeight - 200) {
          // À 200px de la fin → charger plus
          loadMoreArticles()
        }
        ticking = false
      })
      ticking = true
    }
  }

  content.addEventListener('scroll', onScroll, { passive: true })
}

function renderTagList() {
  const tagList = document.getElementById('tag-list')
  if (!tagList) return

  tagList.innerHTML = ''

  // "Tous"
  const allItem = document.createElement('li')
  allItem.innerHTML = `${ICONS.all} Tous`
  if (currentTag === null) allItem.classList.add('active')
  allItem.addEventListener('click', () => {
    currentTag = null
    renderTagList()
    loadArticles(null, 1, true)
  })
  tagList.appendChild(allItem)

  // Tags avec icônes
  TAGS.forEach((tag) => {
    const icon = ICONS[tag] || ICONS.tutorial // fallback
    const li = document.createElement('li')
    li.innerHTML = `${icon} #${tag}`
    if (currentTag === tag) li.classList.add('active')
    li.addEventListener('click', () => {
      currentTag = tag
      renderTagList()
      loadArticles(tag, 1, true)
    })
    tagList.appendChild(li)
  })
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  renderTagList()
  loadArticles(null, 1, true)
  setupInfiniteScroll()
})
