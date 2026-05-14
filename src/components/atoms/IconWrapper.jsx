import React, { memo } from 'react';
import PropTypes from 'prop-types';

const IconWrapper = ({ icon: Icon, size = 16, className = '', strokeWidth = 1.5, style = {} }) => {
    return (
        <Icon 
            size={size} 
            strokeWidth={strokeWidth} 
            className={className} 
            style={style} 
        />
    );
};

IconWrapper.propTypes = {
    icon: PropTypes.elementType.isRequired,
    size: PropTypes.number,
    className: PropTypes.string,
    strokeWidth: PropTypes.number,
    style: PropTypes.object,
};

export default memo(IconWrapper);
