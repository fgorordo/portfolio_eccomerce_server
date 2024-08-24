import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { validateCredentials } from './utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { User } from './entities';
import { JwtService } from '@nestjs/jwt';
import { DatabaseErrorCodes } from 'src/common';

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
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const candidate = this.usersRespository.create(createUserDto);
      const user = await this.usersRespository.save(candidate);

      return {
        token: await this.signJWT(user),
      };
    } catch (error: any) {
      this.handleDatabaseErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    try {
      const user = await this.usersRespository.findOne({
        where: { email: loginUserDto.email },
        select: { password: true, id: true },
      });

      if (!user) throw new BadRequestException('Invalid Credentials');

      if (!(await validateCredentials(loginUserDto.password, user.password)))
        throw new BadRequestException('Invalid Credentials');

      return { token: await this.signJWT(user) };
    } catch (error) {
      this.handleDatabaseErrors(error);
    }
  }

  refresh(user: User): any {
    return {
      message: 'This is a development testing endpoint, if you are seeing this message, a Bearer auth token was found on your headers and its valid',
      user,
    };
  }

  private signJWT(user: User): Promise<string> {
    return this.jwtService.signAsync({ sub: user.id });
  }

  private handleDatabaseErrors(error: any) {
    if (error.driverError.code === DatabaseErrorCodes.DUPLICATED_UNIQUE_VALUE) {
      throw new BadRequestException(
        'Está direccion de correo electrónico ya se encuentra registrada',
      );
    }

    throw new InternalServerErrorException(
      'Parece que algo no resultó como esperabamos, por favor contacta al soporte',
    );
  }
}
