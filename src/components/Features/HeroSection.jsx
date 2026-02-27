import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Headphones, Youtube, Radio } from 'lucide-react';

// We will assume bg1.jpg and bg2.jpg will be placed in src/assets/ by the user as requested.
// We use direct imports since this is Vite. If they are missing, Vite will error until they are added.
import bg1 from '../../assets/bg1.jpg';
import bg2 from '../../assets/bg2.jpg';

const images = [bg1, bg2];

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Background Images Crossfade */}
            <AnimatePresence>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${images[currentIndex]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 1
                    }}
                />
            </AnimatePresence>

            {/* Dark Translucent Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                zIndex: 2
            }}></div>

            {/* Centered Content: Latest Release Callout */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <span style={{
                        fontFamily: 'var(--font-secondary), sans-serif',
                        fontSize: '1.2rem',
                        letterSpacing: '4px',
                        color: 'var(--color-acid-green)',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                    }}>
                        Latest Release
                    </span>
                    <h2 className="zine-text" style={{
                        fontSize: '6rem',
                        color: 'var(--color-light)',
                        margin: '0.5rem 0 2rem 0',
                        textShadow: '0 4px 10px rgba(0,0,0,0.8)'
                    }}>
                        KHOJDAI
                    </h2>

                    <a href="#music" className="sticker" style={{
                        background: 'transparent',
                        color: 'var(--color-light)',
                        border: '2px solid var(--color-light)',
                        boxShadow: 'none',
                        fontSize: '1.2rem',
                        padding: '1rem 3rem',
                        textDecoration: 'none',
                        letterSpacing: '2px',
                        transition: 'all 0.3s ease',
                        display: 'inline-block'
                    }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'var(--color-light)';
                            e.target.style.color = 'var(--color-dark)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = 'var(--color-light)';
                        }}>
                        LISTEN NOW
                    </a>

                    {/* Streaming Links */}
                    <div style={{
                        display: 'flex',
                        gap: '2rem',
                        marginTop: '3rem',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <a href="#" style={{ color: 'var(--color-light)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-acid-green)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-light)'} aria-label="Spotify"><Music size={32} /></a>
                        <a href="#" style={{ color: 'var(--color-light)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-acid-green)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-light)'} aria-label="Apple Music"><Headphones size={32} /></a>
                        <a href="#" style={{ color: 'var(--color-light)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-acid-green)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-light)'} aria-label="YouTube Music"><Youtube size={32} /></a>
                        <a href="#" style={{ color: 'var(--color-light)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-acid-green)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-light)'} aria-label="Amazon Music"><Radio size={32} /></a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
