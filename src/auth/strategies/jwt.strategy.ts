import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "../entities";
import { InjectRepository } from "@nestjs/typeorm";
import { UnauthorizedException } from "@nestjs/common";
import { AuthMessages, JWTPayload } from "../interfaces";
import { cleanUserData } from "../utils";

export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }


    async validate(payload: JWTPayload): Promise<User> {
        const { id } = payload;

        const user = await this.userRepository.findOneBy({id});

        if ( !user ) 
            throw new UnauthorizedException(AuthMessages.INVALID_TOKEN)
            
        if ( !user.isActive ) 
            throw new UnauthorizedException(AuthMessages.ACCOUNT_BLOCKED_BY_ADMIN);
        
        return user;
    }
}