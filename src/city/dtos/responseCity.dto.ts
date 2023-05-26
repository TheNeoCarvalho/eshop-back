import { ResponseStateDto } from '../../state/dtos/responseState.dto';
import { CityEntity } from '../entities/city.entity';

export class ResponseCityDto {
  name: string;
  states?: ResponseStateDto;

  constructor(city: CityEntity) {
    this.name = city.name;
    this.states = city.state ? new ResponseStateDto(city.state) : undefined;
  }
}
