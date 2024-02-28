import React, {createContext, FunctionComponent, useContext, useState} from 'react';
import {useFilterIndexQuery} from '../../data/query/Query';

export interface HBOFilterData {
    activities: number[];
    architecture_layers: number[];
    levels: number[];
    search: string;
    grouping: string[];
}

interface HBOFilter {
    data: HBOFilterData;
    setData: (data: HBOFilterData) => void;
    active: boolean;
    setActive: (active: boolean) => void;
    reset: () => void;
    empty: () => void;
    filtersSelected: boolean;
}

const HBOFilterContext = createContext<HBOFilter>({} as HBOFilter);

export const useFilter = () => useContext<HBOFilter>(HBOFilterContext);

const FilterContextProvider: FunctionComponent<{ children: any }> = (props) => {
    const query = useFilterIndexQuery();
    const [active, setActive] = useState<boolean>(false);
    const [data, setData] = useState<HBOFilterData>({
        activities: [],
        architecture_layers: [],
        levels: [],
        grouping: ['architecture_layers', 'activities', 'levels'],
        search: ''
    });

    const reset = () => setData({
        levels: query.data?.levels.map(i => i.id) ?? [],
        architecture_layers: query.data?.architecture_layers.map(i => i.id) ?? [],
        activities: query.data?.activities.map(i => i.id) ?? [],
        grouping: ['architecture_layers', 'activities', 'levels'],
        search: '',
    });

    const empty = () => setData({
        levels: [],
        architecture_layers: [],
        activities: [],
        grouping: ['architecture_layers', 'activities', 'levels'],
        search: '',
    });

    const filter: HBOFilter = {
        data,
        setData,
        reset,
        empty,
        active, setActive,
        filtersSelected: (data.levels.concat(data.activities).concat(data.architecture_layers)).length > 0
    };

    return (
        <HBOFilterContext.Provider value={filter}>
            { props.children }
        </HBOFilterContext.Provider>
    );
};

export default FilterContextProvider;
