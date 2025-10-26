export type userInfo =
  | {
      username: string;
      fullname: string;
      role: 'ADMIN' | 'OWNER';
    }
  | [];

export type UserUpdatePayload = {
  fullname: string;
  role: 'ADMIN' | 'OWNER';
};

export type UserCredentials = {
  id: string;
  password: string;
  role: 'ADMIN' | 'OWNER';
};

export type UserRegisterPayload = {
  username: string;
  password: string;
  fullname: string;
};

export type UserLoginPayload = {
  username: string;
  password: string;
};

export type AccountInfo = {
  username: string;
  id: string;
  role: 'ADMIN' | 'OWNER';
};
