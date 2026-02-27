import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MainScroll from './pages/MainScroll';
import Merch from './pages/Merch';
import Quiz from './components/Features/Quiz';
import SocialLinks from './components/Features/SocialLinks';
import './index.css';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<MainScroll />} />
          <Route path="/merch" element={<Merch />} />
        </Routes>
      </Layout>

      {/* Floating Elements */}
      <Quiz />
      <SocialLinks />
    </>
  );
}

export default App;
