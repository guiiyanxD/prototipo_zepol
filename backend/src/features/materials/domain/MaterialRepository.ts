import { Material } from './Material.js';

export interface MaterialRepository {
  findById(id: string): Promise<Material | null>;
  save(material: Material): Promise<void>;
  update(material: Material): Promise<void>;
  findAll(): Promise<Material[]>;
  delete(id: string): Promise<void>;
}

