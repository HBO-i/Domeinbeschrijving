import React, {FunctionComponent} from 'react';

import {useHBOFilter} from './HBOFilter';
import HBOFilterActions from './HBOFilterActions';
import Button from '../Button';
import {isDesktop} from '../../../utils/MediaQuery';

// Only one is allowed
type Optionals = {
    nextLabel?: string;
    nextLabelRaw?: never;
} | {
    nextLabel?: never;
    nextLabelRaw?: string;
}

export type HBOFilterNavigationProps = {
    prevLabel: string;
    onNextClick?: () => void;
    className?: string;
} & Optionals;

const HBOFilterNavigation: FunctionComponent<HBOFilterNavigationProps> = (props) => {
    const hboFilter = useHBOFilter();

    const getNextLabel = () => {
        if (props.nextLabelRaw)
            return props.nextLabelRaw;

        return `${isDesktop() ? props.nextLabel + ' ' : ''}&gt;`;
    };

    const getPrevLabel = () => {
        return `&lt; ${isDesktop() ? props.prevLabel : ''}`;
    };

    return (
        <HBOFilterActions>
            <Button onClick={hboFilter.previous}>
                <span dangerouslySetInnerHTML={{ __html: getPrevLabel() }} />
            </Button>
            <Button onClick={props.onNextClick ?? hboFilter.next}>
                <span dangerouslySetInnerHTML={{ __html: getNextLabel() }} />
            </Button>
        </HBOFilterActions>
    );
};

export default HBOFilterNavigation;
