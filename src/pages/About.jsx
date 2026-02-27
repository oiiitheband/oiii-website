import React from 'react';
import { motion } from 'framer-motion';
import content from '../data/content.json';
import TornPanel from '../components/UI/TornPanel';

import prayasImg from '../assets/prayas.jpg';

const About = () => {
    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            backgroundImage: `url(${prayasImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '4rem 10vw'
        }}>
            {/* Translucent overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.65)',
                zIndex: 0
            }}></div>

            {/* Artwork Credit */}
            <a
                href="https://www.instagram.com/mrigajab"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '20px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: 'var(--font-secondary), sans-serif',
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    zIndex: 2,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}
            >
                artwork by @mrigajab
            </a>

            <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
                <TornPanel rotation="2deg" color="var(--color-electric-blue)" style={{ maxWidth: '800px' }}>
                    <h2 className="zine-text text-dark" style={{
                        fontSize: '4rem',
                        marginBottom: '2rem',
                        textShadow: '2px 2px 0 var(--color-light)'
                    }}>
                        WHO WE ARE
                    </h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: 'var(--color-light)',
                            padding: '2rem',
                            border: '4px solid var(--color-dark)',
                            transform: 'rotate(-1deg)',
                            boxShadow: '4px 4px 0 var(--color-dark)'
                        }}
                    >
                        <p style={{
                            fontSize: '1.5rem',
                            lineHeight: 1.6,
                            fontFamily: 'var(--font-secondary), sans-serif',
                            fontWeight: 'bold',
                            color: 'var(--color-dark)'
                        }}>
                            {content.bio}
                        </p>
                    </motion.div>
                </TornPanel>
            </div>
        </div>
    );
};

export default About;
