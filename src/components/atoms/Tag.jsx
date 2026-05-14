import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Tag = ({ children, variant = 'light', className = '', style = {} }) => {
    const baseClass = variant === 'dark' ? 't-detail-tag dark' : 't-detail-tag';
    const combinedClass = `${baseClass} ${className}`;

    return (
        <span className={combinedClass} style={style}>
            {children}
        </span>
    );
};

Tag.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['light', 'dark']),
    className: PropTypes.string,
    style: PropTypes.object,
};

export default memo(Tag);
