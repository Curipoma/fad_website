import { Entity } from '@models/shared';

export interface UserModel extends Entity {
  email: string;
  lastname: string;
  password: string;
  passwordChanged: boolean;
  passwordChangedText: string;
  name: string;
}
