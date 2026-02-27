import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

const TopNav = () => {
    const [scrolled, setScrolled] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const container = document.querySelector('.snap-container');
        // If we are on a page that doesn't have snap container, skip
        if (!container) {
            // Use microtask to avoid synchronous setState in effect
            queueMicrotask(() => setScrolled(true));
            return;
        }

        const handleScroll = (e) => {
            setScrolled(e.target.scrollTop > 50);
        };

        container.addEventListener('scroll', handleScroll);
        // Reset scroll when on index
        if (container.scrollTop === 0) queueMicrotask(() => setScrolled(false));

        return () => container.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    const scrollToSection = (id) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
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
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 100,
            background: scrolled ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
            padding: scrolled ? '1rem 4rem' : '2rem 4rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.3s ease',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent'
        }}>
            <div style={{ display: 'flex', gap: '3rem', flex: 1, justifyContent: 'flex-end', paddingRight: scrolled ? '2rem' : '4rem', transition: 'all 0.3s ease' }}>
                <span style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'var(--color-acid-green)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-light)'} onClick={() => scrollToSection('home')}>HOME</span>
                <span style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'var(--color-acid-green)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-light)'} onClick={() => navigate('/merch')}>MERCH</span>
            </div>

            <img
                src={logo}
                alt="Oiii Logo"
                style={{
                    height: scrolled ? '40px' : '80px',
                    margin: '0 2rem',
                    transition: 'all 0.3s ease'
                }}
            />

            <div style={{ display: 'flex', gap: '3rem', flex: 1, paddingLeft: scrolled ? '2rem' : '4rem', transition: 'all 0.3s ease' }}>
                <span style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'var(--color-electric-blue)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-light)'} onClick={() => scrollToSection('videos')}>VIDEOS</span>
                <span style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'var(--color-electric-blue)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-light)'} onClick={() => scrollToSection('setlist')}>SETLIST</span>
            </div>
        </nav>
    );
};

export default TopNav;
