import { Request, Response } from 'express';
import { CreateMaterialUseCase } from '../application/CreateMaterialUseCase.js';
import { GetMaterialsUseCase } from '../application/GetMaterialsUseCase.js';
import { GetMaterialByIdUseCase } from '../application/GetMaterialByIdUseCase.js';
import { UpdateMaterialUseCase } from '../application/UpdateMaterialUseCase.js';
import { DeleteMaterialUseCase } from '../application/DeleteMaterialUseCase.js';

export class MaterialController {
  constructor(
    private readonly createMaterialUseCase: CreateMaterialUseCase,
    private readonly getMaterialsUseCase: GetMaterialsUseCase,
    private readonly getMaterialByIdUseCase: GetMaterialByIdUseCase,
    private readonly updateMaterialUseCase: UpdateMaterialUseCase,
    private readonly deleteMaterialUseCase: DeleteMaterialUseCase
  ) {}

  public createMaterial = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto = req.body;
      const material = await this.createMaterialUseCase.execute(dto);
      res.status(201).json({
        message: 'Material creado exitosamente',
        data: material,
      });
    } catch (error: any) {
      res.status(400).json({
        error: error.message || 'Error procesando la solicitud',
      });
    }
  };

  public getMaterials = async (req: Request, res: Response): Promise<void> => {
    try {
      const materials = await this.getMaterialsUseCase.execute();
      res.status(200).json({ data: materials });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error interno del servidor' });
    }
  };

  public getMaterialById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const material = await this.getMaterialByIdUseCase.execute(id);
      if (!material) {
        res.status(404).json({ error: 'Material no encontrado' });
        return;
      }
      res.status(200).json({ data: material });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error interno del servidor' });
    }
  };

  public updateMaterial = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const dto = { ...req.body, id };
      const material = await this.updateMaterialUseCase.execute(dto);
      res.status(200).json({
        message: 'Material actualizado exitosamente',
        data: material,
      });
    } catch (error: any) {
      res.status(400).json({
        error: error.message || 'Error procesando la solicitud',
      });
    }
  };

  public deleteMaterial = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      await this.deleteMaterialUseCase.execute(id);
      res.status(200).json({
        message: 'Material eliminado exitosamente'
      });
    } catch (error: any) {
      if (error.message === 'Material not found') {
        res.status(404).json({ error: 'Material no encontrado' });
      } else {
        res.status(500).json({ error: error.message || 'Error interno del servidor' });
      }
    }
  };
}
