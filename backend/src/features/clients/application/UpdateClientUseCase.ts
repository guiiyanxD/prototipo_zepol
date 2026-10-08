import { Client } from '../domain/Client.js';
import { ClientRepository } from '../domain/ClientRepository.js';

export interface UpdateClientDTO {
  id: string;
  email?: string;
  contactName?: string;
  companyName?: string;
}

export class UpdateClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async execute(data: UpdateClientDTO): Promise<Client> {
    const existing = await this.clientRepository.findById(data.id);
    if (!existing) {
      throw new Error(`Cliente con ID ${data.id} no encontrado.`);
    }

    if (data.email && data.email !== existing.email) {
      const emailTaken = await this.clientRepository.findByEmail(data.email);
      if (emailTaken) {
        throw new Error(`El correo ${data.email} ya está registrado.`);
      }
    }

    const updated = new Client(
      existing.id,
      data.email ?? existing.email,
      data.contactName ?? existing.contactName,
      data.companyName !== undefined ? data.companyName : existing.companyName
    );

    await this.clientRepository.update(updated);
    return updated;
  }
}
