import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from 'src/address/entities/address.entity';
import { CityService } from 'src/city/city.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressEntity: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.findUserById(userId);
    await this.cityService.findCityById(createAddressDto?.cityId);

    return this.addressEntity.save({
      ...createAddressDto,
      userId,
    });
  }
}
