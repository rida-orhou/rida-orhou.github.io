'use strict';

/* ══════════════════════════════
   ① REACT — ProjectCard Component
   ══════════════════════════════ */
const { createElement: h } = React;

const PROJECTS = [
  {
    num: '01',
    img: 'img_tictac.png',
    title: 'Tic-Tac-Toe SFML / C++',
    desc: 'Jeu graphique en C++ avec SFML. Un personnage se déplace sur un plateau, saute par-dessus des obstacles et revient avec des flèches. Architecture OOP propre : Board, Player, GameController, Renderer.',
    tags: ['C++', 'SFML', 'OOP'],
    github: 'https://github.com/orhourida01/Tic-Tac-Toe-SFML-Cpp',
    demo:   'https://orhourida01.github.io/Tic-Tac-Toe-SFML-Cpp/'
  },
  {
    num: '02',
    img: 'img_forestrunner.png',
    title: 'Forest Runner SFML',
    desc: 'Jeu de survie 2D side-scrolling en C++ avec SFML. Personnage qui court, saute par-dessus des obstacles générés procéduralement, avec détection de collisions et difficulté progressive.',
    tags: ['C++', 'SFML', 'Game Dev'],
    github: 'https://github.com/orhourida01/Forest-Runner-SFML',
    demo:   'https://orhourida01.github.io/Forest-Runner-SFML/'
  },
  {
    num: '03',
    img: 'img_fitzone.png',
    title: 'FitZone Gym Management Web',
    desc: 'Plateforme web responsive pour la gestion des centres de fitness : tableau de bord, gestion des membres et abonnements, interface moderne.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/orhourida01/FitZone-Gym-Management-Web',
    demo:   'https://orhourida01.github.io/FitZone-Gym-Management-Web/'
  },
  {
    num: '04',
    img: 'uml_scraper.png',
    title: 'Python Web Scraper Automation',
    desc: 'Outil automatisé en Python pour l\'extraction, le traitement et l\'organisation de données depuis le web. Inclut un diagramme UML complet.',
    tags: ['Python', 'Automation', 'Data'],
    github: 'https://github.com/orhourida01/Python-Web-Scraper-Automation',
    demo:   'https://orhourida01.github.io/Python-Web-Scraper-Automation/'
  },
  {
    num: '05',
    img: 'uml_garage.png',
    title: 'C-Garage Management System',
    desc: 'Système logique avancé en C pour le suivi des réparations automobiles, gestion du stock de pièces et facturation. Architecture documentée en UML.',
    tags: ['C Language', 'Struct', 'File I/O'],
    github: 'https://github.com/orhourida01/C-Garage-Management-System',
    demo:   'https://orhourida01.github.io/C-Garage-Management-System/'
  },
  {
    num: '06',
    img: 'img_luxury.png',
    title: 'LuxuryStay Hotel Landing Page',
    desc: 'Interface moderne et élégante pour la réservation hôtelière. Design premium avec animations CSS soignées et formulaire de réservation interactif.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/orhourida01/LuxuryStay-Hotel-LandingPage',
    demo:   'https://orhourida01.github.io/LuxuryStay-Hotel-LandingPage/'
  }
];

// ── ProjectCard Component ──
function ProjectCard({ data }) {
  return h('div', { className: 'proj-card' },
    h('div', { className: 'proj-header' },
      h('div', { className: 'proj-tags' },
        ...data.tags.map(t => h('span', { key: t, className: 'proj-tag' }, t))
      ),
      h('span', { className: 'proj-num' }, '// ' + data.num)
    ),
    h('div', { className: 'proj-preview-img' },
      h('img', {
        src: data.img,
        alt: data.title,
        loading: 'lazy'
      })
    ),
    h('div', { className: 'proj-body' },
      h('h3', null, data.title),
      h('p', null, data.desc)
    ),
    h('div', { className: 'proj-foot' },
      h('a', {
        href: data.github,
        target: '_blank',
        rel: 'noreferrer',
        className: 'proj-btn proj-btn-gh'
      },
        h('i', { className: 'fa-brands fa-github' }),
        ' Code'
      ),
      h('a', {
        href: data.demo,
        target: '_blank',
        rel: 'noreferrer',
        className: 'proj-btn proj-btn-demo'
      },
        h('i', { className: 'fa-solid fa-arrow-up-right-from-square' }),
        ' Demo'
      )
    )
  );
}

function ProjectsSection() {
  return h('div', { className: 'projects-grid' },
    ...PROJECTS.map(p => h(ProjectCard, { key: p.num, data: p }))
  );
}

const reactRoot = document.getElementById('react-projects');
if (reactRoot) {
  ReactDOM.createRoot(reactRoot).render(h(ProjectsSection));
}


/* ══════════════════════════════
   ② jQuery — All Interactions
   ══════════════════════════════ */
$(function () {

  /* ── NAV scroll & active ── */
  const $navbar   = $('#navbar');
  const $navLinks = $('.nav-links a');
  const sections  = $('section[id], header[id]').toArray();

  $(window).on('scroll.nav', function () {
    $navbar.toggleClass('scrolled', $(this).scrollTop() > 40);
    let current = '';
    sections.forEach(sec => {
      if ($(window).scrollTop() >= $(sec).offset().top - 130) current = sec.id;
    });
    $navLinks.removeClass('active').filter('[href="#' + current + '"]').addClass('active');
  }).trigger('scroll.nav');

  /* ── Mobile toggle ── */
  $('#navToggle').on('click', function () {
    const $menu = $('#navLinks');
    const isOpen = $menu.toggleClass('open').hasClass('open');
    const $spans = $(this).children('span');
    if (isOpen) {
      $spans.eq(0).css({ transform: 'translateY(7px) rotate(45deg)' });
      $spans.eq(1).css({ opacity: 0 });
      $spans.eq(2).css({ transform: 'translateY(-7px) rotate(-45deg)' });
    } else {
      $spans.css({ transform: '', opacity: '' });
    }
  });

  $('#navLinks a').on('click', function () {
    $('#navLinks').removeClass('open');
    $('#navToggle span').css({ transform: '', opacity: '' });
  });

  /* ── Smooth scroll ── */
  $('a[href^="#"]').on('click', function (e) {
    const $t = $($(this).attr('href'));
    if (!$t.length) return;
    e.preventDefault();
    $('html,body').animate({ scrollTop: $t.offset().top - 64 }, 600, 'swing');
  });

  /* ── Typed text ── */
  const phrases = ['whoami', 'ls projets/', 'cat competences.txt', 'git log --oneline'];
  let pi = 0, ci = 0, deleting = false;
  const $typed = $('#typedText');

  function typeIt() {
    const phrase = phrases[pi];
    if (!deleting) {
      $typed.text(phrase.slice(0, ++ci));
      if (ci === phrase.length) { deleting = true; return setTimeout(typeIt, 1500); }
    } else {
      $typed.text(phrase.slice(0, --ci));
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(typeIt, deleting ? 45 : 85);
  }
  setTimeout(typeIt, 1000);

  /* ── Scroll reveal ── */
  function checkReveal() {
    $('.reveal').each(function () {
      if ($(window).scrollTop() + $(window).height() > $(this).offset().top + 60) {
        $(this).addClass('visible');
      }
    });
  }
  $(window).on('scroll.reveal', checkReveal);
  checkReveal();

  /* ── Skill bars (jQuery animate on scroll) ── */
  let barsAnimated = false;
  $(window).on('scroll.skills', function () {
    if (barsAnimated) return;
    if (!$('#skills').length) return;
    if ($(window).scrollTop() + $(window).height() > $('#skills').offset().top + 100) {
      barsAnimated = true;
      $('.skill-fill').each(function (i) {
        const $bar = $(this);
        const targetW = $bar.data('w');
        setTimeout(function () {
          $bar.animate({ width: targetW + '%' }, {
            duration: 1200,
            easing: 'swing'
          });
        }, i * 80);
      });
    }
  });

  /* ── Skill hover effect ── */
  $('.skill-item').on('mouseenter', function () {
    $(this).find('.skill-fill').css('box-shadow', '0 0 10px rgba(0,255,136,.5)');
  }).on('mouseleave', function () {
    $(this).find('.skill-fill').css('box-shadow', 'none');
  });

  /* ── Education accordion ── */
  $('.tl-header').on('click', function () {
    const $body  = $(this).closest('.tl-item').find('.tl-body');
    const $arrow = $(this).find('.tl-arrow');
    const isOpen = $body.is(':visible');
    $('.tl-body').slideUp(300);
    $('.tl-arrow').removeClass('open');
    if (!isOpen) {
      $body.slideDown(300);
      $arrow.addClass('open');
    }
  });

  /* ── Counters ── */
  let countersRun = false;
  $(window).on('scroll.counter', function () {
    if (countersRun) return;
    if (!$('#about').length) return;
    if ($(window).scrollTop() + $(window).height() > $('#about').offset().top + 150) {
      countersRun = true;
      $('.stat-n').each(function () {
        const $el    = $(this);
        const target = parseInt($el.data('target'));
        const dur    = 1600;
        const steps  = 60;
        const inc    = target / steps;
        let current  = 0;
        const timer  = setInterval(function () {
          current = Math.min(current + inc, target);
          $el.text(Math.floor(current));
          if (current >= target) { $el.text(target); clearInterval(timer); }
        }, dur / steps);
      });
    }
  });

  /* ── Form validation (jQuery) ── */
  function validate(fieldId, errId, check, msg) {
    const $f   = $('#' + fieldId);
    const $err = $('#' + errId);
    if (!check($f.val().trim())) {
      $f.addClass('err'); $err.text(msg); return false;
    }
    $f.removeClass('err'); $err.text(''); return true;
  }

  $('#fname,#femail,#fmsg').on('input', function () { $(this).removeClass('err'); });

  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    const okName  = validate('fname',  'err-name',  v => v.length >= 2,  '⚠ Entrez votre nom (min. 2 caractères).');
    const okEmail = validate('femail', 'err-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), '⚠ Email invalide.');
    const okMsg   = validate('fmsg',   'err-msg',   v => v.length >= 10, '⚠ Message trop court (min. 10 caractères).');
    if (!okName || !okEmail || !okMsg) return;
    const $btn = $('#submitBtn');
    $btn.prop('disabled', true).find('#btnTxt').text('Envoi en cours...');
    setTimeout(function () {
      $btn.prop('disabled', false).find('#btnTxt').text('Envoyer le message');
      const $s = $('#formSuccess');
      $s.text('✅ Message envoyé ! Je vous répondrai très bientôt.').addClass('show');
      $('#contactForm')[0].reset();
      setTimeout(function () { $s.removeClass('show'); }, 5000);
    }, 1200);
  });

  /* ── Card tilt effect ── */
  $(document).on('mousemove', '.proj-card', function (e) {
    const rect = this.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width  - 0.5;
    const y    = (e.clientY - rect.top)  / rect.height - 0.5;
    $(this).css('transform', 'translateY(-6px) rotateY(' + (x*7) + 'deg) rotateX(' + (-y*5) + 'deg)');
  });
  $(document).on('mouseleave', '.proj-card', function () {
    $(this).css({ transform: '', transition: 'transform .5s ease' });
  });
  $(document).on('mouseenter', '.proj-card', function () {
    $(this).css('transition', 'transform .1s ease, border-color .25s, box-shadow .25s');
  });

  /* ── Tag bounce ── */
  $(document).on('mouseenter', '.tag, .pill', function () {
    $(this).stop(true)
      .animate({ paddingLeft: '20px', paddingRight: '20px' }, 120)
      .animate({ paddingLeft: '16px', paddingRight: '16px' }, 120);
  });

});
/* ── CUSTOM CURSOR LOGIC ── */
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0; // Blasa dyal mouse
let ringX = 0, ringY = 0;   // Blasa dyal l-halqa

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // L-noqta kat-mchi direct m3a l-mouse
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});
/* ── IMAGE LIGHTBOX (jQuery) ── */
  // Créer le lightbox dans le DOM
  $('body').append(`
    <div class="img-lightbox" id="imgLightbox">
      <button class="lightbox-close" id="lbClose"><i class="fa-solid fa-xmark"></i></button>
      <img id="lbImg" src="" alt=""/>
      <div class="lightbox-caption" id="lbCaption"></div>
    </div>
  `);

  // Ouvrir au clic sur une image de projet
  $(document).on('click', '.proj-preview-img', function () {
    const $img     = $(this).find('img');
    const src      = $img.attr('src');
    const caption  = $img.attr('alt');

    $('#lbImg').attr('src', src);
    $('#lbCaption').text(caption);
    $('#imgLightbox').addClass('open');
    $('body').css('overflow', 'hidden');
  });

  // Fermer au clic sur le fond ou le bouton X
  $('#imgLightbox, #lbClose').on('click', function (e) {
    if ($(e.target).closest('#lbImg').length) return; // clic sur image = ne ferme pas
    $('#imgLightbox').removeClass('open');
    $('body').css('overflow', '');
  });

  // Fermer avec Escape
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $('#imgLightbox').removeClass('open');
      $('body').css('overflow', '');
    }
  });
// Animation smooth dyal l-halqa
function animateRing() {
  ringX += (mouseX - ringX) * 0.15; // 0.15 kat-3ti dik s-sola dyal l-lag
  ringY += (mouseY - ringY) * 0.15;
  
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  
  requestAnimationFrame(animateRing);
}
animateRing();

/* ── EFFECT ON HOVER ── */
// Bach l-cursor i-kber mlli t-hottou 3la chi lien wla bouton
$(document).on('mouseenter', 'a, button, .proj-card', function() {
  $('#cursor-ring').css({ width: '50px', height: '50px', background: 'rgba(0, 255, 136, 0.1)' });
}).on('mouseleave', 'a, button, .proj-card', function() {
  $('#cursor-ring').css({ width: '30px', height: '30px', background: 'transparent' });
});