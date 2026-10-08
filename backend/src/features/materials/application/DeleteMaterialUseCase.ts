import { MaterialRepository } from '../domain/MaterialRepository.js';

export class DeleteMaterialUseCase {
  constructor(private readonly materialRepository: MaterialRepository) {}

  async execute(id: string): Promise<void> {
    const material = await this.materialRepository.findById(id);
    if (!material) {
      throw new Error('Material not found');
    }
    await this.materialRepository.delete(id);
  }
}
