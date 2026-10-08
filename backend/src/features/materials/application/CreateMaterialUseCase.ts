import { Material } from '../domain/Material.js';
import { MaterialRepository } from '../domain/MaterialRepository.js';
import { randomUUID } from 'crypto';

export interface CreateMaterialDTO {
  name: string;
  type: 'BASE' | 'INK';
  grammageGm2: number;
  pricePerKg: number;
  initialStockKg: number;
  wasteMarginPct: number;
}

export class CreateMaterialUseCase {
  constructor(private readonly materialRepository: MaterialRepository) {}

  public async execute(data: CreateMaterialDTO): Promise<Material> {
    const newMaterial = new Material(
      randomUUID(),
      data.name,
      data.type,
      data.grammageGm2,
      data.pricePerKg,
      data.initialStockKg,
      data.wasteMarginPct
    );

    await this.materialRepository.save(newMaterial);
    
    return newMaterial;
  }
}

