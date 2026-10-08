import { randomUUID } from 'crypto';
import { InventoryTransaction, TransactionType } from '../domain/InventoryTransaction.js';
import { InventoryRepository } from '../domain/InventoryRepository.js';
import { MaterialRepository } from '../../materials/domain/MaterialRepository.js';

export interface RegisterTransactionDTO {
  materialId: string;
  type: TransactionType;
  amountKg: number;
  referenceQuoteId?: string;
  notes?: string;
}

export class RegisterTransactionUseCase {
  constructor(
    private readonly inventoryRepository: InventoryRepository,
    private readonly materialRepository: MaterialRepository
  ) {}

  public async execute(data: RegisterTransactionDTO): Promise<InventoryTransaction> {
    // 1. Validar si el material existe
    const material = await this.materialRepository.findById(data.materialId);
    if (!material) {
      throw new Error(`Material con ID ${data.materialId} no encontrado.`);
    }

    // 2. Validar que haya stock suficiente para salidas o reservas
    if ((data.type === 'OUT' || data.type === 'RESERVE') && material.stockKg < data.amountKg) {
      throw new Error(`Stock insuficiente. Stock actual: ${material.stockKg}Kg, Requerido: ${data.amountKg}Kg`);
    }

    // 3. Crear entidad de dominio
    const tx = new InventoryTransaction(
      randomUUID(),
      data.materialId,
      data.type,
      data.amountKg,
      data.referenceQuoteId ?? null,
      data.notes ?? null,
      new Date()
    );

    // 4. Guardar transacción (el repositorio Prisma ajustará el stock automáticamente)
    await this.inventoryRepository.register(tx);
    
    return tx;
  }
}
