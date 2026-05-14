import React from 'react';
import PropTypes from 'prop-types';

const Skeleton = ({ width, height, borderRadius = '4px', className = '' }) => {
    return (
        <div 
            className={`a-skeleton ${className}`}
            style={{ 
                width: width || '100%', 
                height: height || '20px',
                borderRadius
            }}
        />
    );
};

Skeleton.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    borderRadius: PropTypes.string,
    className: PropTypes.string,
};

export default Skeleton;
