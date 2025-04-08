export type Token = {
  access_token: string;
};

export type AuthUser = {
  email: string;
  sub: string;
  iat: number;
  exp: number;
};
