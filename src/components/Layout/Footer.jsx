import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            marginTop: 'auto',
            padding: '3rem 1rem',
            background: 'var(--color-dark)',
            borderTop: '4px solid var(--color-light)',
            textAlign: 'center',
            position: 'relative',
            zIndex: 20
        }}>
            <div className="container">
                <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', color: 'var(--color-acid-green)', transform: 'rotate(2deg)' }}>
                    STK AND DESTROY
                </h2>
                <p className="zine-text" style={{ marginTop: '1rem', color: 'var(--color-light)', fontSize: 'clamp(0.8rem, 3vw, 1rem)' }}>
                    &copy; {new Date().getFullYear()} Oiii. No rights reserved. Steal our music.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1rem, 4vw, 2rem)', marginTop: '2rem' }}>
                    <a href="#" className="zine-text text-hot-pink" style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', textDecoration: 'underline' }}>Insta</a>
                    <a href="#" className="zine-text text-electric-blue" style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', textDecoration: 'underline' }}>Spotify</a>
                    <a href="#" className="zine-text text-acid-green" style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', textDecoration: 'underline' }}>Bandcamp</a>
                </div>
            </div>

            {/* Tape marks for edge */}
            <div className="tape" style={{ bottom: '-10px', left: '20%', transform: 'rotate(-10deg)' }}></div>
        </footer>
    );
};

export default Footer;
