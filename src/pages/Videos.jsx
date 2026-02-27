import React from 'react';
import { motion } from 'framer-motion';

import content from '../data/content.json';

const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const getThumbnail = (url) => {
    const id = getYouTubeId(url);
    if (!id) return 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; // fallback
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
};

const Videos = () => {
    return (
        <div style={{
            width: '100vw',
            minHeight: '100vh',
            background: 'var(--color-dark)',
            color: 'var(--color-light)',
            padding: '8rem 4rem 4rem 4rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box'
        }}>
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="zine-text"
                style={{
                    fontSize: '4rem',
                    marginBottom: '4rem',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    letterSpacing: '2px',
                    color: 'var(--color-acid-green)'
                }}
            >
                VIDEOS
            </motion.h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                width: '100%',
                maxWidth: '1200px'
            }}>
                {content.videos?.map((video, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                            position: 'relative',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            border: '2px solid rgba(255,255,255,0.1)',
                            aspectRatio: '16/9',
                            background: '#111'
                        }}
                        onClick={() => window.open(video.youtubeLink, '_blank')}
                        onMouseEnter={(e) => {
                            e.currentTarget.querySelector('img').style.filter = 'grayscale(0%)';
                            e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
                            e.currentTarget.style.borderColor = 'var(--color-acid-green)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.querySelector('img').style.filter = 'grayscale(100%)';
                            e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        }}
                    >
                        <img
                            src={getThumbnail(video.youtubeLink)}
                            alt={video.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'grayscale(100%)',
                                transition: 'all 0.4s ease'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            padding: '1.5rem',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                            boxSizing: 'border-box'
                        }}>
                            <h3 style={{
                                fontFamily: 'var(--font-secondary), sans-serif',
                                fontSize: '1.2rem',
                                margin: 0,
                                fontWeight: 'bold',
                                letterSpacing: '1px'
                            }}>
                                {video.title}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Videos;
