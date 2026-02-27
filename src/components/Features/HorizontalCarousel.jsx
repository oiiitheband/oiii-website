import React from 'react';

const HorizontalCarousel = () => {
    // Generate array for 10 images
    const images = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            background: 'var(--color-dark)',
            overflow: 'hidden',
            paddingTop: '8rem',
            paddingBottom: '4rem',
            boxSizing: 'border-box'
        }}>
            {/* Horizontal scrolling container */}
            <div style={{
                display: 'flex',
                gap: 0,
                width: '100%',
                height: '100%',
                overflowX: 'scroll',
                scrollSnapType: 'x mandatory',
                /* Hide scrollbar */
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
          ::-webkit-scrollbar { display: none; }
        `}} />

                {images.map((img) => (
                    <div key={img} style={{
                        flex: '0 0 auto',
                        height: '100%',
                        scrollSnapAlign: 'start',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img
                            src={`/src/assets/carousel/Slice ${img}.jpg`}
                            alt={`Carousel Slice ${img}`}
                            onError={(e) => {
                                // Ignore missing images locally and just show gray background
                                e.target.style.display = 'none';
                            }}
                            style={{
                                height: '100%',
                                width: 'auto',
                                objectFit: 'cover',
                                display: 'block'
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HorizontalCarousel;
