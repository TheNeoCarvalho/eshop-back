import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from 'src/cache/cache.service';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepositoty: Repository<CityEntity>,

    private readonly cacheService: CacheService,
  ) {}
  async getAllCities(stateId: number): Promise<CityEntity[]> {
    return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`, () =>
      this.cityRepositoty.find({
        where: {
          stateId,
        },
      }),
    );
  }

  async findCityById(cityId: number): Promise<CityEntity> {
    const city = await this.cityRepositoty.findOne({
      where: {
        id: cityId,
      },
    });

    if (!city) {
      throw new NotFoundException(`City Not Found`);
    }

    return city;
  }
}
