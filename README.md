# Yanax Studio — web oficial

Landing y portafolio de Yanax Studio. React + Vite, lista para Netlify.

## Desarrollo

```bash
npm ci
npm run dev
```

## Producción

```bash
npm run build
npm run preview
```

Netlify usa `netlify.toml` para ejecutar `npm run build` y publicar `dist`. El formulario de comentarios se procesa con Netlify Forms después del despliegue. En desarrollo local prepara un correo al equipo de Yanax.

La web usa las capturas reales de Mimosa y Vigor Spot y la identidad visual entregada por Yanax. La apertura utiliza GSAP. El texto de entrada adapta Reveal Text de SmoothUI y el borde de los proyectos adapta Border Beam de Magic UI. El fondo con barras de Unlumen UI se retiró del diseño a petición del cliente; el componente queda disponible en el código para usos futuros. La tipografía Archivo se sirve desde el proyecto, sin depender de Google Fonts.
