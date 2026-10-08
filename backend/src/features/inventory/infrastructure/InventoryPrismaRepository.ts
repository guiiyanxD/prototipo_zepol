import { PrismaClient } from '@prisma/client';
import { InventoryRepository } from '../domain/InventoryRepository.js';
import { InventoryTransaction, TransactionType } from '../domain/InventoryTransaction.js';

export class InventoryPrismaRepository implements InventoryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async register(tx: InventoryTransaction): Promise<void> {
    let stockModifier: any = undefined;

    // IN y CANCEL suman al stock (CANCEL devuelve el stock de un RESERVE cancelado)
    if (tx.type === 'IN' || tx.type === 'CANCEL') {
      stockModifier = { increment: tx.amountKg };
    } 
    // OUT y RESERVE restan del stock disponible
    else if (tx.type === 'OUT' || tx.type === 'RESERVE') {
      stockModifier = { decrement: tx.amountKg };
    }
    // COMMIT no hace nada con el stock porque ya se descontó durante el RESERVE

    const operations = [];

    // 1. Guardar el registro de la transacción
    operations.push(
      this.prisma.inventoryTransaction.create({
        data: {
          id: tx.id,
          materialId: tx.materialId,
          type: tx.type,
          amountKg: tx.amountKg,
          referenceQuoteId: tx.referenceQuoteId,
          notes: tx.notes,
        },
      })
    );

    // 2. Modificar el stock del material de forma atómica
    if (stockModifier) {
      operations.push(
        this.prisma.material.update({
          where: { id: tx.materialId },
          data: { stockKg: stockModifier },
        })
      );
    }

    // Ejecutar atómicamente
    await this.prisma.$transaction(operations);
  }

  async findByMaterialId(materialId: string): Promise<InventoryTransaction[]> {
    const rows = await this.prisma.inventoryTransaction.findMany({
      where: { materialId },
      orderBy: { createdAt: 'desc' }
    });

    return rows.map(r => new InventoryTransaction(
      r.id,
      r.materialId,
      r.type as TransactionType,
      r.amountKg,
      r.referenceQuoteId,
      r.notes,
      r.createdAt
    ));
  }
}
