import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar'; // import sidebar

// define baselayout component
function BaseLayout({ children }) {
    return (
        <div className="layout">
            <Sidebar />
            {children}
        </div>
    );
}

// define prop types for baselayout component
BaseLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default BaseLayout;
