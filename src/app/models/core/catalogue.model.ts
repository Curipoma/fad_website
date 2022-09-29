import { Entity } from '@models/shared';
import { CatalogueTypeModel } from '@models/core';

export interface CatalogueModel extends Entity {
  name: string;
  type: CatalogueTypeModel;
}
