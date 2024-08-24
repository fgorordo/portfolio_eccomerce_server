import { User } from "../entities";
import { JWTPayload } from "../interfaces";


export const generateJwtPayload = (user: string): JWTPayload => {
    return {
        sub: user
    }
}