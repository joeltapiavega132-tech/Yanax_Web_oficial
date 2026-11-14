import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import page from './site.html?raw';
import { initPage } from './behavior.js';
import { AuroraBars } from './components/AuroraBars.jsx';
import { RevealText } from './components/RevealText.jsx';
import { BorderBeam } from './components/BorderBeam.jsx';
import './styles.css';

function App() {
  const [targets, setTargets] = useState(null);
  useEffect(() => {
    setTargets({
      reveal: document.getElementById('smooth-reveal-text'),
      aurora: document.getElementById('unlumen-aurora'),
      beams: [...document.querySelectorAll('.project-beam-host')],
    });
    initPage();
  }, []);
  return <>
    <div dangerouslySetInnerHTML={{ __html: page }} />
    {targets?.reveal && createPortal(<RevealText>Diseño, desarrollo y una buena dosis de curiosidad.</RevealText>, targets.reveal)}
    {targets?.aurora && createPortal(<AuroraBars />, targets.aurora)}
    {targets?.beams.map((target, i) => createPortal(<BorderBeam colorFrom={i ? '#d9e8e2' : '#ff9932'} />, target, `beam-${i}`))}
  </>;
}

const root = import.meta.hot?.data.root ?? createRoot(document.getElementById('root'));
root.render(<App />);
if (import.meta.hot) import.meta.hot.data.root = root;
