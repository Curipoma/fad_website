import { CatalogueModel } from '@models/core';
import { Entity } from '@models/shared';

export interface AssetModel extends Entity {
  type: CatalogueModel;
  code: string;
  monetaryValue: string;
}
