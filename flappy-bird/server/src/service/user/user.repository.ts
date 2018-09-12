import { User} from '../../model';

export abstract class UserRepository {
    public abstract getUser(userToken: string): Promise<User>;
}
