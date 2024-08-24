import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { NodeEnvs } from "./interface";

export default registerAs('jwt', (): any => ({
    secret: process.env.JWT_SECRET
}));
