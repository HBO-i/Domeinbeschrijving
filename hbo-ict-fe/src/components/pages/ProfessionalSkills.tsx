import React, {useMemo} from 'react';
import {Page} from 'b302-frontend-library';

import Title from '../partials/Title';
import DescriptionItemBlock from '../partials/TextItem/DescriptionItemBlock';
import {useProfessionSkillsQuery} from '../../data/query/Query';
import {DescriptionItem} from '../../data/Types';
import Loader from '../partials/Loader';

const ProfessionalSkills = () => {

    const query = useProfessionSkillsQuery();
    const data: DescriptionItem[] = useMemo(() => {
        if (!query.data)
            return [];

        return query.data.map(p => ({
            ...p,
            items: p.competencies.map(c => ({
                ...c,
                items: [c.description.value]
            }))
        }));
    }, [query.data]);

    return (
        <Page className={'tasks-page professional-skills-page'}>
            <div className={'tasks-page__header'}>
                <Title>Professional Skills</Title>
            </div>

            { !query.isFetched &&
                <div className={'flex flex--justify-center'}>
                    <Loader />
                </div>
            }

            { data.map(item => (
                <DescriptionItemBlock item={item} key={item.id} start={1} />
            )) }
        </Page>
    );
};

export default ProfessionalSkills;
