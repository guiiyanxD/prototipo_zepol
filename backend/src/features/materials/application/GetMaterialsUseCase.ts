import { Material } from '../domain/Material.js';
import { MaterialRepository } from '../domain/MaterialRepository.js';

export class GetMaterialsUseCase {
  constructor(private readonly materialRepository: MaterialRepository) {}

  public async execute(): Promise<Material[]> {
    return await this.materialRepository.findAll();
  }
}
