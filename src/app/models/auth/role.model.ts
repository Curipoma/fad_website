import {PermissionModel} from './permission.model';

export interface RoleModel {
  id?: number;
  name?: string;
  permissions?: PermissionModel[];
}
