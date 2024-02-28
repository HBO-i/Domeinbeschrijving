import React, {FunctionComponent} from 'react';

import {FormAccessor} from 'b302-frontend-library';

interface Props<T> {
    id: keyof T;
    form: FormAccessor<T>;
}

function FieldErrors<T>(props: Props<T>) {

    return (
        <div className={'field-errors'}>
            <ul>
                { props.form.errors[props.id]?.map(e => (
                    <li key={e}>{ e }</li>
                )) }
            </ul>
        </div>
    );
}

export default FieldErrors;
