import * as bcrypt from "bcrypt";

export const validateCredentials = async (candidate: string, hash: string) => {
    return await bcrypt.compare(candidate, hash);
}