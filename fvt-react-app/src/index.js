import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";
import Main from "./Main";
import Recommendations from "./Recommendations"
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ScrollToTop/>
    <Header/>
    <Routes>
        <Route path='/' exact element={< Main/>} />
        <Route path='/recommendations' exact element={< Recommendations/>} />
    </Routes>
    <Footer/>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
