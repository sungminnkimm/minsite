// ── NAV: appear after hero ────────────────────────────────────
const nav    = document.getElementById('navbar');
const hero   = document.getElementById('hero');

const heroObserver = new IntersectionObserver(
  ([e]) => nav.classList.toggle('visible', !e.isIntersecting),
  { threshold: 0.1 }
);
heroObserver.observe(hero);

// ── NAV: active section highlight ─────────────────────────────
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.forEach(l => l.classList.remove('is-active'));
    const active = document.querySelector(`.nav__link[href="#${e.target.id}"]`);
    if (active) active.classList.add('is-active');
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// ── NAV: mobile drawer ────────────────────────────────────────
const toggle = document.getElementById('nav-toggle');
const drawer = document.getElementById('nav-drawer');

toggle.addEventListener('click', () => {
  const open = drawer.hidden;
  drawer.hidden = !open;
  toggle.setAttribute('aria-expanded', open);
});

drawer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    drawer.hidden = true;
    toggle.setAttribute('aria-expanded', false);
  });
});

// ── FOOTER YEAR ───────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── HERO SCROLL HINT: hide once user scrolls ─────────────────
const scrollHint = document.querySelector('.hero__scroll');
if (scrollHint) {
  window.addEventListener('scroll', () => {
    scrollHint.style.opacity = window.scrollY > 80 ? '0' : '';
  }, { passive: true });
}
