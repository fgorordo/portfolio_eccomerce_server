import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { UserModuleApiResponse } from './interfaces';
import { User } from './entities';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserModuleApiResponse> {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Promise<UserModuleApiResponse> {
    return this.authService.login(loginUserDto);
  }
}
