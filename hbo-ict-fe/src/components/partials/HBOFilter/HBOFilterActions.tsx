import React, {FunctionComponent} from 'react';
import {ClassBuilder} from 'b302-frontend-library';

interface Props {
    children: any;
    end?: any;
}

const HBOFilterActions: FunctionComponent<Props> = (props) => {

    const className = ClassBuilder.createClass('hbo-filter__actions')
        .addIf('hbo-filter__actions--end', props.end)
        .build();

    return (
        <div className={className}>
            { props.children }
        </div>
    );
};

export default HBOFilterActions;
