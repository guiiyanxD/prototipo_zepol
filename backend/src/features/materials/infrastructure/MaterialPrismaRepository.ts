import { PrismaClient } from '@prisma/client';
import { Material, MaterialType } from '../domain/Material.js';
import { MaterialRepository } from '../domain/MaterialRepository.js';

export class MaterialPrismaRepository implements MaterialRepository {
  constructor(private readonly prisma: PrismaClient) {}

  private toDomain(raw: any): Material {
    return new Material(
      raw.id,
      raw.name,
      raw.type as MaterialType,
      raw.grammageGm2,
      raw.pricePerKg,
      raw.stockKg,
      raw.wasteMarginPct
    );
  }

  async findById(id: string): Promise<Material | null> {
    const raw = await this.prisma.material.findUnique({ where: { id } });
    if (!raw) return null;
    return this.toDomain(raw);
  }

  async save(material: Material): Promise<void> {
    await this.prisma.material.create({
      data: {
        id: material.id,
        name: material.name,
        type: material.type,
        grammageGm2: material.grammageGm2,
        pricePerKg: material.pricePerKg,
        stockKg: material.stockKg,
        wasteMarginPct: material.wasteMarginPct,
      },
    });
  }

  async update(material: Material): Promise<void> {
    await this.prisma.material.update({
      where: { id: material.id },
      data: {
        name: material.name,
        type: material.type,
        grammageGm2: material.grammageGm2,
        pricePerKg: material.pricePerKg,
        stockKg: material.stockKg,
        wasteMarginPct: material.wasteMarginPct,
      },
    });
  }

  async findAll(): Promise<Material[]> {
    const rows = await this.prisma.material.findMany();
    return rows.map((row: any) => this.toDomain(row));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.material.delete({
      where: { id }
    });
  }
}

