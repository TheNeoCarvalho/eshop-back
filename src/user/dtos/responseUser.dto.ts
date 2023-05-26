import { ResponseAddressDto } from '../../address/dtos/responseAddress.dto';
import { UserEntity } from './../entities/user.entity';

export class ResponseUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address?: ResponseAddressDto[];

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;
    this.address = userEntity.addresses
      ? userEntity.addresses.map((address) => new ResponseAddressDto(address))
      : undefined;
  }
}
