import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module';
import { CacheModule } from './cache/cache.module';
import { CityModule } from './city/city.module';
import { StateModule } from './state/state.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_DB,
      port: Number(process.env.DATABASE_PORT),
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_USER,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    CacheModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
