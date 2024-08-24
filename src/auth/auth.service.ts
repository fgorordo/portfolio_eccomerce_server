import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { validateCredentials } from './utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { JwtService } from '@nestjs/jwt';


interface http {
  message: string;
  token: string;
}
@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private usersRespository: Repository<User>,

    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<any> {

    const candidate = this.usersRespository.create(createUserDto);
    const user = await this.usersRespository.save(candidate);

    return {
      token: await this.signJWT(user),
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {

    const user = await this.usersRespository.findOne({
      where: { email: loginUserDto.email },
      select: { password: true, id: true },
    });

    if (!user)
      throw new BadRequestException('Invalid Credentials');

    if (!await validateCredentials(loginUserDto.password, user.password))
      throw new BadRequestException('Invalid Credentials');

    return {token: await this.signJWT(user)}
  }


  refresh(user: User): any {
    return {
      data: user,
    }
  }

  private signJWT(user: User): Promise<string> {
    return this.jwtService.signAsync({sub: user.id})
  }
}
