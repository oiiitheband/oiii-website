import React from 'react';
import Home from './Home';
import About from './About';
import Music from './Music';
import Videos from './Videos';
import SetlistBuilder from '../components/Features/SetlistBuilder';
import YouTubeEmbed from '../components/Features/YouTubeEmbed';
import HorizontalCarousel from '../components/Features/HorizontalCarousel';

const MainScroll = () => {
    return (
        <>
            <section id="home" className="snap-section" style={{ padding: 0 }}>
                <Home />
            </section>
            <section id="merch-preview" style={{ height: '100vh', width: '100vw', scrollSnapAlign: 'start', padding: 0, margin: 0, overflow: 'hidden' }}>
                <YouTubeEmbed />
            </section>
            <section id="carousel" className="snap-section" style={{ padding: 0 }}>
                <HorizontalCarousel />
            </section>
            <section id="about" className="snap-section">
                <About />
            </section>
            <section id="music" className="snap-section" style={{ padding: 0 }}>
                <Music />
            </section>
            <section id="setlist" className="snap-section" style={{ padding: 0 }}>
                <SetlistBuilder />
            </section>
            <section id="videos" className="snap-section" style={{ padding: 0, height: '100vh', width: '100vw', margin: 0 }}>
                <Videos />
            </section>
        </>
    );
};

export default MainScroll;
