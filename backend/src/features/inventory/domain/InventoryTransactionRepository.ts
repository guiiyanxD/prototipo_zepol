import { InventoryTransaction } from './InventoryTransaction.js';

export interface InventoryTransactionRepository {
  save(transaction: InventoryTransaction): Promise<void>;
  findByMaterialId(materialId: string): Promise<InventoryTransaction[]>;
}

