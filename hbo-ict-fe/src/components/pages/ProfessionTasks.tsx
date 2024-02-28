import React, {FunctionComponent, useEffect, useMemo} from 'react';
import {Page, useLocale} from 'b302-frontend-library';

import Title from '../partials/Title';
import {useFilter} from '../contexts/FilterContext';
import {useDescriptionIndexQuery} from '../../data/query/Query';
import {DescriptionIndexRequest} from '../../data/Types';
import DescriptionItemBlock from '../partials/TextItem/DescriptionItemBlock';
import Loader from '../partials/Loader';
import Button from '../partials/Button';
import {FilterController} from '../../utils/Filter';

const ProfessionTasks: FunctionComponent = () => {
    const filter = useFilter();
    const {__} = useLocale();

    const request = useMemo<DescriptionIndexRequest>(() => {
        return {
            architecture_layer: filter.data.architecture_layers,
            level: filter.data.levels,
            activity: filter.data.activities,
            search: filter.data.search,
            grouping: filter.data.grouping.join(',')
        };
    }, [filter.data]);

    const query = useDescriptionIndexQuery(request);

    const data = useMemo(() => {
        return query.data ?? [];
    }, [query.data]);

    useEffect(() => {
        filter.setActive(true);

        return () => {
            filter.reset();
            filter.setActive(false);
        };
    }, []);

    const bigLevels: number[] = [];

    return (
        <Page className={'tasks-page'}>
            <div className={'tasks-page__header'}>
                <Title>Beroepstaken</Title>

                {/*<Button onClick={FilterController.toggle} secondary>*/}
                {/*    {__('filterAgain')}*/}
                {/*</Button>*/}
            </div>

            { query.isInitialLoading &&
                <div className={'flex flex--justify-center'}>
                    <Loader />
                </div>
            }

            { !query.isInitialLoading &&
                <>
                    { !filter.filtersSelected &&
                        <>
                            <h2>Geen filters geselecteerd.</h2>
                            <br />

                            <div className={'flex'}>
                                <Button onClick={FilterController.toggle} secondary>
                                    {__('openFilter')}
                                </Button>
                            </div>
                        </>
                    }

                    { filter.filtersSelected &&
                        <>


                            { filter.data.search !== '' && query.isFetched && !query.data?.length &&
                                <h2>Geen zoekresultaten voor "{filter.data.search}".</h2>
                            }

                            { data.map(item => (
                                <DescriptionItemBlock item={item} bigLevels={bigLevels} key={item.id} />
                            )) }
                        </>
                    }
                </>
            }
        </Page>
    );
};

export default ProfessionTasks;
