import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { NodeEnvs } from './config/interface';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';

@Module({ 
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === NodeEnvs.PRODUCTION ? '' : '.development.env',
      cache: true,
      load: [databaseConfig, jwtConfig],
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
