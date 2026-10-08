import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { InventoryPrismaRepository } from '../infrastructure/InventoryPrismaRepository.js';
import { RegisterTransactionUseCase } from '../application/RegisterTransactionUseCase.js';
import { GetTransactionsByMaterialUseCase } from '../application/GetTransactionsByMaterialUseCase.js';
import { InventoryController } from './InventoryController.js';
import { MaterialPrismaRepository } from '../../materials/infrastructure/MaterialPrismaRepository.js';

export function createInventoryRouter(prisma: PrismaClient): Router {
  const router = Router();

  const inventoryRepo = new InventoryPrismaRepository(prisma);
  const materialRepo = new MaterialPrismaRepository(prisma);
  
  const registerTransactionUseCase = new RegisterTransactionUseCase(inventoryRepo, materialRepo);
  const getTransactionsByMaterialUseCase = new GetTransactionsByMaterialUseCase(inventoryRepo, materialRepo);
  
  const controller = new InventoryController(
    registerTransactionUseCase,
    getTransactionsByMaterialUseCase
  );

  router.post('/', controller.registerTransaction);
  router.get('/:materialId', controller.getTransactionsByMaterial);

  return router;
}
