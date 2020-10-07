import { Observable } from 'rxjs';
import { UserModel } from '../models-game/user/user-model.interface';

export interface UserHandling {
    getLoggedInUser(): Observable<UserModel>;
    logInUser(name: string): Promise<void>;
}