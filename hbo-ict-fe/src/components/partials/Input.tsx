import React from 'react';
import {BoilerInputProps, Input as BoilerInput} from 'b302-frontend-library';

import {ReactComponent as SearchIcon} from '../../assets/icons/search.svg';

interface Props<T> extends BoilerInputProps<T> {
    hint?: string;
    icon?: 'search';
}

function Input<T>(props: Props<T>) {

    return (
        <div className={'input'}>
            { props.hint &&
                <span className={'input__hint'}>{props.hint}</span>
            }

            <div className={'input__element-container'}>
                <BoilerInput {...props} className={'input__element'} />

                { props.icon &&
                    <SearchIcon className={'input__icon'} onClick={() => props.onKeyUp?.({ key: 'Enter' } as any)} />
                }
            </div>
        </div>
    );
}

export default Input;
