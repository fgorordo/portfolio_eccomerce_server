import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { JWTPayload } from '../interfaces';

export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('jwt.secret'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        })
    }


    async validate(payload: JWTPayload): Promise<User> {
        const { sub: id } = payload;

        const user = await this.userRepository.findOneBy({id});

        if ( !user ) 
            throw new UnauthorizedException('Unauthorized')
            
        if ( !user.isActive ) 
            throw new UnauthorizedException('Unauthorized');
        
        return user;
    }

}