import { Entity } from '@models/shared';

export interface AreaModel extends Entity {
  materials: object[];
  name: string;
  unitMonetaryValue: string;
  code: string;
}
