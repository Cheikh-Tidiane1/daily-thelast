# daily.dev Clone – Electron App

Une application de bureau open-source inspirée de [daily.dev](https://daily.dev), construite avec **Electron.js**.  
Elle agrège les derniers articles de développeurs depuis l’API publique de **dev.to** et les affiche dans une interface moderne, épurée et fonctionnelle.

## ✨ Fonctionnalités

- 📰 Affichage du flux d’articles récents (titre, résumé, tags, auteur, durée de lecture)
- 🖼️ Cartes avec images ou fallbacks SVG personnalisés
- 🔍 Recherche par **tag** (ex: `javascript`, `react`, `spring`)
- 🏷️ Personnalisation des tags via un onboarding intuitif
- 📥 Clic sur une card → ouverture de l’article dans une **fenêtre dédiée** (sans quitter l’application)
- 🌑 Thème sombre inspiré de daily.dev
- ♾️ Scroll infini pour charger plus d’articles
- ⚙️ Interface entièrement responsive

## 🛠️ Technologies utilisées

- **Electron.js** – Application de bureau multiplateforme
- **dev.to API** – Source des articles (publique, sans authentification)
- **JavaScript (ES6+)** – Logique frontend et backend léger
- **HTML/CSS** – Interface utilisateur moderne et performante

## 🚀 Installation

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
