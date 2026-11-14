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

Las imágenes de proyectos y los logos provienen de los archivos entregados por Yanax Studio. GSAP y ScrollTrigger se importan desde la dependencia npm `gsap`. Los tratamientos de fondo, bordes y botones son implementaciones locales inspiradas en los patrones de Unlumen UI, Magic UI y SmoothUI; sus paquetes de registro no están instalados.

