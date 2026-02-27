import React from 'react';

const YouTubeEmbed = () => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'var(--color-dark)',
            position: 'relative'
        }}>

            <div style={{
                width: '90%',
                maxWidth: '1200px',
                aspectRatio: '16/9',
                border: '6px solid var(--color-light)',
                boxShadow: '10px 10px 0 rgba(0,0,0,0.8)',
                background: 'var(--color-dark)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Tape corners for rough aesthetic */}
                <div className="tape" style={{ top: '-10px', left: '-20px', transform: 'rotate(-10deg)', width: '60px' }}></div>
                <div className="tape" style={{ bottom: '-10px', right: '-20px', transform: 'rotate(10deg)', width: '60px' }}></div>

                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/oloCv56h_eM?autoplay=0"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0 }}
                ></iframe>
            </div>
        </div>
    );
};

export default YouTubeEmbed;
