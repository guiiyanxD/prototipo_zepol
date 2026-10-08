import { InventoryTransaction } from './InventoryTransaction.js';

export interface InventoryRepository {
  register(transaction: InventoryTransaction): Promise<void>;
  findByMaterialId(materialId: string): Promise<InventoryTransaction[]>;
}
