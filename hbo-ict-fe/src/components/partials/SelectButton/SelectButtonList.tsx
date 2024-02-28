import React, {FunctionComponent} from 'react';

export interface SelectButtonItem {
    label: string;
    value: string;
}

interface Props {
    items?: SelectButtonItem[];
    children?: any;
}

const SelectButtonList: FunctionComponent<Props> = (props) => {

    return (
        <div className={'select-button-list'}>
            { props.children }
        </div>
    );
};

export default SelectButtonList;
