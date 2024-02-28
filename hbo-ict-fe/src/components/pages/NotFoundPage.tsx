import React, { FunctionComponent } from 'react';
import {Page} from 'b302-frontend-library';

interface Props {}

const NotFoundPage: FunctionComponent<Props> = () => {

    return (
        <Page>
            <p>Not found</p>
        </Page>
    );
};

export default NotFoundPage;
