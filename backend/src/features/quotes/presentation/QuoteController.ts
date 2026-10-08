import { Request, Response } from 'express';
import { CreateQuoteUseCase } from '../application/CreateQuoteUseCase.js';
import { GetQuotesUseCase } from '../application/GetQuotesUseCase.js';
import { UpdateQuoteStatusUseCase } from '../application/UpdateQuoteStatusUseCase.js';

export class QuoteController {
  constructor(
    private readonly createQuoteUseCase: CreateQuoteUseCase,
    private readonly getQuotesUseCase: GetQuotesUseCase,
    private readonly updateQuoteStatusUseCase: UpdateQuoteStatusUseCase
  ) {}

  public createQuote = async (req: Request, res: Response): Promise<void> => {
    try {
      const quote = await this.createQuoteUseCase.execute(req.body);
      res.status(201).json({
        message: 'Cotización calculada y creada exitosamente',
        data: quote
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error procesando la cotización' });
    }
  };

  public getQuotes = async (req: Request, res: Response): Promise<void> => {
    try {
      const quotes = await this.getQuotesUseCase.execute();
      res.status(200).json({
        data: quotes
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error obteniendo cotizaciones' });
    }
  };

  public updateQuoteStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const { status } = req.body;
      
      await this.updateQuoteStatusUseCase.execute({ quoteId: id, status });
      
      res.status(200).json({
        message: 'Estado de la cotización actualizado exitosamente'
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error actualizando el estado de la cotización' });
    }
  };
}
