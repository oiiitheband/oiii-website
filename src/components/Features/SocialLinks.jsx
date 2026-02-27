import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const SocialLinks = () => {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
                position: 'fixed',
                bottom: '2rem',
                left: '2rem',
                zIndex: 900,
                display: 'flex',
                gap: '1rem',
                background: 'var(--color-dark)',
                padding: '1rem 1.5rem',
                border: '4px solid var(--color-electric-blue)',
                boxShadow: '-6px 6px 0 rgba(0,0,0,1)',
                transform: 'rotate(-2deg)'
            }}
        >
            <a href="#" style={{ color: 'var(--color-light)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-hot-pink)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-light)'} aria-label="Instagram"><Instagram size={28} /></a>
            <a href="#" style={{ color: 'var(--color-light)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-hot-pink)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-light)'} aria-label="Facebook"><Facebook size={28} /></a>
            <a href="#" style={{ color: 'var(--color-light)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-hot-pink)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-light)'} aria-label="YouTube"><Youtube size={28} /></a>
        </motion.div>
    );
};

export default SocialLinks;
