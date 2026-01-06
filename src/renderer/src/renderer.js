// === ICÔNES POUR LA SIDEBAR ===
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

const DEFAULT_TAGS = [
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

// === ÉTAT GLOBAL ===
let TAGS = [...DEFAULT_TAGS]
const savedTags = localStorage.getItem('userTags')
if (savedTags) {
  try {
    const parsed = JSON.parse(savedTags)
    if (Array.isArray(parsed) && parsed.length > 0) {
      TAGS = parsed
    }
  } catch (e) {
    console.warn('Invalid saved tags', e)
  }
}

let currentTag = null
let currentSearchQuery = null
let currentPage = 1
let isLoading = false
let hasMore = true

// ✅ Bien définir LES DEUX fallbacks
const fallbackImage = 'https://via.placeholder.com/300x160/2d2d2d/aaaaaa?text=No+Image'
const fallbackAuthor = 'https://via.placeholder.com/40x40/cccccc/666666?text=?'

// === UTILITAIRES ===
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

function generateFallbackImage(article) {
  const title = article.title.substring(0, 60) + (article.title.length > 60 ? '...' : '')
  const firstTag = article.tag_list && article.tag_list[0] ? article.tag_list[0] : 'article'
  const colors = {
    javascript: { bg: '#f7df1e', text: '#000' },
    python: { bg: '#3776ab', text: '#fff' },
    react: { bg: '#61dafb', text: '#000' },
    webdev: { bg: '#4a90e2', text: '#fff' },
    rust: { bg: '#ce422b', text: '#fff' },
    ai: { bg: '#9b59b6', text: '#fff' },
    tutorial: { bg: '#27ae60', text: '#fff' },
    default: { bg: '#2d3748', text: '#fff' }
  }
  const color = colors[firstTag] || colors.default
  const svg = `
<svg width="300" height="160" xmlns="http://www.w3.org/2000/svg">
<rect width="300" height="160" fill="${color.bg}"/>
<foreignObject width="280" height="140" x="10" y="10">
<div xmlns="http://www.w3.org/1999/xhtml" style="
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 20px;
box-sizing: border-box;
font-family: Arial, sans-serif;
">
<div style="
color: ${color.text};
font-size: 16px;
font-weight: bold;
text-align: center;
line-height: 1.4;
margin-bottom: 10px;
">${escapeHtml(title)}</div>
<div style="
color: ${color.text};
opacity: 0.8;
font-size: 12px;
background: rgba(0,0,0,0.2);
padding: 4px 12px;
border-radius: 12px;
">#${escapeHtml(firstTag)}</div>
</div>
</foreignObject>
</svg>
`
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`
}

async function loadArticles(tag = null, page = 1, reset = true) {
  const grid = document.getElementById('articles-grid')
  const content = document.getElementById('content')
  const titleEl = document.querySelector('#content h1')
  if (!grid || !content) return

  if (isLoading) return
  if (!hasMore && !reset) return
  isLoading = true

  // Mettre à jour le titre
  if (titleEl) {
    if (currentSearchQuery) {
      titleEl.textContent = `Résultats pour "${currentSearchQuery}"`
    } else if (currentTag) {
      titleEl.textContent = `#${currentTag}`
    } else {
      titleEl.textContent = 'Koor Dev Daily'
    }
  }

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

    if (reset) grid.innerHTML = ''

    if (articles.length === 0) {
      hasMore = false
      if (reset) {
        grid.innerHTML = '<div class="error">Aucun article trouvé pour ce tag.</div>'
      }
      return
    }

    articles.forEach((article) => {
      let imageUrl
      if (article.cover_image && isValidHttpUrl(article.cover_image)) {
        imageUrl = article.cover_image
      } else {
        imageUrl = generateFallbackImage(article)
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
          : fallbackAuthor

      const card = document.createElement('div')
      card.className = 'article-card'

      const img = document.createElement('img')
      img.className = 'card-image'
      img.alt = escapeHtml(article.title)
      img.loading = 'lazy'
      img.src = imageUrl
      img.onerror = () => {
        if (img.src !== fallbackImage) {
          img.src = fallbackImage
          img.onerror = null
        }
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
          window.electron.ipcRenderer.send('open-article-window', article.url)
        } else {
          // Fallback : ouvrir dans le navigateur (dev only)
          window.open(article.url, '_blank')
        }
      })

      grid.appendChild(card)
    })

    if (articles.length < 30) hasMore = false

    if (hasMore && !reset) {
      const loader = document.createElement('div')
      loader.className = 'loading'
      loader.style.gridColumn = '1 / -1'
      loader.textContent = 'Chargement…'
      loader.id = 'infinite-loader'
      grid.appendChild(loader)
    } else if (!hasMore) {
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
      grid.innerHTML = `<div class="error">❌ Échec du chargement.<br>${err.message}</div>`
    }
  } finally {
    isLoading = false
    const loader = document.getElementById('infinite-loader')
    if (loader) loader.remove()
  }
}

// === SCROLL INFINI ===
function loadMoreArticles() {
  if (isLoading || !hasMore) return
  currentPage++
  loadArticles(currentTag, currentPage, false)
}

function setupInfiniteScroll() {
  const content = document.getElementById('content')
  if (!content) return
  let ticking = false
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = content
        if (scrollTop + clientHeight >= scrollHeight - 200) {
          loadMoreArticles()
        }
        ticking = false
      })
      ticking = true
    }
  }
  content.addEventListener('scroll', onScroll, { passive: true })
}

// === RECHERCHE ===
function setupSearchBar() {
  const searchBar = document.getElementById('searchBar')
  if (!searchBar) return

  let searchTimeout = null

  searchBar.addEventListener('input', (e) => {
    const rawQuery = e.target.value.trim()
    if (searchTimeout) clearTimeout(searchTimeout)

    searchTimeout = setTimeout(() => {
      if (!rawQuery) {
        // Pas de recherche → flux général
        currentSearchQuery = null
        currentTag = null
        renderTagList()
        loadArticles(null, 1, true)
        return
      }

      // Nettoyer le texte pour en faire un tag plausible
      // Ex: "Spring Boot" → "spring"
      // On prend le premier mot, on le met en minuscules, on retire les caractères spéciaux
      const firstWord = rawQuery.split(/\s+/)[0].toLowerCase()
      const cleanedTag = firstWord.replace(/[^a-z0-9]/g, '')

      // Si le tag est vide, on ne fait rien
      if (!cleanedTag) {
        currentSearchQuery = null
        currentTag = null
        renderTagList()
        loadArticles(null, 1, true)
        return
      }

      // Utiliser ce tag comme filtre
      currentSearchQuery = rawQuery // pour l'affichage du titre
      currentTag = cleanedTag // pour l'API
      renderTagList()
      loadArticles(cleanedTag, 1, true)
    }, 500)
  })
}

// === SIDEBAR ===
function renderTagList() {
  const tagList = document.getElementById('tag-list')
  if (!tagList) return
  tagList.innerHTML = ''

  const isSearchMode = currentSearchQuery !== null

  const allItem = document.createElement('li')
  allItem.innerHTML = `${ICONS.all} Tous`
  if (currentTag === null && !isSearchMode) allItem.classList.add('active')
  if (!isSearchMode) {
    allItem.addEventListener('click', () => {
      currentTag = null
      currentSearchQuery = null
      const searchBar = document.getElementById('searchBar')
      if (searchBar) searchBar.value = ''
      renderTagList()
      loadArticles(null, 1, true)
    })
  }
  tagList.appendChild(allItem)

  TAGS.forEach((tag) => {
    const icon = ICONS[tag] || ICONS.tutorial
    const li = document.createElement('li')
    li.innerHTML = `${icon} #${tag}`
    if (currentTag === tag && !isSearchMode) li.classList.add('active')
    if (!isSearchMode) {
      li.addEventListener('click', () => {
        currentTag = tag
        currentSearchQuery = null
        const searchBar = document.getElementById('searchBar')
        if (searchBar) searchBar.value = ''
        renderTagList()
        loadArticles(tag, 1, true)
      })
    }
    tagList.appendChild(li)
  })

  // ✅ Bouton "Modifier les tags" fonctionnel dès la 1ère fois
  const editBtn = document.getElementById('editTagsBtn')
  if (editBtn && !editBtn._initialized) {
    editBtn.onclick = () => {
      showOnboarding([...TAGS])
    }
    editBtn._initialized = true
  }
}

// === ONBOARDING ===
function showOnboarding(initialTags = []) {
  const onboardingEl = document.getElementById('onboarding')
  onboardingEl.style.display = 'flex'

  const searchInput = document.getElementById('searchInput')
  const tagsContainer = document.getElementById('tagsContainer')
  const nextBtn = document.getElementById('nextBtn')
  let selectedTags = [...initialTags]

  const ALL_AVAILABLE_TAGS = [
    'data-science',
    'ai',
    'database',
    'elixir',
    'architecture',
    'cloud',
    'devops',
    'crypto',
    'java',
    'golang',
    'gaming',
    'javascript',
    'machine-learning',
    'mobile',
    '.net',
    'open-source',
    'react',
    'python',
    'ruby',
    'rust',
    'security',
    'testing',
    'tech-news',
    'tools',
    'webdev',
    'github',
    'beginners',
    'tutorial'
  ]

  function renderOnboardingTags(filter = '') {
    tagsContainer.innerHTML = ''
    const filtered = ALL_AVAILABLE_TAGS.filter((tag) =>
      tag.toLowerCase().includes(filter.toLowerCase())
    )
    filtered.forEach((tag) => {
      const btn = document.createElement('button')
      btn.textContent = tag
      btn.style.padding = '8px 16px'
      btn.style.borderRadius = '20px'
      btn.style.background = selectedTags.includes(tag) ? '#0070f3' : '#2d2d2d'
      btn.style.color = selectedTags.includes(tag) ? 'white' : '#cccccc'
      btn.style.border = selectedTags.includes(tag) ? '1px solid #0056b3' : '1px solid transparent'
      btn.style.cursor = 'pointer'
      btn.onclick = () => {
        const idx = selectedTags.indexOf(tag)
        if (idx === -1) {
          selectedTags.push(tag)
        } else {
          selectedTags.splice(idx, 1)
        }
        renderOnboardingTags(filter)
        nextBtn.disabled = selectedTags.length === 0
      }
      tagsContainer.appendChild(btn)
    })
  }

  renderOnboardingTags()
  nextBtn.disabled = selectedTags.length === 0

  searchInput.addEventListener('input', (e) => {
    renderOnboardingTags(e.target.value)
  })

  const handleNext = () => {
    localStorage.setItem('userTags', JSON.stringify(selectedTags))
    TAGS = selectedTags
    onboardingEl.style.display = 'none'
    renderTagList()
    setupSearchBar()
    loadArticles(null, 1, true)
    setupInfiniteScroll()
    nextBtn.removeEventListener('click', handleNext)
  }

  nextBtn.addEventListener('click', handleNext)
}

// === DÉMARRAGE ===
document.addEventListener('DOMContentLoaded', () => {
  const hasUserTags = localStorage.getItem('userTags') !== null

  if (hasUserTags) {
    renderTagList()
    loadArticles(null, 1, true)
    setupInfiniteScroll()
    setupSearchBar()
  } else {
    showOnboarding([])
  }
})
