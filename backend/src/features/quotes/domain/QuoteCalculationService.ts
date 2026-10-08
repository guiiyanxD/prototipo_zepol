import { Material } from '../../materials/domain/Material.js';

export interface CalculationResult {
  calculatedAreaM2: number;
  calculatedMaterialKg: number;
  calculatedInkKg: number;
  itemPrice: number;
}

export class QuoteCalculationService {
  /**
   * Calcula los consumos y precios de un item de cotización.
   * La matemática aplica el área en m2, consumo de material por gramaje y considera las mermas.
   */
  public calculateItem(
    widthCm: number,
    heightCm: number,
    quantity: number,
    inkCoveragePct: number,
    baseMaterial: Material,
    inkMaterial: Material | null
  ): CalculationResult {
    // 1. Área unitaria en metros cuadrados
    const unitAreaM2 = (widthCm / 100) * (heightCm / 100);
    const totalAreaM2 = unitAreaM2 * quantity;

    // 2. Consumo de Material Base (Kg)
    // Kg = [Área Total (m2) * Gramaje (g/m2) / 1000] * (1 + % merma)
    const rawMaterialKg = totalAreaM2 * (baseMaterial.grammageGm2 / 1000);
    const calculatedMaterialKg = rawMaterialKg * (1 + (baseMaterial.wasteMarginPct / 100));

    // 3. Consumo de Tinta (Kg)
    let calculatedInkKg = 0;
    if (inkMaterial) {
      // Kg = [Área Total (m2) * % Cobertura * Gramaje de tinta (g/m2) / 1000] * (1 + % merma)
      const rawInkKg = totalAreaM2 * (inkCoveragePct / 100) * (inkMaterial.grammageGm2 / 1000);
      calculatedInkKg = rawInkKg * (1 + (inkMaterial.wasteMarginPct / 100));
    }

    // 4. Costos (Precio * Consumo calculado)
    const materialCost = calculatedMaterialKg * baseMaterial.pricePerKg;
    const inkCost = inkMaterial ? (calculatedInkKg * inkMaterial.pricePerKg) : 0;
    const itemPrice = materialCost + inkCost;

    return {
      calculatedAreaM2: unitAreaM2, // Área unitaria que se guarda como referencia
      calculatedMaterialKg,
      calculatedInkKg,
      itemPrice
    };
  }
}
