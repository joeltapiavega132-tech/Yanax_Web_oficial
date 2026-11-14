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
  const heroFigure = document.querySelector('.hero-figure');
  const mascot = heroFigure.querySelector('.hero-mascot');
  const timeline = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      intro.remove();
      gsap.to('.hero-mascot img', { y: -10, duration: 2.7, ease: 'sine.inOut', repeat: -1, yoyo: true });
    },
  });
  timeline.from('.intro-mark img', { y: 70, scale: .72, rotation: -9, autoAlpha: 0, duration: .85, ease: 'back.out(1.7)' })
    .from('.intro-mark strong', { y: 24, autoAlpha: 0, duration: .5 }, '<.35')
    .from('.intro-mark small', { y: 12, autoAlpha: 0, duration: .4 }, '<.2')
    .to('.intro', { yPercent: -101, duration: .8, ease: 'power3.inOut' }, '+=.08')
    .from('.hero-figure', { clipPath: 'inset(0 0 100% 0)', duration: .9, ease: 'power3.inOut' }, '<.35')
    .from('.hero-shape', { scale: .65, rotation: -10, autoAlpha: 0, stagger: .12, duration: .8, ease: 'back.out(1.4)' }, '<.45')
    .from('.hero-mascot', { y: 140, rotation: -9, scale: .72, autoAlpha: 0, duration: 1.15, ease: 'back.out(1.6)' }, '<.65')
    .from('.hero-line', { y: 34, autoAlpha: 0, stagger: .13, duration: .7 }, '<.9')
    .from('.hero-lede, .hero-actions', { y: 20, autoAlpha: 0, stagger: .12, duration: .55 }, '<.35')
    .from('.hero-bottom', { y: 15, autoAlpha: 0, duration: .5 }, '<.3');

  if (window.matchMedia('(pointer: fine)').matches) {
    const moveX = gsap.quickTo(mascot, 'x', { duration: .65, ease: 'power3.out' });
    const moveY = gsap.quickTo(mascot, 'y', { duration: .65, ease: 'power3.out' });
    const turn = gsap.quickTo(mascot, 'rotation', { duration: .7, ease: 'power3.out' });
    heroFigure.addEventListener('pointermove', (event) => {
      if (timeline.isActive()) return;
      const bounds = heroFigure.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      moveX(x * 24);
      moveY(y * 16);
      turn(x * 4);
    });
    heroFigure.addEventListener('pointerleave', () => { moveX(0); moveY(0); turn(0); });
  }

  gsap.to('.hero-shape-coral', { y: -38, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
  gsap.to('.hero-shape-green', { y: 28, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
}
