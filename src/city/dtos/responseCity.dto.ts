import { ResponseStateDto } from '../../state/dtos/responseState.dto';
import { CityEntity } from '../entities/city.entity';

export class ResponseCityDto {
  name: string;
  state?: ResponseStateDto;

  constructor(city: CityEntity) {
    this.name = city.name;
    this.state = city.state ? new ResponseStateDto(city.state) : undefined;
  }
}
