import { PrismaClient } from '@prisma/client';
import { Client } from '../domain/Client.js';
import { ClientRepository } from '../domain/ClientRepository.js';

export class ClientPrismaRepository implements ClientRepository {
  constructor(private readonly prisma: PrismaClient) {}

  private toDomain(raw: any): Client {
    return new Client(
      raw.id,
      raw.email,
      raw.contactName,
      raw.companyName
    );
  }

  async save(client: Client): Promise<void> {
    await this.prisma.client.create({
      data: {
        id: client.id,
        email: client.email,
        contactName: client.contactName,
        companyName: client.companyName,
      }
    });
  }

  async update(client: Client): Promise<void> {
    await this.prisma.client.update({
      where: { id: client.id },
      data: {
        email: client.email,
        contactName: client.contactName,
        companyName: client.companyName,
      }
    });
  }

  async findById(id: string): Promise<Client | null> {
    const raw = await this.prisma.client.findUnique({ where: { id } });
    if (!raw) return null;
    return this.toDomain(raw);
  }

  async findByEmail(email: string): Promise<Client | null> {
    const raw = await this.prisma.client.findUnique({ where: { email } });
    if (!raw) return null;
    return this.toDomain(raw);
  }

  async findAll(): Promise<Client[]> {
    const rows = await this.prisma.client.findMany();
    return rows.map(r => this.toDomain(r));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.client.delete({ where: { id } });
  }
}
