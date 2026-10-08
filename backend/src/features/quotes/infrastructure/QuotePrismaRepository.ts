import { PrismaClient } from '@prisma/client';
import { Quote, QuoteItem, QuoteStatus } from '../domain/Quote.js';
import { QuoteRepository } from '../domain/QuoteRepository.js';

export class QuotePrismaRepository implements QuoteRepository {
  constructor(private readonly prisma: PrismaClient) {}

  private toDomain(raw: any): Quote {
    const quote = new Quote(
      raw.id,
      raw.clientId,
      raw.status as QuoteStatus,
      raw.totalPrice,
      raw.validUntil,
      raw.createdAt,
      []
    );

    if (raw.items) {
      quote.items = raw.items.map((i: any) => new QuoteItem(
        i.id,
        i.quoteId,
        i.baseMaterialId,
        i.inkMaterialId,
        i.packageWidthCm,
        i.packageHeightCm,
        i.quantity,
        i.inkCoveragePct,
        i.calculatedAreaM2,
        i.calculatedMaterialKg,
        i.calculatedInkKg,
        i.itemPrice
      ));
    }
    return quote;
  }

  async save(quote: Quote): Promise<void> {
    // Usamos $transaction para asegurar que si falla un item, no se guarde la cabecera
    await this.prisma.$transaction(async (tx) => {
      // 1. Guardar la cabecera (Quote)
      await tx.quote.create({
        data: {
          id: quote.id,
          clientId: quote.clientId,
          status: quote.status,
          totalPrice: quote.totalPrice,
          validUntil: quote.validUntil,
          createdAt: quote.createdAt,
        }
      });

      // 2. Guardar los Items
      if (quote.items.length > 0) {
        await tx.quoteItem.createMany({
          data: quote.items.map(i => ({
            id: i.id,
            quoteId: i.quoteId,
            baseMaterialId: i.baseMaterialId,
            inkMaterialId: i.inkMaterialId,
            packageWidthCm: i.packageWidthCm,
            packageHeightCm: i.packageHeightCm,
            quantity: i.quantity,
            inkCoveragePct: i.inkCoveragePct,
            calculatedAreaM2: i.calculatedAreaM2,
            calculatedMaterialKg: i.calculatedMaterialKg,
            calculatedInkKg: i.calculatedInkKg,
            itemPrice: i.itemPrice
          }))
        });
      }
    });
  }

  async findById(id: string): Promise<Quote | null> {
    const raw = await this.prisma.quote.findUnique({
      where: { id },
      include: { items: true }
    });
    if (!raw) return null;
    return this.toDomain(raw);
  }

  async findByClientId(clientId: string): Promise<Quote[]> {
    const rows = await this.prisma.quote.findMany({
      where: { clientId },
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    });
    return rows.map(r => this.toDomain(r));
  }

  async findAllWithDetails(): Promise<import('../domain/QuoteRepository.js').QuoteDetailsDTO[]> {
    const rows = await this.prisma.quote.findMany({
      include: {
        client: true,
        _count: {
          select: { items: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return rows.map(r => ({
      id: r.id,
      clientId: r.clientId,
      clientName: r.client.contactName,
      companyName: r.client.companyName,
      status: r.status,
      totalPrice: r.totalPrice,
      validUntil: r.validUntil,
      createdAt: r.createdAt,
      itemsCount: r._count.items
    }));
  }

  async update(quote: Quote): Promise<void> {
    await this.prisma.quote.update({
      where: { id: quote.id },
      data: {
        status: quote.status,
        totalPrice: quote.totalPrice,
      }
    });
  }
}
