import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { ResponseUserDto } from './dtos/responseUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<ResponseUserDto[]> {
    return (await this.userService.getAllUser()).map(
      (userEntity) => new ResponseUserDto(userEntity),
    );
  }

  @Get(':userId')
  async getUsersBy(@Param('userId') userId: number): Promise<ResponseUserDto> {
    return new ResponseUserDto(
      await this.userService.getUserByIdWuthRelations(userId),
    );
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }
}
