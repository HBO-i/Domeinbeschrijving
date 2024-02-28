import React, { FunctionComponent, JSX } from 'react';

import {ReactComponent as InfoIcon} from '../../assets/icons/information-circle.svg';

export const TooltipContainer: FunctionComponent<{ children: any }> = (props) => {

    return (
        <div className={'tooltip__container'}>
            <div className={'tooltip'}>
                { props.children }
            </div>
        </div>
    );
};

interface Props {
    content: string | JSX.Element;
}

const Tooltip: FunctionComponent<Props> = (props) => {

    return (
        <div className={'tooltip'}>
            <InfoIcon className={'tooltip__icon'} />

            <div className={'tooltip__content'}>
                { props.content }
            </div>
        </div>
    );
};

export default Tooltip;
