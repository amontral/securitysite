import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Assessment from './Assessment';
import AboutSbss from './AboutSbss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/about" element={<AboutSbss />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
