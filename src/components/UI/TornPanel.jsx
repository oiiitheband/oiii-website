import React, { useMemo } from 'react';

const TornPanel = ({ children, color = 'var(--color-light)', rotation = '0deg', style = {} }) => {
    const tapeConfig = useMemo(() => ({
        showTop: Math.random() > 0.5,
        topRotation: Math.random() * 20 - 10,
        showBottom: Math.random() > 0.5,
        bottomRotation: Math.random() * 20 - 10,
    }), []);

    return (
        <div style={{
            position: 'relative',
            transform: `rotate(${rotation})`,
            margin: '1rem 0',
            ...style
        }}>
            <div
                className="torn-edge"
                style={{
                    background: color,
                    padding: '2rem',
                    color: 'var(--color-dark)',
                    boxShadow: '8px 8px 0 rgba(0,0,0,0.8)',
                    position: 'relative',
                    zIndex: 2
                }}
            >
                <div style={{ position: 'relative', zIndex: 3 }}>
                    {children}
                </div>
            </div>

            {/* Background bleed for shadow/layer effect */}
            <div
                className="torn-edge"
                style={{
                    position: 'absolute',
                    top: '4px',
                    left: '4px',
                    width: '100%',
                    height: '100%',
                    background: 'var(--color-dark)',
                    zIndex: 1
                }}
            ></div>

            {/* Decorative tape pieces */}
            {tapeConfig.showTop && <div className="tape" style={{ top: '-10px', left: '10%', transform: `rotate(${tapeConfig.topRotation}deg)` }}></div>}
            {tapeConfig.showBottom && <div className="tape" style={{ bottom: '-10px', right: '10%', transform: `rotate(${tapeConfig.bottomRotation}deg)` }}></div>}
        </div>
    );
};

export default TornPanel;
