# Yanax Studio — web oficial

Landing y portafolio de Yanax Studio, desarrollado con React y Vite.

## Desarrollo local

```bash
npm ci
npm run dev
```

## Build y despliegue

```bash
npm run build
npm run preview
```

Netlify usa `netlify.toml`: ejecuta `npm run build` y publica `dist`. Conecta este repositorio desde el panel de Netlify para desplegarlo. El formulario de comentarios usa Netlify Forms en producción; en desarrollo local abre un correo dirigido a Yanax.

Las imágenes de proyectos y los logos provienen de los archivos entregados por Yanax Studio. GSAP y ScrollTrigger se importan desde la dependencia npm `gsap`. El proyecto integra versiones adaptadas y editables de Aurora Bars (Unlumen UI), Border Beam (Magic UI) y Reveal Text (SmoothUI) en `src/components`. El fondo de píxeles y los botones siguen la misma dirección visual con implementaciones locales.


