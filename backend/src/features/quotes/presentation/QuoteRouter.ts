import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { QuotePrismaRepository } from '../infrastructure/QuotePrismaRepository.js';
import { QuoteCalculationService } from '../domain/QuoteCalculationService.js';
import { CreateQuoteUseCase } from '../application/CreateQuoteUseCase.js';
import { GetQuotesUseCase } from '../application/GetQuotesUseCase.js';
import { UpdateQuoteStatusUseCase } from '../application/UpdateQuoteStatusUseCase.js';
import { RegisterTransactionUseCase } from '../../inventory/application/RegisterTransactionUseCase.js';
import { InventoryPrismaRepository } from '../../inventory/infrastructure/InventoryPrismaRepository.js';
import { QuoteController } from './QuoteController.js';
import { MaterialPrismaRepository } from '../../materials/infrastructure/MaterialPrismaRepository.js';
import { ClientPrismaRepository } from '../../clients/infrastructure/ClientPrismaRepository.js';

export function createQuoteRouter(prisma: PrismaClient): Router {
  const router = Router();

  const quoteRepo = new QuotePrismaRepository(prisma);
  const materialRepo = new MaterialPrismaRepository(prisma);
  const clientRepo = new ClientPrismaRepository(prisma);
  const inventoryRepo = new InventoryPrismaRepository(prisma);
  
  const calcService = new QuoteCalculationService();

  const createQuoteUseCase = new CreateQuoteUseCase(
    quoteRepo,
    materialRepo,
    clientRepo,
    calcService
  );
  
  const getQuotesUseCase = new GetQuotesUseCase(quoteRepo);
  const registerTransactionUseCase = new RegisterTransactionUseCase(inventoryRepo, materialRepo);
  const updateQuoteStatusUseCase = new UpdateQuoteStatusUseCase(quoteRepo, registerTransactionUseCase);

  const controller = new QuoteController(createQuoteUseCase, getQuotesUseCase, updateQuoteStatusUseCase);

  router.post('/', controller.createQuote);
  router.get('/', controller.getQuotes);
  router.put('/:id/status', controller.updateQuoteStatus);

  return router;
}
