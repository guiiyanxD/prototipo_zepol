export type MaterialType = 'BASE' | 'INK';

export class Material {
  constructor(
    public readonly id: string,
    public name: string,
    public type: MaterialType,
    public grammageGm2: number,
    public pricePerKg: number,
    public stockKg: number,
    public wasteMarginPct: number
  ) {
    this.validate();
  }

  private validate(): void {
    if (this.pricePerKg < 0) throw new Error('El precio por Kg no puede ser negativo.');
    if (this.stockKg < 0) throw new Error('El stock no puede ser negativo.');
    if (this.grammageGm2 <= 0) throw new Error('El gramaje debe ser mayor a 0.');
    if (this.wasteMarginPct < 0 || this.wasteMarginPct > 100) {
      throw new Error('La merma debe ser un porcentaje válido (0-100).');
    }
  }

  public reduceStock(amount: number): void {
    if (amount <= 0) throw new Error('La cantidad a reducir debe ser positiva.');
    if (this.stockKg - amount < 0) throw new Error(`Stock insuficiente para ${this.name}.`);
    this.stockKg -= amount;
  }

  public addStock(amount: number): void {
    if (amount <= 0) throw new Error('La cantidad a añadir debe ser positiva.');
    this.stockKg += amount;
  }
}

