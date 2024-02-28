import React from 'react';
import {FormAccessor, OnFormChangeCallback} from 'b302-frontend-library';

import { ReactComponent as CheckIcon } from '../../../assets/icons/check.svg';

interface Props<T> {
    onChange: (value: any) => void;
    selected: boolean;
    label: string;
    value: any;
}

function SelectButton<T>(props: Props<T>) {

    const selected = props.selected;

    const onSelect = () => {
        props.onChange(props.value);
    };

    return (
        <div className={`select-button ${selected ? 'select-button--selected' : ''}`} onClick={onSelect}>
            { selected &&
                <CheckIcon className={'select-button__icon'} />
            }

            <span className={'select-button__label'}>{ props.label }</span>
        </div>
    );
}

export default SelectButton;
