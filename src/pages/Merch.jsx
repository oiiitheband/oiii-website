import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import StickerButton from '../components/UI/StickerButton';

const MOCK_MERCH = [
    {
        id: 1,
        name: 'STADIUM PUNK TEE',
        category: 'T-Shirts',
        price: 25,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Classic oversized tour tee.'
    },
    {
        id: 2,
        name: 'ACID LOGO HOODIE',
        category: 'Hoodies',
        price: 45,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Heavyweight black hoodie.'
    },
    {
        id: 3,
        name: 'RIOT STICKER PACK',
        category: 'Stickers',
        price: 5,
        image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '5 high quality vinyl stickers.'
    },
    {
        id: 4,
        name: 'BASEMENT RECORDING BADGE',
        category: 'Badges',
        price: 3,
        image: 'https://images.unsplash.com/photo-1621213233866-5b4d7c040bf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Pin it to your jacket.'
    },
    {
        id: 5,
        name: 'LOGO LONG SLEEVE',
        category: 'T-Shirts',
        price: 30,
        image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'For those cold nights in the pit.'
    },
    {
        id: 6,
        name: 'SKULL BADGE',
        category: 'Badges',
        price: 3,
        image: 'https://images.unsplash.com/photo-1619448831969-12ee677bf19f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'A classic.'
    }
];

const CATEGORIES = ['All', 'T-Shirts', 'Hoodies', 'Stickers', 'Badges'];

const Merch = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Pre-compute random rotations for category buttons
    const categoryRotations = useMemo(() =>
        CATEGORIES.map(() => Math.random() * 4 - 2),
        []);

    // Filter items
    const filteredMerch = activeCategory === 'All'
        ? MOCK_MERCH
        : MOCK_MERCH.filter(item => item.category === activeCategory);

    // Cart logic
    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, { ...item, qty: 1 }];
        });
        setIsCartOpen(true);
    };

    const updateQuantity = (id, change) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.qty + change;
                return newQty > 0 ? { ...item, qty: newQty } : item;
            }
            return item;
        }).filter(item => item.qty > 0)); // Clean up 0 items
    };

    const removeItem = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

    return (
        <div style={{
            width: '100vw',
            minHeight: '100vh',
            background: 'var(--color-dark)',
            color: 'var(--color-light)',
            paddingTop: '8rem', // Account for TopNav
            position: 'relative',
            boxSizing: 'border-box'
        }}>

            {/* Floating Cart Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(true)}
                style={{
                    position: 'fixed',
                    top: '2rem',
                    right: '2rem',
                    zIndex: 1000,
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-acid-green)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                <ShoppingCart size={32} />
                {cartCount > 0 && (
                    <span className="zine-text text-dark" style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        background: 'var(--color-acid-green)',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                    }}>
                        {cartCount}
                    </span>
                )}
            </motion.button>

            <div className="container" style={{ paddingBottom: '4rem' }}>

                {/* Header */}
                <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                    <motion.h1
                        className="zine-text"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        style={{
                            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                            lineHeight: '1.2',
                            paddingTop: '1rem',
                            textAlign: 'center',
                            color: 'var(--color-light)',
                            marginBottom: '2rem',
                            textShadow: '4px 4px 0 var(--color-hot-pink)'
                        }}
                    >
                        MERCH
                    </motion.h1>
                    <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: -15 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                        style={{
                            position: 'absolute',
                            top: '10%',
                            right: '20%',
                            background: 'var(--color-acid-green)',
                            color: '#000',
                            padding: '0.5rem 1.5rem',
                            fontSize: 'clamp(1rem, 3vw, 1.8rem)',
                            fontWeight: 'bold',
                            fontFamily: 'var(--font-primary)',
                            border: '3px solid #000',
                            boxShadow: '6px 6px 0 rgba(0,0,0,1)',
                            zIndex: 5
                        }}
                    >
                        COMING SOON
                    </motion.div>
                </div>

                {/* Categories */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    marginBottom: '4rem'
                }}>
                    {CATEGORIES.map((category, idx) => (
                        <StickerButton
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            color={activeCategory === category ? 'var(--color-acid-green)' : 'var(--color-light)'}
                            style={{
                                fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                                transform: `rotate(${categoryRotations[idx]}deg)`
                            }}
                        >
                            {category}
                        </StickerButton>
                    ))}
                </div>

                {/* Product Grid */}
                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '3rem 2rem'
                    }}
                >
                    <AnimatePresence>
                        {filteredMerch.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                key={item.id}
                                className="rough-border"
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    padding: '1rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Image */}
                                <div style={{
                                    width: '100%',
                                    aspectRatio: '1',
                                    background: '#111',
                                    marginBottom: '1rem',
                                    border: '2px solid var(--color-light)'
                                }}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        loading="lazy"
                                        decoding="async"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
                                        onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%)'}
                                        onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%)'}
                                    />
                                </div>

                                {/* Details */}
                                <h3 className="zine-text" style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-acid-green)' }}>
                                    {item.name}
                                </h3>
                                <p style={{ fontFamily: 'var(--font-secondary), sans-serif', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem', flex: 1 }}>
                                    {item.description}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className="zine-text" style={{ fontSize: '1.5rem' }}>${item.price}</span>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="zine-text"
                                        style={{
                                            background: 'var(--color-light)',
                                            color: 'var(--color-dark)',
                                            border: 'none',
                                            padding: '0.5rem 1rem',
                                            fontSize: '1.2rem',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={(e) => e.target.style.background = 'var(--color-acid-green)'}
                                        onMouseLeave={(e) => e.target.style.background = 'var(--color-light)'}
                                    >
                                        ADD
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>

            {/* Slide-out Cart Sidebar */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: '100vh',
                                background: 'rgba(0,0,0,0.8)',
                                zIndex: 1001,
                                backdropFilter: 'blur(5px)'
                            }}
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                right: 0,
                                width: '100%',
                                maxWidth: '400px',
                                height: '100vh',
                                background: 'var(--color-dark)',
                                borderLeft: '4px solid var(--color-acid-green)',
                                zIndex: 1002,
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
                            }}
                        >
                            {/* Cart Header */}
                            <div style={{ padding: '2rem', borderBottom: '2px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 className="zine-text" style={{ fontSize: '2rem', color: 'var(--color-acid-green)' }}>YOUR SHIT</h2>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    style={{ background: 'none', border: 'none', color: 'var(--color-light)', cursor: 'pointer' }}
                                >
                                    <X size={32} />
                                </button>
                            </div>

                            {/* Cart Items */}
                            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {cart.length === 0 ? (
                                    <p style={{ fontFamily: 'var(--font-secondary), sans-serif', textAlign: 'center', opacity: 0.5, marginTop: '2rem' }}>It's empty. Buy something.</p>
                                ) : (
                                    cart.map(item => (
                                        <div key={item.id} style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
                                            <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                                            <div style={{ flex: 1 }}>
                                                <h4 className="zine-text" style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{item.name}</h4>
                                                <p style={{ fontFamily: 'var(--font-secondary), sans-serif', color: 'var(--color-acid-green)', marginBottom: '0.5rem' }}>${item.price}</p>

                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.2rem', borderRadius: '4px' }}>
                                                        <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', color: 'var(--color-light)', cursor: 'pointer', padding: '0.2rem' }}><Minus size={16} /></button>
                                                        <span style={{ fontFamily: 'var(--font-secondary), sans-serif', fontWeight: 'bold' }}>{item.qty}</span>
                                                        <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', color: 'var(--color-light)', cursor: 'pointer', padding: '0.2rem' }}><Plus size={16} /></button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: 'var(--font-secondary), sans-serif', textDecoration: 'underline', fontSize: '0.9rem' }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Cart Footer */}
                            {cart.length > 0 && (
                                <div style={{ padding: '2rem', borderTop: '2px solid rgba(255,255,255,0.1)', background: '#111' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                        <span className="zine-text" style={{ fontSize: '1.5rem' }}>TOTAL</span>
                                        <span className="zine-text" style={{ fontSize: '1.5rem', color: 'var(--color-acid-green)' }}>${cartTotal}</span>
                                    </div>
                                    <button
                                        className="zine-text"
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            background: 'var(--color-hot-pink)',
                                            color: 'var(--color-light)',
                                            border: 'none',
                                            fontSize: '1.5rem',
                                            cursor: 'pointer',
                                            boxShadow: '4px 4px 0 var(--color-light)',
                                            transition: 'transform 0.1s'
                                        }}
                                        onMouseDown={(e) => e.target.style.transform = 'translate(2px, 2px)'}
                                        onMouseUp={(e) => e.target.style.transform = 'translate(0, 0)'}
                                        onClick={() => {
                                            alert('Checkout simulation complete!');
                                            setCart([]);
                                            setIsCartOpen(false);
                                        }}
                                    >
                                        CHECKOUT
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </div>
    );
};

export default Merch;
