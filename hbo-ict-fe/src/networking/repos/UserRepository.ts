import {ModelRepository, RequestMethod} from 'b302-frontend-library';
import User from '../models/User';

class UserRepository extends ModelRepository<User> {

    public constructor() {
        super('/users');
    }

    public all(): Promise<User[]> {
        // this.request<User[]>(this.url(), RequestMethod.GET).send();

        const users = [];
        for (let i = 0; i < 12; i++)
            users.push({ id: i, email: 'pizza@salami.nl', username: 'Mario' })

        return Promise.resolve(users);
    }
}

export default UserRepository;
