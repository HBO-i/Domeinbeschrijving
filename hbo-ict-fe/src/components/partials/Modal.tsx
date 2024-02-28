import React, {FunctionComponent, useState} from 'react';
import {useBodyLock} from '../hooks/bodyLock';
import {ClassBuilder} from 'b302-frontend-library';

export interface ModalController {
    active: boolean;
    open: boolean;
    finishedAnimating: boolean;
    toggle: (animate?: boolean) => void;
}

export const useModal = (): ModalController => {
    const bodyLock = useBodyLock();

    const [open, setOpen] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);
    const [finishedAnimating, setFinishedAnimating] = useState<boolean>(false);
    const [timeout, _setTimeout] = useState<any>();

    const toggle = (animate: boolean = true) => {
        if (open)
            closeModal(animate);
        else
            openModal(animate);
    };

    const openModal = (animate: boolean = true) => {
        setFinishedAnimating(false);

        bodyLock.lock();
        clearTimeout(timeout);

        setActive(true);
        setOpen(true);

        const animateTimeout = setTimeout(() => {
            setFinishedAnimating(true)
        }, 600);

        _setTimeout(animateTimeout);
    };

    const closeModal = (animate: boolean = true) => {
        setFinishedAnimating(false);

        clearTimeout(timeout);

        setOpen(false);

        const activeTimeout = setTimeout(() => {
            bodyLock.unlock();

            setActive(false);
            setFinishedAnimating(true);
        }, animate ? 280 : 0);

        _setTimeout(activeTimeout);
    };

    return {
        open,
        active,
        finishedAnimating,
        toggle,
    };
};

interface Props {
    controller: ModalController;
    children: any;
}

const Modal: FunctionComponent<Props> = (props) => {
    const className = ClassBuilder.createClass('modal')
        .addIf('modal--active', props.controller.active)
        .addIf('modal--open', props.controller.open)
        .build();

    return (
        <div className={className} onScroll={e => e.stopPropagation()}>
            <div className={'modal__overlay'} />

            <div className={'modal__content-container'} onClick={() => props.controller.open && props.controller.toggle()}>
                <div className={'modal__content'} onClick={e => e.stopPropagation()}>
                    { props.children }
                </div>
            </div>
        </div>
    );
};

export default Modal;
