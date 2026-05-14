import React from 'react';
import PropTypes from 'prop-types';
import { ExternalLink } from 'lucide-react';

const ContactItem = ({ label, value, href, icon: Icon, target = '_self', rel, 'aria-label': ariaLabel }) => {
    const isExternal = target === '_blank';

    return (
        <a href={href} className="t-contact-item" target={target} rel={rel} aria-label={ariaLabel}>
            <div className="t-contact-label">
                {label} {isExternal && <ExternalLink size={10} style={{margin: '0 4px'}} aria-hidden="true" />}
            </div>
            <div className="t-contact-value">{value}</div>
        </a>
    );
};

ContactItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
    target: PropTypes.string,
    rel: PropTypes.string,
    'aria-label': PropTypes.string,
};

export default ContactItem;
