import { randomUUID } from 'crypto';
import { Client } from '../domain/Client.js';
import { ClientRepository } from '../domain/ClientRepository.js';

export interface CreateClientDTO {
  email: string;
  contactName: string;
  companyName?: string;
}

export class CreateClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async execute(data: CreateClientDTO): Promise<Client> {
    // Validar si el email ya existe
    const existing = await this.clientRepository.findByEmail(data.email);
    if (existing) {
      throw new Error(`El correo ${data.email} ya está registrado a otro cliente.`);
    }

    const client = new Client(
      randomUUID(),
      data.email,
      data.contactName,
      data.companyName ?? null
    );

    await this.clientRepository.save(client);
    return client;
  }
}
