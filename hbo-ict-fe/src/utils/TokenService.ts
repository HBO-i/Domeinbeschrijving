import {app} from 'b302-frontend-library';

export class TokenService {

    private static STORAGE_KEY = 'auth_token';

    static isAuthenticated() {
        return app().localStorage.itemExists(TokenService.STORAGE_KEY);
    }

    static getAuthToken() {
        return app().localStorage.getItem(TokenService.STORAGE_KEY);
    }

    static setAuthToken(token: string) {
        return app().localStorage.setItem(TokenService.STORAGE_KEY, token);
    }

    static removeToken() {
        return app().localStorage.removeItem(TokenService.STORAGE_KEY);
    }
}
