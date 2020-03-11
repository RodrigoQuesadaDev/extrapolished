import {useEffect, useState} from 'react';

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(readWindowDimensions);

    useEffect(() => {
        const handleResize = () => setWindowDimensions(readWindowDimensions());

        const windowEvent = 'resize';
        window.addEventListener(windowEvent, handleResize);
        return () => window.removeEventListener(windowEvent, handleResize);
    }, []);

    return windowDimensions;
};

function readWindowDimensions()
{
    return {width: window.innerWidth, height: window.innerHeight};
}
