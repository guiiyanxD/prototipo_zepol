import { InventoryTransaction } from '../domain/InventoryTransaction.js';
import { InventoryRepository } from '../domain/InventoryRepository.js';
import { MaterialRepository } from '../../materials/domain/MaterialRepository.js';

export class GetTransactionsByMaterialUseCase {
  constructor(
    private readonly inventoryRepository: InventoryRepository,
    private readonly materialRepository: MaterialRepository
  ) {}

  public async execute(materialId: string): Promise<InventoryTransaction[]> {
    const material = await this.materialRepository.findById(materialId);
    if (!material) {
      throw new Error(`Material con ID ${materialId} no encontrado.`);
    }

    return await this.inventoryRepository.findByMaterialId(materialId);
  }
}
