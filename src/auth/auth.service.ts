import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { CreateUserDto, LoginUserDto } from './dto';
import { randomInt } from 'crypto';
import { cleanUserData, hashPassword, validateCredentials } from './utils';
import { AuthMessages, UserModuleApiResponse } from './interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private usersRespository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserModuleApiResponse> {

    const candidate = this.usersRespository.create(createUserDto);
    const user = await this.usersRespository.save(candidate);

    return {
      message: AuthMessages.ACCOUNT_CREATED,
      data: {
        email: user.email,
        fullName: user.fullName,
        authToken: this.jwtService.sign({id: user.id}),    
        refreshToken: this.jwtService.sign({id: user.id}),   
      },
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<UserModuleApiResponse> {

    const user = await this.usersRespository.findOne({
      where:{
        email: loginUserDto.email
      },
      select:
        {
          password: true,
          email: true,
          fullName: true,
          id: true
        }
      });

    if (!user) 
      throw new UnauthorizedException(AuthMessages.INVALID_CREDENTIALS);

    if (!await validateCredentials(loginUserDto.password, user.password))
      throw new UnauthorizedException(AuthMessages.INVALID_CREDENTIALS);
    return {
      ok: true,
      data: {
        email: user.email,
        fullName: user.fullName,
        authToken: this.jwtService.sign({id: user.id}),    
        refreshToken: this.jwtService.sign({id: user.id}),   
      },
    };
  }
}
