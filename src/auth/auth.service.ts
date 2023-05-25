import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from './../user/user.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async login(loginDto: LoginDto): Promise<UserEntity> {
    const user: UserEntity = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMath = await bcrypt.compare(
      loginDto.password,
      user?.password || '',
    );
    if (!user || !isMath) {
      throw new NotFoundException('Email or password invalid');
    }
    return user;
  }
}
