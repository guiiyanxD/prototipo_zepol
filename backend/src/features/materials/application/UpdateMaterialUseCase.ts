import { Material } from '../domain/Material.js';
import { MaterialRepository } from '../domain/MaterialRepository.js';

export interface UpdateMaterialDTO {
  id: string;
  name?: string;
  type?: 'BASE' | 'INK';
  grammageGm2?: number;
  pricePerKg?: number;
  stockKg?: number;
  wasteMarginPct?: number;
}

export class UpdateMaterialUseCase {
  constructor(private readonly materialRepository: MaterialRepository) {}

  public async execute(data: UpdateMaterialDTO): Promise<Material> {
    const existingMaterial = await this.materialRepository.findById(data.id);
    if (!existingMaterial) {
      throw new Error(`Material con ID ${data.id} no encontrado.`);
    }

    // Usamos el constructor para volver a pasar por las validaciones de dominio
    const updatedMaterial = new Material(
      existingMaterial.id,
      data.name ?? existingMaterial.name,
      data.type ?? existingMaterial.type,
      data.grammageGm2 ?? existingMaterial.grammageGm2,
      data.pricePerKg ?? existingMaterial.pricePerKg,
      data.stockKg ?? existingMaterial.stockKg,
      data.wasteMarginPct ?? existingMaterial.wasteMarginPct
    );

    await this.materialRepository.update(updatedMaterial);
    
    return updatedMaterial;
  }
}
