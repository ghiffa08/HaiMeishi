import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, className = '', type = 'button', href, target, rel, variant = 'primary' }) => {
    const isLink = !!href;
    const baseClass = variant === 'primary' ? 't-btn' : 'c-flip-btn';
    const combinedClass = `${baseClass} ${className}`;

    if (isLink) {
        return (
            <a href={href} target={target} rel={rel} className={combinedClass}>
                {children}
            </a>
        );
    }

    return (
        <button type={type} onClick={onClick} className={combinedClass}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.string,
    href: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary']),
};

export default Button;
