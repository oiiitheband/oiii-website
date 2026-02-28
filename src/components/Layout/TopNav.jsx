import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import logo from '../../assets/logo.png';

const TopNav = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const container = document.querySelector('.snap-container');
        if (!container) {
            queueMicrotask(() => setScrolled(true));
            return;
        }

        const handleScroll = (e) => {
            setScrolled(e.target.scrollTop > 50);
        };

        container.addEventListener('scroll', handleScroll);
        if (container.scrollTop === 0) queueMicrotask(() => setScrolled(false));

        return () => container.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    const scrollToSection = (id) => {
        setMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const linkStyle = {
        fontFamily: 'var(--font-secondary), sans-serif',
        fontWeight: 'bold',
        fontSize: scrolled ? '0.8rem' : '1rem',
        color: 'var(--color-light)',
        cursor: 'pointer',
        letterSpacing: '1px',
        transition: 'all 0.3s ease',
    };

    return (
        <>
            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 100,
                background: scrolled ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(10px)',
                padding: scrolled ? '0.75rem 1.5rem' : '1rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                boxSizing: 'border-box'
            }}>
                {/* Desktop: Left links */}
                <div className="desktop-nav-links" style={{ display: 'flex', gap: '2rem', flex: 1, justifyContent: 'flex-end', paddingRight: '2rem', transition: 'all 0.3s ease' }}>
                    <span style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'var(--color-acid-green)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-light)'} onClick={() => scrollToSection('home')}>HOME</span>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <span style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'var(--color-acid-green)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-light)'} onClick={() => navigate('/merch')}>MERCH</span>
                        <span style={{
                            position: 'absolute',
                            top: '-12px',
                            right: '-25px',
                            background: 'var(--color-hot-pink)',
                            color: 'var(--color-light)',
                            fontSize: '0.6rem',
                            padding: '2px 4px',
                            fontWeight: 'bold',
                            transform: 'rotate(15deg)',
                            border: '1px solid #000',
                            pointerEvents: 'none',
                            zIndex: 10
                        }}>SOON</span>
                    </div>
                </div>

                {/* Logo — center on desktop, left-ish on mobile */}
                <img
                    src={logo}
                    alt="Oiii Logo"
                    onClick={() => scrollToSection('home')}
                    style={{
                        height: scrolled ? '35px' : '55px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        flexShrink: 0
                    }}
                />

                {/* Desktop: Right links */}
                <div className="desktop-nav-links" style={{ display: 'flex', gap: '2rem', flex: 1, paddingLeft: '2rem', transition: 'all 0.3s ease' }}>
                    <span style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'var(--color-electric-blue)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-light)'} onClick={() => scrollToSection('videos')}>VIDEOS</span>
                    <span style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'var(--color-electric-blue)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-light)'} onClick={() => scrollToSection('setlist')}>SETLIST</span>
                </div>

                {/* Hamburger — mobile only */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setMenuOpen(true)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-light)',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        display: 'none'
                    }}
                    aria-label="Open menu"
                >
                    <Menu size={28} />
                </button>
            </nav>

            {/* Mobile Full-Screen Menu Overlay */}
            {menuOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.97)',
                    zIndex: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2.5rem'
                }}>
                    <button
                        onClick={() => setMenuOpen(false)}
                        style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-light)',
                            cursor: 'pointer'
                        }}
                        aria-label="Close menu"
                    >
                        <X size={32} />
                    </button>

                    <img src={logo} alt="Oiii Logo" style={{ height: '60px', marginBottom: '1rem' }} />

                    {[
                        { label: 'HOME', action: () => scrollToSection('home') },
                        { label: 'VIDEOS', action: () => scrollToSection('videos') },
                        { label: 'SETLIST', action: () => scrollToSection('setlist') },
                        { label: 'MUSIC', action: () => scrollToSection('music') },
                        { label: 'MERCH', action: () => { setMenuOpen(false); navigate('/merch'); } },
                    ].map(({ label, action }) => (
                        <div key={label} style={{ position: 'relative' }}>
                            <span
                                onClick={action}
                                style={{
                                    fontFamily: 'var(--font-primary)',
                                    fontSize: '2.5rem',
                                    color: 'var(--color-light)',
                                    cursor: 'pointer',
                                    letterSpacing: '3px',
                                    transition: 'color 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.color = 'var(--color-acid-green)'}
                                onMouseLeave={(e) => e.target.style.color = 'var(--color-light)'}
                            >
                                {label}
                            </span>
                            {label === 'MERCH' && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '-40px',
                                    background: 'var(--color-hot-pink)',
                                    color: 'var(--color-light)',
                                    fontSize: '1rem',
                                    padding: '4px 8px',
                                    fontWeight: 'bold',
                                    transform: 'rotate(12deg)',
                                    border: '2px solid #000',
                                    fontFamily: 'var(--font-secondary)',
                                    pointerEvents: 'none'
                                }}>SOON</span>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Responsive nav styles */}
            <style>{`
                @media (max-width: 768px) {
                    .desktop-nav-links { display: none !important; }
                    .mobile-menu-btn { display: block !important; }
                }
            `}</style>
        </>
    );
};

export default TopNav;
