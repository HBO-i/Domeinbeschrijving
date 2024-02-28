import {BuroApp} from 'b302-frontend-library';
import lang from './lang/lang';
import routes from './routes';

class App extends BuroApp {
    setup(): void {
        this.setupRequester(process.env.REACT_APP_API_ENDPOINT + '/api', []);
        this.setupTranslator(lang);
        this.setupRoutingConfig({ routes });
    }
}

export const createApp = () => new App();
