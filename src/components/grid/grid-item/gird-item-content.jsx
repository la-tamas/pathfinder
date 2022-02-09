import React, { forwardRef } from 'react';
import { animated } from 'react-spring';

const GridItemContent = forwardRef((props, ref) => {
    const { children, classes } = props;

    return (
        <animated.div ref={ref}
            className={`w-full h-full ${classes}`}>
            {children}
        </animated.div>
    );
});

export default GridItemContent;