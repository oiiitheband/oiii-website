import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../data/content.json';
import StickerButton from '../components/UI/StickerButton';

const ReleaseItem = ({ release }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            whileHover={{ y: -5 }}
            style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                padding: '0.75rem',
                border: '2px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.02)',
                position: 'relative'
            }}
        >
            <div style={{
                width: '80px',
                height: '80px',
                border: '2px solid var(--color-light)',
                boxShadow: '3px 3px 0 rgba(0,0,0,0.8)',
                overflow: 'hidden',
                flexShrink: 0
            }}>
                {release.image ? (
                    <img
                        src={release.image.startsWith('/') ? `${import.meta.env.BASE_URL}${release.image.slice(1)}` : release.image}
                        alt={release.title}
                        loading="lazy"
                        decoding="async"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', background: `var(--color-${release.coverColor || 'dark'})` }} />
                )}
            </div>
            <div style={{ flexGrow: 1 }}>
                <h3 className="zine-text" style={{ fontSize: '1.2rem', margin: '0 0 0.2rem 0', color: 'var(--color-light)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {release.title}
                    {release.label && (
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-dark)', backgroundColor: 'var(--color-acid-green)', padding: '0.1rem 0.3rem', transform: 'rotate(-5deg)', display: 'inline-block' }}>{release.label}</span>
                    )}
                </h3>
                <span style={{ fontFamily: 'var(--font-secondary), sans-serif', fontSize: '0.9rem', color: 'var(--color-acid-green)', fontWeight: 'bold', display: 'block' }}>{release.year}</span>

                <div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{ marginTop: '0.5rem', display: 'inline-block', position: 'relative' }}
                >
                    <div style={{
                        background: 'var(--color-hot-pink)',
                        color: 'var(--color-light)',
                        padding: '0.2rem 0.5rem',
                        fontFamily: 'var(--font-primary)',
                        fontSize: '1rem',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transform: 'rotate(-2deg)',
                        display: 'inline-block',
                        border: '2px solid var(--color-light)',
                        boxShadow: '2px 2px 0 rgba(0,0,0,1)'
                    }}>
                        LISTEN
                    </div>

                    <AnimatePresence>
                        {hovered && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '0',
                                    display: 'flex',
                                    background: 'var(--color-dark)',
                                    border: '2px solid var(--color-light)',
                                    padding: '0.5rem',
                                    gap: '0.5rem',
                                    marginTop: '0.5rem',
                                    zIndex: 20,
                                    boxShadow: '4px 4px 0 rgba(0,0,0,1)'
                                }}
                            >
                                {['Spotify', 'Apple Music', 'YT Music', 'YouTube'].map(p => (
                                    <span key={p} style={{
                                        color: 'var(--color-acid-green)',
                                        fontSize: '0.8rem',
                                        fontFamily: 'var(--font-secondary), sans-serif',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap'
                                    }}
                                        onMouseEnter={(e) => e.target.style.color = 'var(--color-hot-pink)'}
                                        onMouseLeave={(e) => e.target.style.color = 'var(--color-acid-green)'}
                                    >
                                        {p}
                                    </span>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

const MusicMerch = () => {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 clamp(1rem, 5vw, 10vw)',
            background: 'var(--color-dark)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                {/* DISCOGRAPHY COLUMN */}
                <div style={{ flex: '1 1 100%', maxWidth: '800px' }}>
                    <h2 className="zine-text" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: 'var(--color-light)', marginBottom: '2rem', letterSpacing: '2px', textShadow: '2px 2px 0 var(--color-acid-green)', textAlign: 'center' }}>
                        DISCOGRAPHY
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        {content.music.map((release) => (
                            <ReleaseItem key={release.id} release={release} />
                        ))}
                    </div>
                </div>

                {/* EASTER EGG TAPE: Barely visible, blends in with the noise/background, moved to bottom right of container */}
                <div
                    onClick={() => setShowDemo(true)}
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        right: '20px',
                        width: '30px',
                        height: '10px',
                        background: 'rgba(255,255,255,0.05)',
                        cursor: 'pointer',
                        transform: 'rotate(15deg)'
                    }}
                    title="?"
                ></div>

            </div>

            {/* EASTER EGG DEMO MODAL */}
            <AnimatePresence>
                {showDemo && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(0,0,0,0.9)',
                            zIndex: 1000,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <div style={{
                            background: 'var(--color-dark)',
                            border: '4px solid var(--color-acid-green)',
                            padding: '4rem',
                            maxWidth: '600px',
                            textAlign: 'center',
                            boxShadow: '0 0 50px rgba(212, 255, 0, 0.2)'
                        }}>
                            <h2 className="zine-text text-acid" style={{ fontSize: '3rem', marginBottom: '1rem' }}>UNRELEASED DEMO FOUND</h2>
                            <p style={{ fontFamily: 'var(--font-secondary), sans-serif', color: 'var(--color-light)', marginBottom: '2rem' }}>You found the stash. Don't tell management.</p>

                            <div style={{ width: '100%', height: '80px', border: '2px solid var(--color-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                                <span className="zine-text" style={{ color: 'var(--color-light)' }}>[AUDIO CLIP PLACEHOLDER]</span>
                            </div>

                            <StickerButton onClick={() => setShowDemo(false)} color="var(--color-hot-pink)">
                                BURY IT
                            </StickerButton>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default MusicMerch;
