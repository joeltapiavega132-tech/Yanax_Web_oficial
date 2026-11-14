import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import page from './site.html?raw';
import { initPage } from './behavior.js';
import { RevealText } from './components/RevealText.jsx';
import { BorderBeam } from './components/BorderBeam.jsx';
import '@fontsource/archivo/latin-400.css';
import '@fontsource/archivo/latin-500.css';
import '@fontsource/archivo/latin-600.css';
import '@fontsource/archivo/latin-700.css';
import './styles.css';

function App() {
  const [targets, setTargets] = useState(null);
  useEffect(() => {
    setTargets({
      reveal: document.getElementById('smooth-reveal-text'),
      beams: [...document.querySelectorAll('.project-beam-host')],
    });
    initPage();
  }, []);
  return <>
    <div dangerouslySetInnerHTML={{ __html: page }} />
    {targets?.reveal && createPortal(<RevealText>Sitios web, comercio digital y software a medida, pensados para tus objetivos y para las personas que los usan.</RevealText>, targets.reveal)}
    {targets?.beams.map((target, i) => createPortal(<BorderBeam colorFrom={i ? '#d9e8e2' : '#ff9932'} />, target, `beam-${i}`))}
  </>;
}

const root = import.meta.hot?.data.root ?? createRoot(document.getElementById('root'));
root.render(<App />);
if (import.meta.hot) import.meta.hot.data.root = root;
