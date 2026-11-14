import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initPage() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intro = document.querySelector('.intro');
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.nav');

  document.getElementById('year').textContent = new Date().getFullYear();

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
  }));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.focus();
    }
  });

  document.getElementById('review-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = document.getElementById('review-name').value.trim();
    const message = document.getElementById('review-message').value.trim();
    if (!name || !message) return;
    const status = document.querySelector('.form-status');
    if (import.meta.env.DEV) {
      const subject = encodeURIComponent(`Comentario para Yanax Studio de ${name}`);
      const body = encodeURIComponent(`Nombre: ${name}\n\nComentario:\n${message}\n\nEnviado desde la web de Yanax Studio.`);
      status.textContent = 'Se abrirá tu correo para enviar el comentario.';
      window.location.href = `mailto:yanax.dev@gmail.com?subject=${subject}&body=${body}`;
      return;
    }
    const button = document.querySelector('.review-form button');
    button.disabled = true;
    status.textContent = 'Enviando comentario…';
    try {
      const payload = new URLSearchParams({ 'form-name': 'yanax-reviews', name, message });
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: payload });
      if (!response.ok) throw new Error('No se pudo entregar');
      status.textContent = 'Comentario recibido. ¡Gracias por escribirnos!';
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
  document.body.classList.add('motion-ready');
  const timeline = gsap.timeline({defaults:{ease:'power3.out'},onComplete:()=>intro.remove()});
  timeline.from('.intro-inner img',{y:70,autoAlpha:0,scale:.75,duration:.65})
    .from('.intro-inner>span',{y:30,autoAlpha:0,duration:.55},'<.22')
    .from('.intro-inner small',{y:12,autoAlpha:0,duration:.4},'<.25')
    .to('.intro-line',{width:'100%',duration:.68,ease:'power2.inOut'},'<')
    .to('.intro',{yPercent:-102,duration:.86,ease:'power3.inOut'},'+=.12')
    .from('.hero-line',{y:55,autoAlpha:0,stagger:.11,duration:.75},'<.24')
    .from('.hero-description, .hero-actions',{y:24,autoAlpha:0,stagger:.12,duration:.55},'<.35')
    .from('.hero-art',{x:50,autoAlpha:0,scale:.9,duration:1},'<.1');

  gsap.to('.hero-llama',{y:-15,rotation:1.5,repeat:-1,yoyo:true,duration:3.5,ease:'sine.inOut'});
  gsap.to('.ring-one',{rotation:360,repeat:-1,duration:55,ease:'none'});
  gsap.to('.ring-two',{rotation:-360,repeat:-1,duration:75,ease:'none'});
  document.querySelectorAll('.section-heading h2, .statement h2, .about-copy h2, .faq h2, .reviews h2').forEach((heading) => {
    gsap.from(heading,{y:32,autoAlpha:0,duration:.85,ease:'power2.out',scrollTrigger:{trigger:heading,start:'top 88%',once:true}});
  });

  // A subtle pixel-liquid canvas based on the visual language of Unlumen's backgrounds.
  // It is intentionally low resolution and pauses when the tab is hidden.
  const canvas = document.querySelector('.hero-shader');
  const ctx = canvas.getContext('2d',{alpha:true});
  if (ctx) {
    const width = 104, height = 72;
    canvas.width = width; canvas.height = height;
    const pixels = ctx.createImageData(width,height);
    let frame = 0, animationId = 0;
    const render = () => {
      const t = frame++ * .025;
      for (let y=0;y<height;y++) for (let x=0;x<width;x++) {
        const i=(y*width+x)*4;
        const w=Math.sin(x*.084+t)*Math.cos(y*.115-t*.61)+Math.sin((x+y)*.047+t*.7);
        const v=Math.max(0,Math.min(1,(w+1.7)/3.4));
        pixels.data[i]=18+Math.round(v*27);
        pixels.data[i+1]=70+Math.round(v*85);
        pixels.data[i+2]=81+Math.round(v*87);
        pixels.data[i+3]=Math.round(v*73);
      }
      ctx.putImageData(pixels,0,0);
      if (!document.hidden) animationId=requestAnimationFrame(render);
    };
    render();
    document.addEventListener('visibilitychange',()=>{
      cancelAnimationFrame(animationId);
      if (!document.hidden) render();
    });
  }
}
