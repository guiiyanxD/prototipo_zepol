import { Client } from '../domain/Client.js';
import { ClientRepository } from '../domain/ClientRepository.js';

export class GetClientsUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async execute(): Promise<Client[]> {
    return await this.clientRepository.findAll();
  }
}
