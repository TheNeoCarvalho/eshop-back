import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { ResponseUserDto } from '../../user/dtos/responseUser.dto';
import { UserService } from '../../user/user.service';
import { jwtMock } from '../__mocks__/jwt.mock';
import { loginUserMock } from '../__mocks__/login.mock';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user after login', async () => {
    const user = await service.login(loginUserMock);

    expect(user).toEqual({
      user: new ResponseUserDto(userEntityMock),
      access_token: jwtMock,
    });
  });

  it('should return error if password wrong', async () => {
    expect(
      service.login({ ...loginUserMock, password: '123' }),
    ).rejects.toThrowError();
  });

  it('should return error if email wrong', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockRejectedValueOnce(undefined);
    expect(service.login(loginUserMock)).rejects.toThrowError();
  });

  it('should return error if error exception', async () => {
    jest
      .spyOn(userService, 'findUserByEmail')
      .mockRejectedValueOnce(new Error());
    expect(service.login(loginUserMock)).rejects.toThrowError();
  });
});
