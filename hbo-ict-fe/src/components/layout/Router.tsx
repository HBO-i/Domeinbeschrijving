import React, { FunctionComponent } from 'react';
import {route} from 'b302-frontend-library';

import { Route, Routes } from 'react-router-dom';

import NotFoundPage from '../pages/NotFoundPage';
import Home from '../pages/Home';
import Universities from '../pages/Universities';
import ProfessionTasks from '../pages/ProfessionTasks';
import ProfessionalSkills from '../pages/ProfessionalSkills';

interface Props {
    children?: any;
}

const Router: FunctionComponent<Props> = ({ children }) => {

    return (
        <Routes>
            { children }

            <Route path={route('home')} element={<Home />} />
            <Route path={route('universities')} element={<Universities />} />
            <Route path={route('tasks')} element={<ProfessionTasks />} />
            <Route path={route('skills')} element={<ProfessionalSkills />} />

            <Route element={<NotFoundPage />} />
        </Routes>
    );
};

export default Router;
