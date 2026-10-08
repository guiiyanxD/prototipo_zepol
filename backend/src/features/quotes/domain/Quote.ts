export type QuoteStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';

export class QuoteItem {
  constructor(
    public readonly id: string,
    public quoteId: string,
    public baseMaterialId: string,
    public inkMaterialId: string | null,
    public packageWidthCm: number,
    public packageHeightCm: number,
    public quantity: number,
    public inkCoveragePct: number,
    public calculatedAreaM2: number,
    public calculatedMaterialKg: number,
    public calculatedInkKg: number,
    public itemPrice: number
  ) {}
}

export class Quote {
  constructor(
    public readonly id: string,
    public clientId: string,
    public status: QuoteStatus,
    public totalPrice: number,
    public validUntil: Date,
    public readonly createdAt: Date,
    public items: QuoteItem[] = []
  ) {}

  public calculateTotal(): void {
    this.totalPrice = this.items.reduce((sum, item) => sum + item.itemPrice, 0);
  }
}
