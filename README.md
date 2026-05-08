#  CV Interactif — Rida Orhou

> Projet académique — Module **Programmation Web 2** · Licence L2 Informatique · FSSM · Université Cadi Ayyad

 **Live Demo :** [orhourida01.github.io](https://orhourida01.github.io)

---

##  Description

Portfolio / CV personnel interactif développé dans le cadre du module **Programmation Web 2**.  
Il présente mon parcours académique, mes compétences techniques, mes projets et mes coordonnées, le tout dans une interface moderne **Dark Mode** avec des interactions dynamiques.

---

##  Technologies Utilisées

| Technologie | Rôle | Usage dans le projet |
|---|---|---|
| **HTML5** | Structure sémantique | Balises `<header>`, `<section>`, `<nav>`, `<footer>`, `<article>` |
| **CSS3** | Style & mise en forme | Flexbox, Grid, animations, responsive design |
| **jQuery 3.7** | Interactivité DOM | Animations barres, accordion, validation formulaire |
| **ReactJS 18** | Composants dynamiques | Section Projets avec `<ProjectCard />` |
| **GitHub Pages** | Hébergement | Déployé sur `orhourida01.github.io` |

---

##  Utilisation de ReactJS

### Composants créés

Le projet utilise **3 composants React fonctionnels** :

#### 1. `ProjectCard` — Carte projet individuelle
```jsx
function ProjectCard({ data }) {
  return (
    <div className="proj-card">
      <div className="proj-header">...</div>        // Tags + numéro
      <div className="proj-preview-img">            // Image du projet
        <img src={data.img} alt={data.title} />
      </div>
      <div className="proj-body">                   // Titre + description
        <h3>{data.title}</h3>
        <p>{data.desc}</p>
      </div>
      <div className="proj-foot">                   // Boutons Code + Demo
        <a href={data.github}>Code</a>
        <a href={data.demo}>Demo</a>
      </div>
    </div>
  );
}
```

#### 2. `ProjectsSection` — Grille de tous les projets
```jsx
function ProjectsSection() {
  return (
    <div className="projects-grid">
      {PROJECTS.map(p => (
        <ProjectCard key={p.num} data={p} />   // Props passées à chaque carte
      ))}
    </div>
  );
}
```

#### 3. Données `PROJECTS` — Tableau de props
```js
const PROJECTS = [
  {
    num: '01',
    img: 'img_tictac.png',
    title: 'Tic-Tac-Toe SFML / C++',
    desc: '...',
    tags: ['C++', 'SFML', 'OOP'],
    github: 'https://github.com/orhourida01/Tic-Tac-Toe-SFML-Cpp',
    demo: 'https://orhourida01.github.io/Tic-Tac-Toe-SFML-Cpp/'
  },
  // ... 5 autres projets
];
```

### Montage React dans le DOM
```js
const reactRoot = document.getElementById('react-projects');
ReactDOM.createRoot(reactRoot).render(h(ProjectsSection));
```

> **Note :** React est utilisé via CDN avec `createElement` (sans JSX compilé) pour compatibilité GitHub Pages sans build step.

---

##  Utilisation de jQuery

jQuery est utilisé pour **4 fonctionnalités interactives** :

### 1.  Animation des barres de compétences (au scroll)
```js
// Déclenchée quand la section Skills devient visible
$(window).on('scroll.skills', function () {
  if ($(window).scrollTop() + $(window).height() > $('#skills').offset().top + 100) {
    $('.skill-fill').each(function (i) {
      const targetW = $(this).data('w');
      setTimeout(function () {
        $bar.animate({ width: targetW + '%' }, { duration: 1200 });
      }, i * 80);   // Délai décalé pour effet cascade
    });
  }
});
```

### 2.  Accordion interactif — Section Formation
```js
// Ouvre/ferme les détails de chaque étape du parcours
$('.tl-header').on('click', function () {
  const $body  = $(this).closest('.tl-item').find('.tl-body');
  const $arrow = $(this).find('.tl-arrow');
  const isOpen = $body.is(':visible');

  $('.tl-body').slideUp(300);        // Ferme tous
  $('.tl-arrow').removeClass('open');

  if (!isOpen) {
    $body.slideDown(300);            // Ouvre celui cliqué
    $arrow.addClass('open');
  }
});
```

### 3.  Validation du formulaire de contact
```js
// Vérifie : champ vide, format email, longueur message
function validate(fieldId, errId, check, msg) {
  const $f = $('#' + fieldId);
  if (!check($f.val().trim())) {
    $f.addClass('err');
    $('#' + errId).text(msg);
    return false;
  }
  return true;
}

$('#contactForm').on('submit', function (e) {
  e.preventDefault();
  const okName  = validate('fname',  'err-name',  v => v.length >= 2, '⚠ Nom requis');
  const okEmail = validate('femail', 'err-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), '⚠ Email invalide');
  const okMsg   = validate('fmsg',   'err-msg',   v => v.length >= 10, '⚠ Message trop court');
});
```

### 4.  Lightbox — Agrandissement des images projets
```js
// Ouvre l'image en plein écran au clic
$(document).on('click', '.proj-preview-img', function () {
  const src = $(this).find('img').attr('src');
  $('#lbImg').attr('src', src);
  $('#imgLightbox').addClass('open');
  $('body').css('overflow', 'hidden');
});

// Ferme avec Escape
$(document).on('keydown', function (e) {
  if (e.key === 'Escape') $('#imgLightbox').removeClass('open');
});
```

---

##  Structure des Fichiers

```
portfolio/
├── index.html          # Structure HTML5 sémantique
├── style.css           # Styles CSS3 (Flexbox + Grid + animations)
├── script.js           # jQuery + React components
├── img_tictac.png      # Screenshot Tic-Tac-Toe SFML
├── img_forestrunner.png # Screenshot Forest Runner
├── img_fitzone.png     # Screenshot FitZone Gym
├── img_luxury.png      # Screenshot LuxuryStay Hotel
├── uml_scraper.png     # Diagramme UML Python Scraper
└── uml_garage.png      # Diagramme UML C-Garage System
```

---

##  Projets Présentés

| # | Projet | Technologies | Links |
|---|--------|-------------|-------|
| 01 | **Tic-Tac-Toe SFML** | C++, SFML, OOP | [Code](https://github.com/orhourida01/Tic-Tac-Toe-SFML-Cpp) · [Demo](https://orhourida01.github.io/Tic-Tac-Toe-SFML-Cpp/) |
| 02 | **Forest Runner SFML** | C++, SFML, Game Dev | [Code](https://github.com/orhourida01/Forest-Runner-SFML) · [Demo](https://orhourida01.github.io/Forest-Runner-SFML/) |
| 03 | **FitZone Gym Web** | HTML, CSS, JavaScript | [Code](https://github.com/orhourida01/FitZone-Gym-Management-Web) · [Demo](https://orhourida01.github.io/FitZone-Gym-Management-Web/) |
| 04 | **Python Web Scraper** | Python, Automation | [Code](https://github.com/orhourida01/Python-Web-Scraper-Automation) · [Demo](https://orhourida01.github.io/Python-Web-Scraper-Automation/) |
| 05 | **C-Garage System** | C, Struct, File I/O | [Code](https://github.com/orhourida01/C-Garage-Management-System) · [Demo](https://orhourida01.github.io/C-Garage-Management-System/) |
| 06 | **LuxuryStay Hotel** | HTML5, CSS3, JS | [Code](https://github.com/orhourida01/LuxuryStay-Hotel-LandingPage) · [Demo](https://orhourida01.github.io/LuxuryStay-Hotel-LandingPage/) |

---

##  Déploiement GitHub Pages

```bash
# 1. Initialiser le dépôt
git init
git add .
git commit -m "init: cv interactif - jQuery + React"

# 2. Connecter au remote
git remote add origin https://github.com/orhourida01/orhourida01.github.io.git

# 3. Pousser
git push -u origin main

# 4. Activer GitHub Pages
# Settings → Pages → Source: main branch / root
# URL: https://orhourida01.github.io
```

---

##  Fonctionnalités

- ✅ **Responsive** — Mobile, tablette, desktop
- ✅ **Dark Mode** — Thème terminal green
- ✅ **Typed effect** — Texte animé dans le hero
- ✅ **Scroll reveal** — Apparition des sections au scroll
- ✅ **Skill bars** — Barres animées jQuery au scroll
- ✅ **Accordion** — Timeline formation interactive jQuery
- ✅ **Form validation** — Validation temps réel jQuery
- ✅ **React cards** — Composants ProjectCard dynamiques
- ✅ **Lightbox** — Zoom image au clic
- ✅ **Custom cursor** — Curseur personnalisé animé

---

##  Auteur

**Rida Orhou**  
- Marrakech, Maroc  
- ridaorhou90@gmail.com  
- [github.com/orhourida01](https://github.com/orhourida01)  
- [linkedin.com/in/rida-orhou-186830400](https://www.linkedin.com/in/rida-orhou-186830400/)

---

*Projet réalisé dans le cadre du module Programmation Web 2 — Licence L2 Informatique — FSSM · Université Cadi Ayyad · 2025*
