import { randomUUID } from 'crypto';
import { Quote, QuoteItem } from '../domain/Quote.js';
import { QuoteRepository } from '../domain/QuoteRepository.js';
import { QuoteCalculationService } from '../domain/QuoteCalculationService.js';
import { MaterialRepository } from '../../materials/domain/MaterialRepository.js';
import { ClientRepository } from '../../clients/domain/ClientRepository.js';

export interface CreateQuoteItemDTO {
  baseMaterialId: string;
  inkMaterialId?: string;
  packageWidthCm: number;
  packageHeightCm: number;
  quantity: number;
  inkCoveragePct: number;
}

export interface CreateQuoteDTO {
  clientId: string;
  validityDays: number;
  items: CreateQuoteItemDTO[];
}

export class CreateQuoteUseCase {
  constructor(
    private readonly quoteRepository: QuoteRepository,
    private readonly materialRepository: MaterialRepository,
    private readonly clientRepository: ClientRepository,
    private readonly calculationService: QuoteCalculationService
  ) {}

  public async execute(data: CreateQuoteDTO): Promise<Quote> {
    // 1. Validar que el cliente existe
    const client = await this.clientRepository.findById(data.clientId);
    if (!client) {
      throw new Error(`Cliente con ID ${data.clientId} no encontrado.`);
    }

    if (!data.items || data.items.length === 0) {
      throw new Error('La cotización debe tener al menos un item.');
    }

    const quoteId = randomUUID();
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + data.validityDays);

    const quote = new Quote(
      quoteId,
      data.clientId,
      'DRAFT',
      0, // Se calculará después
      validUntil,
      new Date(),
      []
    );

    // 2. Procesar cada item, buscar materiales y calcular
    for (const itemDto of data.items) {
      const baseMaterial = await this.materialRepository.findById(itemDto.baseMaterialId);
      if (!baseMaterial) throw new Error(`Material base con ID ${itemDto.baseMaterialId} no encontrado.`);

      let inkMaterial = null;
      if (itemDto.inkMaterialId) {
        inkMaterial = await this.materialRepository.findById(itemDto.inkMaterialId);
        if (!inkMaterial) throw new Error(`Tinta con ID ${itemDto.inkMaterialId} no encontrada.`);
      }

      // Ejecutar el motor de cálculo
      const calcResult = this.calculationService.calculateItem(
        itemDto.packageWidthCm,
        itemDto.packageHeightCm,
        itemDto.quantity,
        itemDto.inkCoveragePct,
        baseMaterial,
        inkMaterial
      );

      const quoteItem = new QuoteItem(
        randomUUID(),
        quoteId,
        itemDto.baseMaterialId,
        itemDto.inkMaterialId ?? null,
        itemDto.packageWidthCm,
        itemDto.packageHeightCm,
        itemDto.quantity,
        itemDto.inkCoveragePct,
        calcResult.calculatedAreaM2,
        calcResult.calculatedMaterialKg,
        calcResult.calculatedInkKg,
        calcResult.itemPrice
      );

      quote.items.push(quoteItem);
    }

    // 3. Totalizar y guardar
    quote.calculateTotal();
    await this.quoteRepository.save(quote);

    return quote;
  }
}
