import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initPage() {
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.nav');
  const intro = document.querySelector('.intro');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('year').textContent = new Date().getFullYear();

  const closeMenu = () => {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
      menuButton.focus();
    }
  });

  const tabs = [...document.querySelectorAll('.service-tabs [role="tab"]')];
  const activateTab = (tab, focus = false) => {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (event) => {
      let next = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      activateTab(tabs[next], true);
    });
  });

  document.getElementById('review-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = document.getElementById('review-name').value.trim();
    const message = document.getElementById('review-message').value.trim();
    if (!name || !message) return;
    const status = form.querySelector('.form-status');
    if (import.meta.env.DEV) {
      const subject = encodeURIComponent(`Comentario para Yanax Studio de ${name}`);
      const body = encodeURIComponent(`Nombre: ${name}\n\nComentario:\n${message}`);
      status.textContent = 'Se abrirá tu correo para enviar el comentario.';
      window.location.href = `mailto:yanax.dev@gmail.com?subject=${subject}&body=${body}`;
      return;
    }
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    status.textContent = 'Enviando comentario…';
    try {
      const payload = new URLSearchParams({ 'form-name': 'yanax-reviews', name, message });
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: payload });
      if (!response.ok) throw new Error('No se pudo entregar');
      status.textContent = 'Comentario recibido. Gracias por escribirnos.';
      form.reset();
    } catch {
      status.textContent = 'No se pudo enviar. Escríbenos a yanax.dev@gmail.com.';
    } finally {
      button.disabled = false;
    }
  });

  if (reducedMotion) {
    intro.remove();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const timeline = gsap.timeline({ defaults: { ease: 'power2.out' }, onComplete: () => intro.remove() });
  timeline.from('.intro-mark img', { y: 35, autoAlpha: 0, duration: .6 })
    .from('.intro-mark strong', { y: 18, autoAlpha: 0, duration: .45 }, '<.23')
    .from('.intro-mark small', { y: 10, autoAlpha: 0, duration: .4 }, '<.15')
    .to('.intro', { yPercent: -101, duration: .8, ease: 'power3.inOut' }, '+=.1')
    .from('.hero-line', { y: 25, autoAlpha: 0, stagger: .11, duration: .6 }, '<.25')
    .from('.hero-lede, .hero-actions', { y: 14, autoAlpha: 0, stagger: .1, duration: .45 }, '<.2')
    .from('.hero-figure img', { x: 25, autoAlpha: 0, duration: .7 }, '<');
}
