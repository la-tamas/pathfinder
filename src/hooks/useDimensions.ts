import { useState, useCallback, useEffect, useMemo } from 'react';

export default function useDimensions() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    const handleResize = useCallback(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return useMemo(() => windowSize, [windowSize]);
}
