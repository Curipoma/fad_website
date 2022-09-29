import { AssetModel } from '@models/core';
import { Entity } from '@models/shared';

export interface AssetDetailsModel extends Entity {
  asset: AssetModel;
  annualExistence: string;
  code: string;
  initialExistence: string;
  unitValue: string;
  value: string;
}
