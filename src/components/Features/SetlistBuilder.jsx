import React, { useState } from 'react';
import { Reorder, motion } from 'framer-motion';
import content from '../../data/content.json';

const SetlistBuilder = () => {
    const [items, setItems] = useState([
        ...content.setlistPool
    ]);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'var(--color-dark)',
            padding: '0 clamp(1rem, 5vw, 10vw)'
        }}>
            <div style={{ width: '100%', maxWidth: '600px' }}>
                <h3 className="zine-text" style={{
                    fontSize: 'clamp(2rem, 8vw, 4rem)',
                    color: 'var(--color-electric-blue)',
                    transform: 'rotate(-2deg)',
                    textShadow: '3px 3px 0 rgba(0,0,0,0.8)',
                    marginBottom: '1rem',
                    textAlign: 'center'
                }}>
                    DRAFT THE SETLIST
                </h3>
                <p style={{
                    color: 'var(--color-light)',
                    fontFamily: 'var(--font-secondary), sans-serif',
                    textAlign: 'center',
                    marginBottom: '3rem',
                    fontSize: '1.2rem',
                    opacity: 0.8
                }}>
                    Drag and drop. Press play on YouTube (Coming soon to API).
                </p>

                <Reorder.Group
                    axis="y"
                    values={items}
                    onReorder={setItems}
                    style={{
                        listStyleType: 'none',
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.8rem',
                        alignItems: 'center'
                    }}
                >
                    {items.map((item, index) => (
                        <Reorder.Item
                            key={item}
                            value={item}
                            style={{ position: 'relative', width: '100%' }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileDrag={{ scale: 1.05, zIndex: 50, rotate: index % 2 === 0 ? -2 : 2, boxShadow: '10px 10px 0 rgba(0,0,0,0.9)' }}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'grab',
                                    width: '100%',
                                    padding: '1rem 2rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '2px solid rgba(255,255,255,0.2)',
                                    color: 'var(--color-light)',
                                    backdropFilter: 'blur(4px)'
                                }}
                            >
                                <span className="zine-text" style={{ fontSize: '1.5rem', letterSpacing: '1px' }}>
                                    {index + 1}. {item}
                                </span>
                                <span style={{ fontSize: '1.2rem', opacity: 0.5, fontFamily: 'monospace' }}>☰</span>
                            </motion.div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
        </div>
    );
};

export default SetlistBuilder;
