import { AssetModel } from '@models/core/asset.model';
import { Entity } from '@models/shared';

export interface ConsumablesModel extends Entity {
  asset: AssetModel;
  amount: string;
  code: string;
  description: string;
  totalValue: string;
  unitValue: string;
}
