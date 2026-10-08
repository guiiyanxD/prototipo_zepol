import { Request, Response } from 'express';
import { RegisterTransactionUseCase } from '../application/RegisterTransactionUseCase.js';
import { GetTransactionsByMaterialUseCase } from '../application/GetTransactionsByMaterialUseCase.js';

export class InventoryController {
  constructor(
    private readonly registerTransactionUseCase: RegisterTransactionUseCase,
    private readonly getTransactionsByMaterialUseCase: GetTransactionsByMaterialUseCase
  ) {}

  public registerTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto = req.body;
      const tx = await this.registerTransactionUseCase.execute(dto);
      res.status(201).json({
        message: 'Transacción registrada exitosamente',
        data: tx,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error procesando la solicitud' });
    }
  };

  public getTransactionsByMaterial = async (req: Request, res: Response): Promise<void> => {
    try {
      const materialId = req.params.materialId as string;
      const transactions = await this.getTransactionsByMaterialUseCase.execute(materialId);
      res.status(200).json({ data: transactions });
    } catch (error: any) {
      res.status(404).json({ error: error.message || 'Material no encontrado' });
    }
  };
}
