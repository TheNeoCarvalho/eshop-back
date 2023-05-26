import { cityMock } from '../../city/__mocks__/city.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { AddressEntity } from '../entities/address.entity';

export const addressMock: AddressEntity = {
  id: 1,
  cep: '6340000',
  cityId: cityMock?.id,
  userId: userEntityMock?.id,
  complement: 'Casa',
  number: 123,
  createdAt: new Date(),
  updatedAt: new Date(),
};
