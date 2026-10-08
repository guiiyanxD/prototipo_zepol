import { Material } from '../../materials/domain/Material.js';

export interface QuoteCalculationResult {
  totalAreaM2: number;
  materialWeightKg: number;
  materialCost: number;
  inkWeightKg: number;
  inkCost: number;
  totalCost: number;
}

export class QuoteCalculatorDomainService {
  // Rendimiento estándar de tinta: gramos por m2 al 100% de cobertura
  private readonly INK_YIELD_G_M2 = 1.5; 

  public calculate(
    widthCm: number, 
    heightCm: number, 
    quantity: number, 
    material: Material,
    inkMaterial: Material | null,
    inkCoveragePct: number
  ): QuoteCalculationResult {
    
    // 1. Área por unidad (m2) = (Ancho * Alto * 2 caras) / 10,000 para pasar de cm2 a m2
    const unitAreaM2 = (widthCm * heightCm * 2) / 10000;
    
    // 2. Área Bruta = área unitaria * cantidad de envases
    const grossAreaM2 = unitAreaM2 * quantity;
    
    // 3. Área Total (incluyendo merma operativa de calibración)
    const wasteFactor = 1 + (material.wasteMarginPct / 100);
    const totalAreaM2 = grossAreaM2 * wasteFactor;
    
    // 4. Peso de Material Base (Kg) = (Área * gramaje) / 1000 (g a Kg)
    const materialWeightKg = (totalAreaM2 * material.grammageGm2) / 1000;
    const materialCost = materialWeightKg * material.pricePerKg;
    
    // 5. Cálculo de Tinta (Kg y Costo)
    let inkWeightKg = 0;
    let inkCost = 0;
    
    if (inkMaterial && inkCoveragePct > 0) {
       // Peso tinta = Área * % cobertura * rendimiento / 1000
       inkWeightKg = (totalAreaM2 * (inkCoveragePct / 100) * this.INK_YIELD_G_M2) / 1000;
       inkCost = inkWeightKg * inkMaterial.pricePerKg;
    }
    
    return {
       totalAreaM2,
       materialWeightKg,
       materialCost,
       inkWeightKg,
       inkCost,
       totalCost: materialCost + inkCost
    };
  }
}

