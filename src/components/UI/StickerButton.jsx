import React from 'react';

const StickerButton = ({ children, onClick, href, color = 'var(--color-light)', rotation = '-2deg', style = {} }) => {
    const Component = href ? 'a' : 'button';

    return (
        <Component
            href={href}
            onClick={onClick}
            className="sticker"
            style={{
                background: color,
                transform: `rotate(${rotation})`,
                ...style
            }}
        >
            {children}
        </Component>
    );
};

export default StickerButton;
