import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Assessment from './Assessment';
import Services from './Services';
import Contact from './Contact';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </BrowserRouter>
);
