import { QuoteCalculatorDomainService } from '../domain/QuoteCalculatorDomainService.js';
import { MaterialRepository } from '../../materials/domain/MaterialRepository.js';
import { ReserveMaterialUseCase } from '../../inventory/application/ReserveMaterialUseCase.js';

export interface GenerateQuoteDTO {
  clientId: string;
  baseMaterialId: string;
  inkMaterialId?: string;
  widthCm: number;
  heightCm: number;
  quantity: number;
  inkCoveragePct: number; // 0, 20, 50, 100
}

export class GenerateQuoteUseCase {
  constructor(
    private readonly calculator: QuoteCalculatorDomainService,
    private readonly materialRepo: MaterialRepository,
    private readonly reserveMaterialUseCase: ReserveMaterialUseCase
  ) {}

  public async execute(data: GenerateQuoteDTO) {
    const baseMaterial = await this.materialRepo.findById(data.baseMaterialId);
    if (!baseMaterial) throw new Error('Material base no encontrado.');

    let inkMaterial = null;
    if (data.inkMaterialId) {
       inkMaterial = await this.materialRepo.findById(data.inkMaterialId);
    }

    // 1. Ejecutar las matemáticas (Capa de Dominio)
    const calculations = this.calculator.calculate(
      data.widthCm, 
      data.heightCm, 
      data.quantity, 
      baseMaterial, 
      inkMaterial, 
      data.inkCoveragePct
    );

    // 2. Verificar Stock y Crear Reserva (Orquestando Inventario)
    // El caso de uso de reserva lanzará error si no hay stock suficiente, 
    // abortando el proceso automáticamente e impidiendo ventas sin stock.
    const reservation = await this.reserveMaterialUseCase.execute({
      materialId: baseMaterial.id,
      amountKg: calculations.materialWeightKg,
      quoteId: 'uuid-de-cotizacion', 
      notes: 'Reserva automática generada desde cotizador web'
    });

    // 3. Aquí guardaríamos la cotización en la Base de Datos...

    return {
      success: true,
      price: calculations.totalCost,
      details: calculations,
      reservationId: reservation.id
    };
  }
}

