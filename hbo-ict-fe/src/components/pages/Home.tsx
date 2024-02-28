import React, { FunctionComponent } from 'react';
import {Page, route, useLocale} from 'b302-frontend-library';
import {useNavigate} from 'react-router-dom';

import Hero, {HeroButton, HeroText, HeroTitle} from '../partials/Hero';
import {FilterController} from '../../utils/Filter';

interface Props {}

const Home: FunctionComponent<Props> = () => {
    const {__} = useLocale();
    const navigate = useNavigate();

    return (
        <Page className={'home-page'}>
            <Hero>
                <HeroTitle>
                    <span>HBO - i</span>
                    <span>{__('domainDescription')}</span>
                </HeroTitle>

                <HeroText text={__('pages.home.heroText')} />

                <div className={'home-page__buttons'}>
                    <HeroButton onClick={FilterController.toggle}>{__('professionTasks')}</HeroButton>
                    <HeroButton onClick={() => navigate(route('skills'))}>{__('professionalSkills')}</HeroButton>
                </div>
            </Hero>
        </Page>
    );
};

export default Home;
