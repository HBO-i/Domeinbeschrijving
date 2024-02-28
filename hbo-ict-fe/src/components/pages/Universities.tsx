import React, {FunctionComponent} from 'react';
import {Page, useLocale} from 'b302-frontend-library';

import Hero from '../partials/Hero';
import UniversitySlider from '../partials/University/UniversitySlider';
import {UniversityFactory} from '../../data/factory/UniversityFactory';

const Universities: FunctionComponent = () => {
    const {__} = useLocale();

    const universities = UniversityFactory.getAll();

    return (
        <Page className={'universities-page'}>
            <Hero title={__('pages.schools.heroTitle')} text={__('pages.schools.heroText') + '.'} />

            <div className={'universities-page__universities'}>
                <UniversitySlider universities={universities} />
            </div>
        </Page>
    );
};

export default Universities;
