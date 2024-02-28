import {useEffect, useState} from 'react';

export const useBodyLock = () => {
    const [locked, setLocked] = useState<boolean>(false);

    useEffect(() => {
        locked
            ? document.body.classList.add('locked')
            : document.body.classList.remove('locked')
    }, [locked]);

    const lock = () => {
        setLocked(true);
    };

    const unlock = () => {
        setLocked(false);
    };

    return { lock, unlock };
};
