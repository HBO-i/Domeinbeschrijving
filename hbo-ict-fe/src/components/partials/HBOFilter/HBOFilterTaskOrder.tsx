import React, {FunctionComponent, useEffect, useState} from 'react';

import SelectButton from '../SelectButton/SelectButton';
import {useLocale} from 'b302-frontend-library';
import {ReactSortable} from 'react-sortablejs';
import {useFilter} from '../../contexts/FilterContext';

export interface Task {
    id: number;
    name: string;
    value: string;
}

interface Props {
    onOrderChange: (tasks: Task[]) => void;
}

const HBOFilterTaskOrder: FunctionComponent<Props> = (props) => {
    const {__} = useLocale();
    const filter = useFilter();

    const [tasks, setTasks] = useState([
        { id: 1, name: 'architectureLayers', value: 'architecture_layers' },
        { id: 2, name: 'activities', value: 'activities' },
        { id: 3, name: 'courseLevels', value: 'levels' },
    ]);

    const onOrderChange = (tasks: Task[]) => {
        filter.setData({
            ...filter.data,
            grouping: tasks.map(t => t.value)
        });

        setTasks(tasks);
    };

    return (
        <div className={'hbo-filter__task-order'}>
            <ReactSortable list={tasks} setList={onOrderChange} ghostClass={'hidden'}>
                {tasks.map((item) => (
                    <div key={item.id} style={{ padding: '.5rem 0' }}>
                        <SelectButton onChange={() => null} selected={false} label={__(item.name)} value={''} />
                    </div>
                ))}
            </ReactSortable>
        </div>
    );
};

export default HBOFilterTaskOrder;
