import React, { FunctionComponent } from 'react';
import {ClassBuilder} from 'b302-frontend-library';

interface Props {
    active: boolean;
    onClick: () => void;
}

const MenuButton: FunctionComponent<Props> = (props) => {

    const className = ClassBuilder.createClass('menu-button')
        .addIf('menu-button--active', props.active)
        .build();

    return (
        <div className={'menu-button__container'} onClick={props.onClick}>
            <div className={className}>
                <div className={'menu-button__line'} />
                <div className={'menu-button__line'} />
                <div className={'menu-button__line'} />
            </div>
        </div>
    );
};

export default MenuButton;
