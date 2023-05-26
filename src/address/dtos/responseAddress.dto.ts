import { ResponseCityDto } from '../../city/dtos/responseCity.dto';
import { AddressEntity } from '../entities/address.entity';

export class ResponseAddressDto {
  complement: string;
  number: number;
  cep: string;
  city?: ResponseCityDto;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.number = address.number;
    this.cep = address.cep;
    this.city = address.city ? new ResponseCityDto(address.city) : undefined;
  }
}
