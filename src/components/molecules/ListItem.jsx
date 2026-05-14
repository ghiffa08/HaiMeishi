import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ title, org, year }) => {
    return (
        <li>
            <span className="t-list-title">{title}</span>
            <span className="t-list-org">{org}</span>
            <span className="t-list-year">{year}</span>
        </li>
    );
};

ListItem.propTypes = {
    title: PropTypes.string.isRequired,
    org: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
};

export default ListItem;
