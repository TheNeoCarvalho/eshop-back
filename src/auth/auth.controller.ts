import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ResponseLoginDto } from './dtos/responseLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async login(@Body() loginDto: LoginDto): Promise<ResponseLoginDto> {
    return await this.authService.login(loginDto);
  }
}
