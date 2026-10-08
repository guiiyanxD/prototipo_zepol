import { Material } from '../domain/Material.js';
import { MaterialRepository } from '../domain/MaterialRepository.js';

export class GetMaterialByIdUseCase {
  constructor(private readonly materialRepository: MaterialRepository) {}

  public async execute(id: string): Promise<Material | null> {
    return await this.materialRepository.findById(id);
  }
}
