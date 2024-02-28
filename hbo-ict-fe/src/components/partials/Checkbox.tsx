import {FormAccessor, OnFormChangeCallback} from 'b302-frontend-library';

import {ReactComponent as Check} from '../../assets/icons/check.svg';

interface Props<T> {
    form: FormAccessor<T>;
    onFormChange: OnFormChangeCallback<T>;
    id: keyof T;
    hint?: string;
}

function Checkbox<T>(props: Props<T>) {

    const checked = props.form.values[props.id];

    const toggleCheck = () => {
        props.onFormChange({
            id: props.id,
            value: !checked
        });
    };

    return (
        <div className={`checkbox ${checked ? 'checkbox--checked' : ''}`} onClick={toggleCheck}>
            <div className={'checkbox__box'}>
                <Check className={'checkbox__icon'} />
            </div>

            { props.hint &&
                <span className={'checkbox__hint'}>{ props.hint }</span>
            }
        </div>
    );
}

export default Checkbox;
