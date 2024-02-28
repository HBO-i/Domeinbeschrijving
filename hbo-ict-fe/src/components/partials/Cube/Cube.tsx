import React, {FunctionComponent, useEffect, useRef, useState} from 'react';

export const CubeFace: FunctionComponent<{
    children: any,
    top?: any;
    front?: any;
    left?: any;
    right?: any;
    back?: any; }> = (props) => {


    const face = Object.keys(props).find(prop => prop !== 'children');

    return (
        <div className={`cube__face cube__face--${face ?? ''}`}>
            { props.children }
        </div>
    );
};

interface Props {
    children: any;
    face: number;
}

const Cube: FunctionComponent<Props> = (props) => {

    const ref = useRef<HTMLDivElement>(null);
    const [idle, setIdle] = useState<boolean>(true);

    // useEffect(() => {
    //     const onTransitionEnd = () => {
    //         setIdle(true);
    //     };
    //
    //     const onTransitionStart = () => {
    //         setIdle(false);
    //     };
    //
    //     ref.current?.addEventListener('transitionend', onTransitionEnd);
    //     ref.current?.addEventListener('transitionstart', onTransitionStart);
    //
    //     return () => {
    //         ref.current?.removeEventListener('transitionend', onTransitionEnd);
    //         ref.current?.removeEventListener('transitionstart', onTransitionStart);
    //     };
    // }, []);

    return (
        <div className={`cube__scene`}>
            <div className={`cube cube--face-${props.face} ${idle ? 'cube--idle' : ''}`} ref={ref}>
                { props.children }
            </div>
        </div>
    );
};

export default Cube;
