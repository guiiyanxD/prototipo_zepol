import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { ClientPrismaRepository } from '../infrastructure/ClientPrismaRepository.js';
import { CreateClientUseCase } from '../application/CreateClientUseCase.js';
import { GetClientsUseCase } from '../application/GetClientsUseCase.js';
import { GetClientByIdUseCase } from '../application/GetClientByIdUseCase.js';
import { UpdateClientUseCase } from '../application/UpdateClientUseCase.js';
import { DeleteClientUseCase } from '../application/DeleteClientUseCase.js';
import { ClientController } from './ClientController.js';

export function createClientRouter(prisma: PrismaClient): Router {
  const router = Router();

  const repository = new ClientPrismaRepository(prisma);
  
  const createClientUseCase = new CreateClientUseCase(repository);
  const getClientsUseCase = new GetClientsUseCase(repository);
  const getClientByIdUseCase = new GetClientByIdUseCase(repository);
  const updateClientUseCase = new UpdateClientUseCase(repository);
  const deleteClientUseCase = new DeleteClientUseCase(repository);
  
  const controller = new ClientController(
    createClientUseCase,
    getClientsUseCase,
    getClientByIdUseCase,
    updateClientUseCase,
    deleteClientUseCase
  );

  router.post('/', controller.createClient);
  router.get('/', controller.getClients);
  router.get('/:id', controller.getClientById);
  router.put('/:id', controller.updateClient);
  router.delete('/:id', controller.deleteClient);

  return router;
}
