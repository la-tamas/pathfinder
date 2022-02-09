import * as React from 'react';

export default function useDimensions() {
    const [windowSize, setWindowSize] = React.useState({
        width: 0,
        height: 0,
    });

    const handleResize = React.useCallback(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }, []);

    React.useEffect(() => {

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return React.useMemo(() => windowSize, [windowSize]);
}
