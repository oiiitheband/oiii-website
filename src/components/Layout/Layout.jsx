import React from 'react';
import TopNav from './TopNav';

const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper" style={{ background: 'var(--color-dark)' }}>
      {/* Noise overlay dialed back for cleaner stadium look */}
      <div className="noise-overlay" style={{ opacity: 0.02 }}></div>
      <TopNav />
      <main className="snap-container" style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
