import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from 'src/user/dtos/responseUser.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from './../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { LoginPayloadDto } from './dtos/loginPayload.dto';
import { ResponseLoginDto } from './dtos/responseLogin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<ResponseLoginDto> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMath = await bcrypt.compare(
      loginDto.password,
      user?.password || '',
    );

    if (!user || !isMath) {
      throw new NotFoundException('Email or password invalid');
    }

    return {
      access_token: this.jwtService.sign({ ...new LoginPayloadDto(user) }),
      user: new ResponseUserDto(user),
    };
  }
}
