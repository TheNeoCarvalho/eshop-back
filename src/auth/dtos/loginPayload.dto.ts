import { UserEntity } from '../../user/entities/user.entity';

export class LoginPayloadDto {
  id: number;
  typeuser: number;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.typeuser = user.typeUser;
  }
}
