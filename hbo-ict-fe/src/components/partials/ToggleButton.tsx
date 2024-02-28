import React from 'react';
import {FormAccessor, OnFormChangeCallback} from 'b302-frontend-library';

interface Props<T> {
    id: keyof T;
    form: FormAccessor<T>;
    onFormChange: OnFormChangeCallback<T>;
    labels?: string[];
}

function ToggleButton<T>(props: Props<T>) {

    const active = props.form.values[props.id];

    const onToggle = () => {
        props.onFormChange({
            id: props.id,
            value: !active
        });
    };

    return (
        <div className={`toggle-button ${active ? 'toggle-button--active' : ''}`} onClick={onToggle}>
            <div className={`toggle-button__indicator ${active ? 'toggle-button__indicator--right' : ''}`} />

            { props.labels &&
                <>
                    <span className={'toggle-button__label'}>{ props.labels[0] }</span>
                    <span className={'toggle-button__label'}>{ props.labels[1] }</span>
                </>
            }
        </div>
    );
}

export default ToggleButton;
