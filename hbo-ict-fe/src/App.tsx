import React, {FunctionComponent} from 'react';
import {AppEntry} from 'b302-frontend-library';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import Layout from './components/layout/Layout';
import {createApp} from './config/App';
import FilterContextProvider from './components/contexts/FilterContext';

const queryClient = new QueryClient();

const App: FunctionComponent = () => {

    return (
        <AppEntry app={createApp()}>
            <QueryClientProvider client={queryClient}>
                <FilterContextProvider>
                    <Layout />
                </FilterContextProvider>
            </QueryClientProvider>
        </AppEntry>
    );
};

export default App;
