import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressEntity } from '../address/entities/address.entity';
import { Roles } from '../docorators/roles.decorato';
import { UserId } from '../docorators/userId.decotator';
import { UserType } from '../user/dtos/userType.enum';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { ResponseAddressDto } from './dtos/responseAddress.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createaddressDto: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createaddressDto, userId);
  }

  @Get()
  @UsePipes(ValidationPipe)
  async getAddresByUserId(
    @UserId() userId: number,
  ): Promise<ResponseAddressDto[]> {
    return (await this.addressService.getAddresByUserId(userId)).map(
      (address) => new ResponseAddressDto(address),
    );
  }
}
