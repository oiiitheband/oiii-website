import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../../data/content.json';
import StickerButton from '../UI/StickerButton';
import uncleSamImage from '../../assets/uncle-sam.png';
import quizBg1 from '../../assets/quiz-bg-1.jpg';
import quizBg2 from '../../assets/quiz-bg-2.jpg';
import quizBg3 from '../../assets/quiz-bg-3.jpg';
import quizBg4 from '../../assets/quiz-bg-4.jpg';

const Quiz = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [resultData, setResultData] = useState(null);
    const [bgImageOptions, setBgImageOptions] = useState([]);

    // Array of possible dynamic positions for the background image
    const positions = [
        { bottom: '-10%', left: '-10%' },
        { bottom: '-10%', right: '-10%' },
        { top: '-10%', right: '-10%' },
        { top: '-10%', left: '-10%' },
        { bottom: '-5%', left: '40%' }, // bottom center-ish
    ];

    useEffect(() => {
        // Prepare random positions for the background image per question
        const options = content.quiz.questions.map(() => {
            const randomPos = positions[Math.floor(Math.random() * positions.length)];
            const randomRot = Math.floor(Math.random() * 20) - 10; // -10 to +10 deg
            return { ...randomPos, rotation: randomRot };
        });
        setBgImageOptions(options);
    }, []);

    const handleAnswer = (pointsTo) => {
        const newScores = { ...scores, [pointsTo]: (scores[pointsTo] || 0) + 1 };
        setScores(newScores);

        if (currentQuestion < content.quiz.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const topSong = Object.keys(newScores).reduce((a, b) => newScores[a] > newScores[b] ? a : b);
            const result = content.quiz.results.find(r => r.song === topSong);
            setResultData(result);
            setShowResult(true);
        }
    };

    const startQuiz = () => {
        setHasStarted(true);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScores({});
        setShowResult(false);
        setResultData(null);
        setHasStarted(false);
    };

    const closeQuiz = () => {
        setIsOpen(false);
        setTimeout(() => {
            resetQuiz();
        }, 300);
    };

    // Splash screen variants
    const splashVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
        exit: { opacity: 0, scale: 1.05, transition: { duration: 0.3 } }
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    onClick={() => setIsOpen(true)}
                    style={{
                        position: 'fixed',
                        bottom: 'clamp(1rem, 4vw, 2rem)',
                        right: 'clamp(1rem, 4vw, 2rem)',
                        zIndex: 900,
                        background: 'var(--color-hot-pink)',
                        padding: 'clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem)',
                        border: '4px solid var(--color-light)',
                        cursor: 'pointer',
                        boxShadow: '6px 6px 0 rgba(0,0,0,1)',
                        transform: 'rotate(2deg)'
                    }}
                >
                    <span className="zine-text" style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: 'var(--color-light)' }}>
                        WHICH SONG ARE YOU? &rarr;
                    </span>
                </motion.div>
            )}

            {/* Expanded Full-Screen Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E"), #111',
                            backgroundBlendMode: 'overlay',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Close Button - increased z-index massively */}
                        <button
                            onClick={closeQuiz}
                            style={{
                                position: 'absolute',
                                top: 'clamp(1rem, 4vw, 2rem)',
                                right: 'clamp(1rem, 4vw, 2rem)',
                                background: hasStarted ? '#000' : 'var(--color-dark)',
                                border: hasStarted ? '3px solid #000' : '3px solid var(--color-light)',
                                color: hasStarted ? '#fff' : 'var(--color-light)',
                                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                                width: 'clamp(40px, 8vw, 50px)',
                                height: 'clamp(40px, 8vw, 50px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                fontFamily: 'sans-serif',
                                lineHeight: '0',
                                paddingBottom: '4px',
                                zIndex: 999999,
                                boxShadow: '4px 4px 0 rgba(0,0,0,1)',
                                transform: 'rotate(5deg)'
                            }}
                        >
                            &times;
                        </button>

                        <AnimatePresence mode="wait">
                            {!hasStarted ? (
                                /* Splash Screen */
                                <motion.div
                                    key="splash"
                                    variants={splashVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="quiz-splash-row"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                        height: '100%',
                                        position: 'relative'
                                    }}
                                >
                                    {/* Left Side: Uncle Sam style image */}
                                    <div
                                        className="quiz-splash-img-side"
                                        style={{
                                            flex: 1,
                                            position: 'relative',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            justifyContent: 'center'
                                        }}>
                                        {/* Using the provided Uncle Sam pointing image */}
                                        <img
                                            src={uncleSamImage}
                                            alt="Uncle Sam Pointing"
                                            style={{
                                                height: '110%',
                                                objectFit: 'cover',
                                                objectPosition: 'top center',
                                                filter: 'grayscale(100%) contrast(150%) brightness(80%) sepia(100%) hue-rotate(320deg) saturate(300%) drop-shadow(10px 10px 20px rgba(0,0,0,0.8))',
                                                mixBlendMode: 'hard-light'
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '40%',
                                            background: 'linear-gradient(to top, #111, transparent)'
                                        }} />
                                    </div>

                                    {/* Right Side: Text & Button */}
                                    <div
                                        className="quiz-splash-text-side"
                                        style={{
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            padding: '4rem',
                                            position: 'relative',
                                            zIndex: 10
                                        }}>
                                        <h1 className="zine-text" style={{
                                            fontSize: 'clamp(2.5rem, 10vw, 6rem)',
                                            lineHeight: '0.9',
                                            color: 'var(--color-light)',
                                            textShadow: '4px 4px 0px #000',
                                            marginBottom: '2rem',
                                            transform: 'rotate(-2deg)'
                                        }}>
                                            WHICH<br />
                                            <span style={{ color: 'var(--color-red)' }}>OIII</span> SONG<br />
                                            ARE <span style={{ color: 'var(--color-red)' }}>YOU?</span>
                                        </h1>

                                        <div
                                            className="torn-edge splash-take-quiz-btn"
                                            onClick={startQuiz}
                                            style={{
                                                background: 'var(--color-red)',
                                                color: '#000',
                                                padding: '1.5rem 3rem',
                                                cursor: 'pointer',
                                                fontFamily: 'var(--font-primary)',
                                                fontSize: '2.5rem',
                                                textTransform: 'uppercase',
                                                boxShadow: '10px 10px 0px rgba(0,0,0,1)',
                                                transform: 'rotate(1deg)',
                                                transition: 'transform 0.2s',
                                                display: 'inline-block'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05) rotate(2deg)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(1deg)'}
                                        >
                                            TAKE THE QUIZ
                                        </div>
                                    </div>

                                    {/* Mobile rough responsive overlay */}
                                    <style>{`
                                        @media(max-width: 768px) {
                                            .quiz-splash-row {
                                                flex-direction: column !important;
                                            }
                                            .quiz-splash-text-side {
                                                align-items: center !important;
                                                padding: 2rem !important;
                                                text-align: center;
                                                justify-content: flex-start !important;
                                                padding-top: 5rem !important;
                                            }
                                            .splash-take-quiz-btn {
                                                font-size: 1.8rem !important;
                                                padding: 1rem 2rem !important;
                                            }
                                            img[alt="Uncle Sam Pointing"] {
                                                opacity: 0.3;
                                                height: 100% !important;
                                                width: 100%;
                                                position: absolute;
                                                top: 0;
                                                left: 0;
                                            }
                                            .quiz-splash-img-side {
                                                position: absolute !important;
                                                top: 0;
                                                left: 0;
                                                width: 100%;
                                                height: 100%;
                                                z-index: 0;
                                            }
                                        }
                                    `}</style>
                                </motion.div>
                            ) : (
                                /* Actual Quiz container */
                                <motion.div
                                    key="quiz-content"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        padding: '2rem'
                                    }}
                                >
                                    {/* Seamless cycling background layer */}
                                    {[quizBg1, quizBg2, quizBg3, quizBg4].map((bgNode, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                backgroundImage: `url(${bgNode})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                zIndex: 0,
                                                opacity: (currentQuestion % 4) === idx ? 1 : 0,
                                                transition: 'opacity 0.7s ease-in-out',
                                                pointerEvents: 'none'
                                            }}
                                        />
                                    ))}

                                    {/* Dynamic Background Image - using uncle sam for now but moves around */}
                                    {!showResult && bgImageOptions.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 0.4, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                            style={{
                                                position: 'absolute',
                                                ...bgImageOptions[currentQuestion],
                                                height: '60vh',
                                                zIndex: 1,
                                                pointerEvents: 'none',
                                                filter: 'grayscale(100%) contrast(150%) brightness(80%) sepia(100%) hue-rotate(320deg) saturate(300%) drop-shadow(10px 10px 20px rgba(0,0,0,0.8))',
                                                mixBlendMode: 'hard-light',
                                                transform: `rotate(${bgImageOptions[currentQuestion]?.rotation || 0}deg)`
                                            }}
                                        >
                                            <img src={uncleSamImage} style={{ height: '100%', objectFit: 'contain' }} alt="Background Vibe" />
                                        </motion.div>
                                    )}


                                    <AnimatePresence mode="wait">
                                        {!showResult ? (
                                            <motion.div
                                                key={currentQuestion}
                                                initial={{ opacity: 0, y: 50, rotate: -2 }}
                                                animate={{ opacity: 1, y: 0, rotate: 0 }}
                                                exit={{ opacity: 0, y: -50, rotate: 2 }}
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.85)',
                                                    padding: '2rem',
                                                    border: '4px solid #000',
                                                    boxShadow: '10px 10px 0 rgba(0,0,0,1)',
                                                    width: '100%',
                                                    maxWidth: '800px',
                                                    position: 'relative',
                                                    zIndex: 10
                                                }}
                                            >
                                                {/* Question Header */}
                                                <div
                                                    className="torn-edge"
                                                    style={{
                                                        background: 'var(--color-light)',
                                                        padding: '1rem 2rem',
                                                        marginBottom: '2rem',
                                                        boxShadow: '10px 10px 0 #000',
                                                        transform: 'rotate(-1deg)',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    <h4 style={{
                                                        fontFamily: 'var(--font-primary), sans-serif',
                                                        fontSize: '1.4rem',
                                                        color: 'var(--color-dark)',
                                                        textTransform: 'uppercase',
                                                        margin: 0
                                                    }}>
                                                        {content.quiz.questions[currentQuestion].text}
                                                    </h4>
                                                </div>

                                                {/* Answers Grid */}
                                                <div style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                                                    gap: 'clamp(0.75rem, 2vw, 1.5rem)'
                                                }}>
                                                    {content.quiz.questions[currentQuestion].options.map((option, idx) => (
                                                        <div
                                                            key={idx}
                                                            onClick={() => handleAnswer(option.pointsTo)}
                                                            style={{
                                                                background: `var(--color-${option.color})`,
                                                                border: '4px solid #000',
                                                                padding: '0.8rem',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                boxShadow: '6px 6px 0 #000',
                                                                transform: `rotate(${Math.floor(Math.random() * 4) - 2}deg)`,
                                                                transition: 'transform 0.1s',
                                                            }}
                                                            onMouseEnter={(e) => { e.currentTarget.style.transform = `scale(1.05) rotate(0deg)`; }}
                                                            onMouseLeave={(e) => { e.currentTarget.style.transform = `scale(1) rotate(${Math.floor(Math.random() * 4) - 2}deg)`; }}
                                                        >
                                                            {/* Fake Checkbox area */}
                                                            <div style={{
                                                                width: '30px',
                                                                height: '30px',
                                                                background: '#fff',
                                                                border: '3px solid #000',
                                                                marginRight: '1rem',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontFamily: 'var(--font-primary)',
                                                                color: 'var(--color-hot-pink)',
                                                                fontSize: '1.5rem'
                                                            }}>
                                                                <span style={{ opacity: 0, transition: 'opacity 0.2s' }}>X</span>
                                                            </div>
                                                            <span style={{
                                                                fontFamily: 'var(--font-secondary)',
                                                                fontSize: '1.1rem',
                                                                color: '#000',
                                                                textTransform: 'uppercase',
                                                                flex: 1
                                                            }}>
                                                                {option.text}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="result"
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                style={{ textAlign: 'center', zIndex: 10 }}
                                            >
                                                <h2 className="zine-text" style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: 'var(--color-light)' }}>YOU ARE:</h2>
                                                <h1 className="zine-text" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: `var(--color-${resultData.color})`, margin: '1rem 0', textShadow: '4px 4px 0 rgba(0,0,0,1)' }}>
                                                    {resultData.song}
                                                </h1>
                                                <div style={{ maxWidth: '600px', margin: '0 auto 2rem auto', background: 'var(--color-dark)', border: '4px solid var(--color-light)', padding: 'clamp(1rem, 4vw, 2rem)', boxShadow: '10px 10px 0 rgba(0,0,0,1)' }}>
                                                    <p style={{ fontFamily: 'var(--font-secondary), sans-serif', fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: 'var(--color-light)', opacity: 0.9 }}>
                                                        {resultData.description}
                                                    </p>
                                                </div>
                                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                                    <StickerButton onClick={resetQuiz} color="var(--color-light)" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>RETAKE</StickerButton>
                                                    <StickerButton onClick={closeQuiz} color="var(--color-hot-pink)" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>CLOSE</StickerButton>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Quiz;
