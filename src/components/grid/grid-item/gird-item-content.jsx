import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const GridItemContent = forwardRef((props, ref) => {
    const { children, classes, onMouseOver, onClick } = props;

    return (
        <div ref={ref}
            onMouseOver={onMouseOver}
            onMouseOverCapture={onMouseOver}
            onClickCapture={onClick}
            className={`w-full h-full ${classes}`}>
            {children}
        </div>
    );
});

GridItemContent.propTypes = {
    children: PropTypes.oneOf([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    classes: PropTypes.string,
    onMouseOver: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default GridItemContent;