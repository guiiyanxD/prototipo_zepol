import { QuoteRepository } from '../domain/QuoteRepository.js';
import { QuoteStatus } from '../domain/Quote.js';
import { RegisterTransactionUseCase } from '../../inventory/application/RegisterTransactionUseCase.js';
import { TransactionType } from '../../inventory/domain/InventoryTransaction.js';

export interface UpdateQuoteStatusDTO {
  quoteId: string;
  status: QuoteStatus;
}

export class UpdateQuoteStatusUseCase {
  constructor(
    private readonly quoteRepository: QuoteRepository,
    private readonly registerTransactionUseCase: RegisterTransactionUseCase
  ) {}

  public async execute(data: UpdateQuoteStatusDTO): Promise<void> {
    const quote = await this.quoteRepository.findById(data.quoteId);
    if (!quote) {
      throw new Error(`Cotizacin con ID ${data.quoteId} no encontrada.`);
    }

    if (quote.status === data.status) {
      return; // No change
    }

    // Si se aprueba, debemos reservar material del inventario
    if (data.status === 'APPROVED' && quote.status !== 'APPROVED') {
      for (const item of quote.items) {
        // Reservar Material Base
        await this.registerTransactionUseCase.execute({
          materialId: item.baseMaterialId,
          type: 'RESERVE',
          amountKg: item.calculatedMaterialKg,
          referenceQuoteId: quote.id,
          notes: `Reserva para cotizacin aprobada`
        });

        // Reservar Tinta (si aplica)
        if (item.inkMaterialId && item.calculatedInkKg > 0) {
          await this.registerTransactionUseCase.execute({
            materialId: item.inkMaterialId,
            type: 'RESERVE',
            amountKg: item.calculatedInkKg,
            referenceQuoteId: quote.id,
            notes: `Reserva para cotizacin aprobada`
          });
        }
      }
    }

    // Actualizar el estado
    quote.status = data.status;
    await this.quoteRepository.update(quote);
  }
}
