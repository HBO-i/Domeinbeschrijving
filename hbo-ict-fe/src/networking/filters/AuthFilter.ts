import {HttpFilter, NextFilter, RequestConfig} from 'b302-frontend-library';
import {TokenService} from '../../utils/TokenService';

class AuthFilter implements HttpFilter {

    filter(request: RequestConfig, next: NextFilter): RequestConfig {
        const headers = request.headers ?? {};

        if(TokenService.isAuthenticated()) {
            headers.Authorization = `Bearer ${TokenService.getAuthToken()}`;
        }

        request.headers = headers;

        return next(request);
    }
}

export default AuthFilter;
