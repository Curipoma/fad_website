import { UserModel } from '@models/auth';

export interface LoginResponseModel {
  accessToken: string;
  user: UserModel;
}
