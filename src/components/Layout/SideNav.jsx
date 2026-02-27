import React, { useEffect, useState } from 'react';

const SideNav = () => {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 } // Section is active when at least 50% is visible
        );

        const sections = document.querySelectorAll('.snap-section');
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    const navItems = [
        { id: 'home', label: 'HOME', color: 'var(--color-hot-pink)' },
        { id: 'about', label: 'ABOUT', color: 'var(--color-acid-green)' },
        { id: 'music', label: 'MUSIC', color: 'var(--color-electric-blue)' },
        { id: 'quiz', label: 'QUIZ', color: 'var(--color-red)' },
        { id: 'setlist', label: 'SETLIST', color: 'var(--color-hot-pink)' },
        { id: 'tour', label: 'TOUR', color: 'var(--color-acid-green)' },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            // scrollIntoView works fine with scroll-snap
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav style={{
            width: '300px',
            minWidth: '200px',
            background: 'var(--color-dark)',
            borderRight: '6px solid var(--color-light)',
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem 1rem',
            zIndex: 100,
            position: 'relative'
        }}>
            <h1 className="zine-text" style={{
                fontSize: '4rem',
                color: 'var(--color-hot-pink)',
                textShadow: '4px 4px 0 var(--color-acid-green), -2px -2px 0 var(--color-electric-blue)',
                transform: 'rotate(-3deg)',
                margin: '0 0 3rem 0',
                textAlign: 'center'
            }}>
                Oiii
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1 }}>
                {navItems.map((item, index) => {
                    const isActive = activeSection === item.id;
                    return (
                        <div
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="sticker"
                            style={{
                                background: isActive ? item.color : 'var(--color-light)',
                                color: 'var(--color-dark)',
                                transform: `rotate(${index % 2 === 0 ? '-3deg' : '2deg'}) scale(${isActive ? 1.1 : 1})`,
                                boxShadow: isActive ? '8px 8px 0 rgba(0,0,0,0.8)' : '4px 4px 0 rgba(0,0,0,0.5)',
                                transition: 'all 0.2s',
                                textAlign: 'center',
                                margin: '0 1rem',
                                border: '4px solid var(--color-dark)'
                            }}
                        >
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{item.label}</span>
                            {/* Tape visuals */}
                            {index % 2 === 0 && <div className="tape" style={{ top: '-10px', left: '-10px', width: '40px', transform: 'rotate(-15deg)' }}></div>}
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--color-red)', transform: 'rotate(2deg)' }}>
                    STK AND DESTROY
                </h2>
            </div>

            <div className="tape" style={{ bottom: '10px', right: '-15px', transform: 'rotate(85deg)', width: '60px' }}></div>
        </nav>
    );
};

export default SideNav;
