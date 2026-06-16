export interface IUser {
  name: string;
  email: string;
  role: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  status: string;
  accessToken: string;
  refreshToken: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
