import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressEntity } from 'src/address/entities/address.entity';
import { Roles } from 'src/docorators/roles.decorato';
import { UserType } from 'src/user/dtos/userType.enum';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Roles(UserType.User)
  @Post('/:userId')
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createaddressDto: CreateAddressDto,
    @Param('userId') userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createaddressDto, userId);
  }
}
