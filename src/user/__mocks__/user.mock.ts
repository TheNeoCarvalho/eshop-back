import { UserType } from '../dtos/userType.enum';
import { UserEntity } from '../entities/user.entity';

export const userEntityMock: UserEntity = {
  id: 1,
  cpf: '1234567810',
  email: 'tugrp@example.com',
  name: 'John Doe',
  password: '$2b$10$Xn7w6WoBekiDFxZkE4K0I.3RJdtiybx6gWZwgQpS6l6RpP/4.L72y',
  phone: '(99) 99999-9999',
  typeUser: UserType.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};
