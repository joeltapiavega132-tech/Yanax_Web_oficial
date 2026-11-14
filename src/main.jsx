import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import page from './site.html?raw';
import { initPage } from './behavior.js';
import './styles.css';

function App() {
  useEffect(() => initPage(), []);
  return <div dangerouslySetInnerHTML={{ __html: page }} />;
}

const root = import.meta.hot?.data.root ?? createRoot(document.getElementById('root'));
root.render(<App />);
if (import.meta.hot) import.meta.hot.data.root = root;
