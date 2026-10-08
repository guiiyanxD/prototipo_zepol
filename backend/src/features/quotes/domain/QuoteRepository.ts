import { Quote } from './Quote.js';

export interface QuoteDetailsDTO {
  id: string;
  clientId: string;
  clientName: string;
  companyName: string | null;
  status: string;
  totalPrice: number;
  validUntil: Date;
  createdAt: Date;
  itemsCount: number;
}

export interface QuoteRepository {
  save(quote: Quote): Promise<void>;
  update(quote: Quote): Promise<void>;
  findById(id: string): Promise<Quote | null>;
  findByClientId(clientId: string): Promise<Quote[]>;
  findAllWithDetails(): Promise<QuoteDetailsDTO[]>;
}