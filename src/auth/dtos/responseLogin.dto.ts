import { ResponseUserDto } from 'src/user/dtos/responseUser.dto';

export interface ResponseLoginDto {
  user: ResponseUserDto;
  access_token: string;
}
