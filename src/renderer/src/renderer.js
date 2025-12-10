// renderer/renderer.js

// Fallbacks stables
const FALLBACK_IMAGE = 'https://via.placeholder.com/600x300/e0e0e0/999999?text=No+Image'
const FALLBACK_AUTHOR = 'https://via.placeholder.com/40x40/cccccc/666666?text=?'

// Échapper HTML (sécurité basique)
function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return ''
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Vérifier si c'est une URL HTTP(S) valide
function isValidHttpUrl(string) {
  try {
    const url = new URL(string)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch (_) {
    return false
  }
}

// Charger les articles depuis dev.to
async function loadArticles() {
  const grid = document.getElementById('articles-grid')
  if (!grid) return

  try {
    const res = await fetch('https://dev.to/api/articles?per_page=30')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const articles = await res.json()

    grid.innerHTML = ''

    if (!articles.length) {
      grid.innerHTML = '<div class="error">Aucun article trouvé.</div>'
      return
    }

    articles.forEach((article) => {
      const imageUrl =
        article.cover_image && isValidHttpUrl(article.cover_image)
          ? article.cover_image
          : FALLBACK_IMAGE

      const authorImage =
        article.user?.profile_image && isValidHttpUrl(article.user.profile_image)
          ? article.user.profile_image
          : FALLBACK_AUTHOR

      const excerpt =
        article.description || article.body_markdown?.substring(0, 120) + '…' || article.title

      const card = document.createElement('div')
      card.className = 'article-card'
      card.innerHTML = `
        <img class="card-image" src="${imageUrl}" alt="${escapeHtml(article.title)}" loading="lazy">
        <div class="card-content">
          <h3 class="card-title">${escapeHtml(article.title)}</h3>
          <p class="card-excerpt">${escapeHtml(excerpt)}</p>
          <div class="card-author">
            <img src="${authorImage}" alt="${escapeHtml(article.user?.name || 'Auteur')}" 
                 onerror="this.src='${FALLBACK_AUTHOR}'; this.onerror=null;">
            <span>${escapeHtml(article.user?.name || 'Anonyme')}</span>
          </div>
        </div>
      `

      // ✅ Ouvrir dans le navigateur système via IPC (sécurisé)
      card.addEventListener('click', () => {
        if (window.electron?.ipcRenderer) {
          window.electron.ipcRenderer.send('open-external-url', article.url)
        } else {
          // Fallback (ne devrait pas arriver)
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

// Initialisation
function init() {
  document.addEventListener('DOMContentLoaded', () => {
    loadArticles()
  })
}

init()
