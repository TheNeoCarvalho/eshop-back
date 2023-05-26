import { LoginPayloadDto } from '../auth/dtos/loginPayload.dto';

export const authorizationToLoginPayload = (
  authorization: string,
): LoginPayloadDto | undefined => {
  const authorizationAplited = authorization.split('.');
  if (authorizationAplited.length < 3 || !authorizationAplited[1]) {
    return undefined;
  }

  return JSON.parse(
    Buffer.from(authorizationAplited[1], 'base64').toString('ascii'),
  );
};
