export type TransactionType = 'IN' | 'OUT' | 'RESERVE' | 'COMMIT' | 'CANCEL';

export class InventoryTransaction {
  constructor(
    public readonly id: string,
    public readonly materialId: string,
    public readonly type: TransactionType,
    public readonly amountKg: number,
    public readonly referenceQuoteId: string | null,
    public readonly notes: string | null,
    public readonly createdAt: Date
  ) {
    this.validate();
  }

  private validate(): void {
    if (this.amountKg <= 0) {
      throw new Error('La cantidad de la transacción debe ser mayor a 0.');
    }
    if ((this.type === 'RESERVE' || this.type === 'COMMIT') && !this.referenceQuoteId) {
      throw new Error('Las reservas o confirmaciones deben estar atadas a una cotización (referenceQuoteId).');
    }
  }
}

