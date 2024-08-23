import { User } from "../entities";

export const cleanUserData = (user: User): User => {

    delete user.password;
    delete user.isActive;
    delete user.cratedAt;
    delete user.updatedAt;
    delete user.id;

    return user;
}