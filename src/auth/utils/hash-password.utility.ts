import * as bcrypt from 'bcrypt';

export const hashPassword = async (str: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(str, salt);
}