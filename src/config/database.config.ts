import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NodeEnvs } from './interface';

export default registerAs('database', (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,  
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: process.env.NODE_ENV === NodeEnvs.PRODUCTION ?  false : true,
    synchronize: process.env.NODE_ENV === NodeEnvs.PRODUCTION ? false : true,
}),
);
