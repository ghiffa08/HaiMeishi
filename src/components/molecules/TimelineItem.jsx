import React from 'react';
import PropTypes from 'prop-types';

const TimelineItem = ({ year, title, org, desc }) => {
    return (
        <div className="t-timeline-item">
            <div className="t-timeline-year">{year}</div>
            <div className="t-timeline-title">{title}</div>
            <div className="t-timeline-org">{org}</div>
            {desc && <div className="t-timeline-desc">{desc}</div>}
        </div>
    );
};

TimelineItem.propTypes = {
    year: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    org: PropTypes.string.isRequired,
    desc: PropTypes.string,
};

export default TimelineItem;
