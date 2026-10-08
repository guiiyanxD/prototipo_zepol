import { ClientRepository } from '../domain/ClientRepository.js';

export class DeleteClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(id: string): Promise<void> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new Error('Client not found');
    }
    await this.clientRepository.delete(id);
  }
}
