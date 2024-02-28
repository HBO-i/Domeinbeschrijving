import React, {FunctionComponent, JSX} from 'react';
import {useLocale} from 'b302-frontend-library';

import {ReactComponent as InfoIcon} from '../../../assets/icons/information-circle.svg';
import Tooltip from '../Tooltip';

interface Props {
    title: string;
    hint?: string | JSX.Element;
}

const HBOFilterTitle: FunctionComponent<Props> = (props) => {
    const {__} = useLocale();

    return (
        <div className={'hbo-filter__title'}>
            <span className={'hbo-filter__text--small'}>{ __('filter.title') }</span>
            <span className={'hbo-filter__text--title'}>{ props.title }</span>

            { props.hint &&
                <>
                    <div className={'hbo-filter__tooltip'}>
                        <Tooltip content={props.hint} />
                    </div>
                </>
            }
        </div>
    );
};

export default HBOFilterTitle;
