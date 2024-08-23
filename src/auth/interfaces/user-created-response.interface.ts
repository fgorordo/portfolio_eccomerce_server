import { User } from '../entities';
import { AuthMessages } from './auth-messages.interface';

interface UserDataWithToken extends Partial<User> {
    authToken: string;
    refreshToken: string;
}

export interface UserModuleApiResponse {
    message?: AuthMessages
    ok?: boolean
    data: UserDataWithToken
};