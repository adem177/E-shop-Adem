<div align="center">

<img src="images/logo.png" alt="Logo E-Shop Adem" width="90">

# 🛍️ E-Shop Adem

**Boutique e‑commerce complète — HTML · CSS · JavaScript (vanilla)**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-✅-2fd39a?style=flat-square)](#-responsive)
[![License](https://img.shields.io/badge/licence-MIT-2f7dfb?style=flat-square)](LICENSE)

*Un site vitrine + boutique en ligne moderne : catalogue filtrable, panier persistant,
fiches produits dynamiques, thème sombre/clair et animations — 100 % sans框架, sans dépendance.*

</div>

---

## 📖 À propos

**E‑Shop Adem** est une boutique en ligne fictive de produits tech (smartphones, PC, consoles,
téléviseurs et accessoires) réalisée ** intégralement en HTML, CSS et JavaScript vanilla **.
L'objectif : proposer une expérience d'achat réaliste — navigation, recherche, panier, avis,
formulaires validés — le tout avec un design moderne, sombre et responsive.

> 💡 Projet pédagogique (1ʳᵉ année de licence) — idéal pour comprendre le **DOM**, les
> ** événements**, le ** localStorage ** et la ** méthode mobile‑first **.

---

## ✨ Fonctionnalités

| | Fonctionnalité | Détail |
|---|---|---|
| 🛒 | **Panier intelligent** | Ajout / suppression / quantités, tiroir animé, badge compteur, **persistant grâce au `localStorage`** |
| 🔍 | **Recherche & filtres** | Barre de recherche instantanée, filtres par catégorie, case « promotions », tri par prix ou nom |
| 📄 | **Fiches produits dynamiques** | Une seule page `produit.html?p=…` qui génère n'importe quel produit depuis le catalogue JS (galerie, specs, avis, produits similaires) |
| 🌗 | **Thème sombre / clair** | Bouton de bascule, choix mémorisé, aucun flash au chargement |
| 📝 | **Formulaires validés** | Inscription, connexion, mot de passe oublié, newsletter — validation en temps réel avec messages d'erreur en français |
| ⭐ | **Avis clients** | Notation étoiles interactive, ajout d'avis enregistré en `localStorage` |
| ⏳ | **Compte à rebours** | Minuteur live sur la page des offres |
| ✨ | **Animations** | Révélations au scroll, compteurs animés, effets de survol, cartes flottantes |
| 📱 | **Responsive** | Menu burger, grilles adaptatives, testé du mobile au grand écran |
| ♿ | **Accessibilité** | `aria-label`, navigation clavier, `prefers-reduced-motion` respecté |

---

## 🖥️ Pages du site

| Page | Rôle |
|---|---|
| `index.html` | Accueil : hero, statistiques animées, catégories, meilleures ventes, engagements |
| `produits.html` | Catalogue complet (12 produits) avec sidebar, barre d'outils et grille filtrable |
| `offre.html` | Offres du mois : compte à rebours, bons plans avec stock restant, vitrine promos |
| `produit.html` | Fiche produit **dynamique** (générée en JS à partir de `?p=slug`) |
| `inscription.html` | Création de compte avec validation complète |
| `compte.html` | Connexion |
| `mdp.html` | Récupération du mot de passe |
| `samsung.html` | Ancienne adresse → redirection vers la fiche dynamique |

---

## 📁 Structure du projet

```
projet_adem_dridi/
│
├── index.html              # Accueil
├── produits.html           # Catalogue
├── offre.html              # Offres spéciales
├── produit.html            # Fiche produit dynamique
├── inscription.html        # Inscription
├── compte.html             # Connexion
├── mdp.html                # Mot de passe oublié
├── samsung.html            # Redirection (compatibilité)
│
├── css/
│   ├── styles.css          # Design system (variables, thème, composants)
│   └── produits.css        # Styles spécifiques au catalogue
│
├── js/
│   └── main.js             # Panier, filtres, thème, formulaires, rendu produit
│
└── images/                 # Logo, photos produits, bannières
```

---

## 🚀 Démarrage rapide

**Option 1 — ouvrir directement**

```bash
git clone https://github.com/adem177/E-shop-Adem.git
cd E-shop-Adem
# ouvrir index.html dans le navigateur
```

**Option 2 — serveur local (recommandé)**

```bash
cd E-shop-Adem
python -m http.server 8000
# puis ouvrir http://localhost:8000
```

Aucune installation, aucune dépendance, aucune étape de build : c'est du ** pur navigateur **.

---

## 🧠 Comment ça marche ?

### Le catalogue produits
Tous les produits sont décrits dans ** `js/main.js `** (objet `CATALOG`) :

```js
samsung: {
  name: "Samsung Galaxy S24 Ultra",
  cat:  "Smartphones",
  price: 5999, old: 6499,
  img:  "images/samsung.jpg",
  rating: 4.9, reviews: 128,
  specs: ["Écran 6.8\" QHD+ …", "Snapdragon 8 Gen 3 …"]
}
```

La page `produit.html?p=samsung` lit ce slug dans l'URL et ** génère toute la fiche ** :
galerie, prix, caractéristiques, onglets, avis, produits similaires.

### Le panier
Chaque bouton « Ajouter » porte ses informations en `data-attributes` :

```html
<button data-add-cart="samsung" data-name="Galaxy S24 Ultra"
        data-price="5999" data-img="images/samsung.jpg">Ajouter</button>
```

`main.js` centralise tout dans `localStorage` → ** le panier survit au rechargement
et fonctionne d'une page à l'autre **.

### Les filtres
Ch possède `data-cat`, `data-name`, `data-price` et `data-promo` : la recherche et les
filtres ne font que masquer/afficher les cartes (`.hide`), ce qui est instantané.

---

## 🗃️ Produits du catalogue

| Produit | Catégorie | Prix |
|---|---|---|
| Samsung Galaxy S24 Ultra | Smartphones | 5 999 DT |
| iPhone 15 Pro Max | Smartphones | 4 899 DT |
| Redmi Note 13 Pro | Smartphones | 1 299 DT |
| PC Gamer Ryzen + RTX | PC & Mac | 2 499 DT |
| PC Bureau Performance | PC & Mac | 899 DT |
| MacBook Air M2 | PC & Mac | 3 299 DT |
| PlayStation 5 Slim | Consoles | 2 199 DT |
| Xbox Series S | Consoles | 1 899 DT |
| TV Samsung 50" 4K | Téléviseurs | 1 799 DT |
| Montre Connectée AMOLED | Accessoires | 499 DT |
| Trotinette Électrique | Accessoires | 1 499 DT |
| Pack Accessoires Apple | Accessoires | 349 DT |

Pour en ajouter un : une entrée dans `CATALOG` + une carte dans `produits.html`, et c'est tout. 🎉

---

## 🧰 Technologies utilisées

- **HTML5** — sémantique (`nav`, `header`, `footer`, `aside`), formulaires, `aria-*`
- **CSS3** — variables CSS, Grid, Flexbox, `backdrop-filter`, `@media`, animations, thème clair/sombre
- **JavaScript ES6** — IIFE, `IntersectionObserver`, déléghation d'événements, `localStorage`,
  `Intl.NumberFormat`, template literals

---

## 🔮 Pistes d'évolution

- [ ] Backend (PHP/Node + base MySQL) pour de vraies commandes
- [ ] Page « Suivi de commande »
- [ ] Comparateur de produits
- [ ] Export du catalogue en JSON
- [ ] Mode hors‑ligne (Service Worker)

---

<div align="center">

**Réalisé par Adem Dridi** · 1ʳᵉ année de licence · Projet web

⭐ Si ce projet vous plaît, laissez une étoile sur le dépôt !

</div>
