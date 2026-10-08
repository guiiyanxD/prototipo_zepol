import { InventoryTransaction } from '../domain/InventoryTransaction.js';
import { InventoryTransactionRepository } from '../domain/InventoryTransactionRepository.js';
import { MaterialRepository } from '../../materials/domain/MaterialRepository.js';
import { randomUUID } from 'crypto';

export interface ReserveMaterialDTO {
  materialId: string;
  amountKg: number;
  quoteId: string;
  notes?: string;
}

export class ReserveMaterialUseCase {
  constructor(
    private readonly transactionRepo: InventoryTransactionRepository,
    private readonly materialRepo: MaterialRepository
  ) {}

  public async execute(data: ReserveMaterialDTO): Promise<InventoryTransaction> {
    // 1. Obtener el material de la base de datos
    const material = await this.materialRepo.findById(data.materialId);
    if (!material) {
      throw new Error('Material no encontrado.');
    }

    // 2. Reducir stock usando la regla de negocio del dominio (Material)
    // Esto lanzará error automáticamente si el stock disponible es insuficiente
    material.reduceStock(data.amountKg);

    // 3. Crear el registro de la transacción de reserva
    const transaction = new InventoryTransaction(
      randomUUID(),
      material.id,
      'RESERVE',
      data.amountKg,
      data.quoteId,
      data.notes || null,
      new Date()
    );

    // 4. Persistir los cambios en la BD
    await this.materialRepo.update(material);
    await this.transactionRepo.save(transaction);

    return transaction;
  }
}

