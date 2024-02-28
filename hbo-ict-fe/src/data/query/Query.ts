import {useQuery, keepPreviousData} from '@tanstack/react-query';

import FilterRepository from '../repo/FilterRepository';
import {DescriptionIndexRequest} from '../Types';

export const useFilterIndexQuery = () => {
    const repo = new FilterRepository();

    return useQuery({
        queryKey: ['filters'],
        queryFn: () => repo.getOptions(),
    });
};

export const useDescriptionIndexQuery = (request: DescriptionIndexRequest) => {
    const repo = new FilterRepository();

    return useQuery({
        queryKey: ['descriptions', request],
        queryFn: () => repo.getDescriptions(request),
        placeholderData: keepPreviousData
    });
};

export const useProfessionSkillsQuery = () => {
    const repo = new FilterRepository();

    return useQuery({
        queryKey: ['profession-skills'],
        queryFn: () => repo.getProfessionSkills()
    });
};
