import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '../../cache/cache.service';
import { cityMock } from '../__mocks__/city.mock';
import { CityService } from '../city.service';
import { CityEntity } from '../entities/city.entity';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityMock]),
          },
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityMock),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return findOne city', async () => {
    const city = await service.findCityById(cityMock?.id);
    expect(city).toEqual(cityMock);
  });

  it('should return all cities by state', async () => {
    const city = await service.getAllCities(cityMock?.id);
    expect(city).toEqual([cityMock]);
  });

  it('should return error findOne not found', async () => {
    jest.spyOn(cityRepository, 'findOne').mockRejectedValueOnce(new Error());
    expect(service.findCityById(cityMock?.id)).rejects.toThrowError();
  });
});
