import React, {FunctionComponent} from 'react';
import {ClassBuilder} from 'b302-frontend-library';

interface Props {
    children: any;
    small?: any;
}

const Title: FunctionComponent<Props> = (props) => {

    const className = ClassBuilder.createClass('title')
        .addIf('title--small', props.small)
        .build();

    return (
        <h1 className={className}>{ props.children }</h1>
    );
};

export default Title;
