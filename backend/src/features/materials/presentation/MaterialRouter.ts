import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { MaterialPrismaRepository } from '../infrastructure/MaterialPrismaRepository.js';
import { CreateMaterialUseCase } from '../application/CreateMaterialUseCase.js';
import { GetMaterialsUseCase } from '../application/GetMaterialsUseCase.js';
import { GetMaterialByIdUseCase } from '../application/GetMaterialByIdUseCase.js';
import { UpdateMaterialUseCase } from '../application/UpdateMaterialUseCase.js';
import { DeleteMaterialUseCase } from '../application/DeleteMaterialUseCase.js';
import { MaterialController } from './MaterialController.js';

export function createMaterialRouter(prisma: PrismaClient): Router {
  const router = Router();

  const repository = new MaterialPrismaRepository(prisma);
  
  const createMaterialUseCase = new CreateMaterialUseCase(repository);
  const getMaterialsUseCase = new GetMaterialsUseCase(repository);
  const getMaterialByIdUseCase = new GetMaterialByIdUseCase(repository);
  const updateMaterialUseCase = new UpdateMaterialUseCase(repository);
  const deleteMaterialUseCase = new DeleteMaterialUseCase(repository);
  
  const controller = new MaterialController(
    createMaterialUseCase,
    getMaterialsUseCase,
    getMaterialByIdUseCase,
    updateMaterialUseCase,
    deleteMaterialUseCase
  );

  router.post('/', controller.createMaterial);
  router.get('/', controller.getMaterials);
  router.get('/:id', controller.getMaterialById);
  router.put('/:id', controller.updateMaterial);
  router.delete('/:id', controller.deleteMaterial);

  return router;
}
