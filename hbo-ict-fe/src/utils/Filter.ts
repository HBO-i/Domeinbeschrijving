import {app} from 'b302-frontend-library';
import {DescriptionItem} from '../data/Types';

export const FilterController = {
    toggle: () => app().emitEvent('toggle_filter')
};
