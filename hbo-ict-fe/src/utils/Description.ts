import {DescriptionItem} from '../data/Types';

export const spreadDescriptionData = (items: DescriptionItem[]) => {
    let id = 0;

    return items.reduce((prev, current) => {
        return [
            ...prev,
            ...current.items.map((i) => ({
                id: id++,
                value: current.value,
                items: [i as DescriptionItem]
            }))
        ];
    }, [] as DescriptionItem[]);
};
