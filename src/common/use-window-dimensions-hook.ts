import {useCallback, useEffect, useState} from 'react';
import {debounce} from 'lodash-es';
import {WindowSize} from "../global-types";

const DEBOUNCE_TIME_MS = 500;

export const useWindowSize = (): WindowSize => {
    const [windowSize, setWindowSize] = useState(readWindowSize);

    const handleResize = useCallback(debounce(() => {
        setWindowSize(readWindowSize);
    }, DEBOUNCE_TIME_MS), []);

    useEffect(() => {
        const windowEvent = 'resize';
        window.addEventListener(windowEvent, handleResize);
        return () => window.removeEventListener(windowEvent, handleResize);
    }, []);

    return windowSize;
};

function readWindowSize()
{
    return {width: window.innerWidth, height: window.innerHeight};
}
