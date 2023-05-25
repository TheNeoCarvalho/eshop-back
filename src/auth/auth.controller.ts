import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ResponseUserDto } from 'src/user/dtos/responseUser.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async login(@Body() loginDto: LoginDto): Promise<ResponseUserDto> {
    return new ResponseUserDto(await this.authService.login(loginDto));
  }
}
