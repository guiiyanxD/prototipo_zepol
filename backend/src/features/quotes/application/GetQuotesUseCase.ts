import { QuoteRepository, QuoteDetailsDTO } from '../domain/QuoteRepository.js';

export class GetQuotesUseCase {
  constructor(private readonly quoteRepository: QuoteRepository) {}

  public async execute(): Promise<QuoteDetailsDTO[]> {
    return this.quoteRepository.findAllWithDetails();
  }
}
