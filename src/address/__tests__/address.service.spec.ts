import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cityMock } from '../../city/__mocks__/city.mock';
import { CityService } from '../../city/city.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { UserService } from '../../user/user.service';
import { addressMock } from '../__mocks__/address.mock';
import { createAddressMock } from '../__mocks__/createAddress.mock copy';
import { AddressService } from '../address.service';
import { AddressEntity } from '../entities/address.entity';

describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: Repository<AddressEntity>;
  let userService: UserService;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            findCityById: jest.fn().mockResolvedValue(cityMock),
          },
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);

    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  it('should return address after save', async () => {
    const address = await service.createAddress(
      createAddressMock,
      userEntityMock?.id,
    );
    expect(address).toEqual(addressMock);
  });

  it('should return error exception in userService', async () => {
    jest.spyOn(userService, 'findUserById').mockRejectedValueOnce(new Error());

    expect(
      service.createAddress(createAddressMock, userEntityMock?.id),
    ).rejects.toThrowError();
  });

  it('should return error exception in cityService', async () => {
    jest.spyOn(cityService, 'findCityById').mockRejectedValueOnce(new Error());

    expect(
      service.createAddress(createAddressMock, userEntityMock?.id),
    ).rejects.toThrowError();
  });

  // it('should return all cities by state', async () => {
  //   const city = await service.getAllCities(addressMock?.id);
  //   expect(city).toEqual([addressMock]);
  // });

  // it('should return error findOne not found', async () => {
  //   jest.spyOn(cityRepository, 'findOne').mockRejectedValueOnce(new Error());
  //   expect(service.findCityById(addressMock?.id)).rejects.toThrowError();
  // });
});
