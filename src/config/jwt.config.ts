import { registerAs } from '@nestjs/config';

export default registerAs('jwt', (): any => ({
    secret: process.env.JWT_SECRET
}));
