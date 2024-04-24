import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

function BaseLayout({ children }) {
    return (
        <div className="layout">
            <Sidebar />
            {children}
        </div>
    );
}

BaseLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default BaseLayout;