import { Entity } from '@models/shared';

export interface MaterialModel extends Entity {
  description: string;
  initialExistence: string;
  annualExistence: string;
  unitValue: string;
  totalValue: string;
  code: string;
}
