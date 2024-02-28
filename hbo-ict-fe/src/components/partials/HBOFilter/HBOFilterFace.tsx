import React, {JSX} from 'react';

import HBOFilterTitle from './HBOFilterTitle';
import SelectButtonList from '../SelectButton/SelectButtonList';
import SelectButton from '../SelectButton/SelectButton';
import HBOFilterNavigation, {HBOFilterNavigationProps} from './HBOFilterNavigation';
import {FilterItem} from '../../../data/Types';
import {HBOFilterData, useHBOFilter} from './HBOFilter';

interface Props<T> {
    title: string;
    dataKey: keyof HBOFilterData;
    items: FilterItem[];
    navigation: HBOFilterNavigationProps;

    hint?: string | JSX.Element;
}

function HBOFilterFace<T>(props: Props<T>) {
    const hboFilter = useHBOFilter();

    const onChange = (id: number) => {
        hboFilter.toggle(props.dataKey, id);
    };

    return (
        <>
            <HBOFilterTitle title={props.title} hint={props.hint} />

            <div className={'flex flex-1 flex--column flex--justify-between'}>
                <SelectButtonList>
                    { props.items.map(i => (
                        <SelectButton
                            onChange={onChange}
                            selected={hboFilter.data[props.dataKey].includes(i.id)}
                            label={i.value}
                            value={i.id}
                            key={i.id} />
                    )) }
                </SelectButtonList>

                <HBOFilterNavigation {...props.navigation} />
            </div>
        </>
    );
}

export default HBOFilterFace;

