import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import page from './site.html?raw';
import { initPage } from './behavior.js';
import './styles.css';

function App() {
  useEffect(() => initPage(), []);
  return <div dangerouslySetInnerHTML={{ __html: page }} />;
}

createRoot(document.getElementById('root')).render(<App />);
