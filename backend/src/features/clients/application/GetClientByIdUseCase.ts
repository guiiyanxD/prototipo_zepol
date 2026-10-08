import { Client } from '../domain/Client.js';
import { ClientRepository } from '../domain/ClientRepository.js';

export class GetClientByIdUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async execute(id: string): Promise<Client | null> {
    return await this.clientRepository.findById(id);
  }
}
