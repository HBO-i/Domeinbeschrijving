import React, {FunctionComponent, useEffect, useRef, useState} from 'react';

import {ReactComponent as Chevron} from '../../assets/icons/chevron-down.svg';

export const DropdownItem: FunctionComponent<{ children: any, onClick: () => void }> = (props) => {

    return (
        <div className={'dropdown__item'} onClick={props.onClick}>
            { props.children }
        </div>
    );
};

const Dropdown: FunctionComponent<{ title: string, children: any }> = (props) => {

    const ref = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (e.target instanceof Node && !ref.current?.contains(e.target))
                setOpen(false);
        });
    }, []);

    return (
        <div className={`dropdown ${open ? 'dropdown--open' : ''}`} onClick={() => setOpen(!open)} ref={ref}>
            <div className={'dropdown__header'}>
                <span>{ props.title }</span>

                <Chevron className={'dropdown__icon'} />
            </div>

            <div className={`dropdown__menu dropdown__menu`}>
                { props.children }
            </div>
        </div>
    );
};

export default Dropdown;
