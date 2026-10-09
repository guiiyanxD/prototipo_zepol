import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando carga de datos semilla...');

  // 1. Limpiar base de datos (Opcional, pero útil para no duplicar datos)
  // Nota: En producción real, tal vez quieras quitar el deleteMany
  await prisma.quoteItem.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.inventoryTransaction.deleteMany();
  await prisma.client.deleteMany();
  await prisma.material.deleteMany();

  // 2. Crear Materiales Base
  const baseMaterial1 = await prisma.material.create({
    data: {
      name: 'BOPP Laminado Brillante',
      type: 'BASE',
      grammageGm2: 25,
      pricePerKg: 4.5,
      stockKg: 1000,
      wasteMarginPct: 5,
    },
  });

  const baseMaterial2 = await prisma.material.create({
    data: {
      name: 'Polietileno de Alta Densidad (HDPE)',
      type: 'BASE',
      grammageGm2: 50,
      pricePerKg: 3.2,
      stockKg: 500,
      wasteMarginPct: 8,
    },
  });

  // 3. Crear Tintas
  const inkMaterial = await prisma.material.create({
    data: {
      name: 'Tinta Cyan UV',
      type: 'INK',
      grammageGm2: 0, // Las tintas normalmente se manejan diferente, o gramaje 0
      pricePerKg: 15.0,
      stockKg: 50,
      wasteMarginPct: 2,
    },
  });

  // 4. Crear un Cliente de prueba
  const client = await prisma.client.create({
    data: {
      email: 'contacto@empresa.com',
      companyName: 'Empresa Ficticia S.A.',
      contactName: 'Juan Pérez',
    },
  });

  // 5. Crear una Cotización de prueba
  const quote = await prisma.quote.create({
    data: {
      clientId: client.id,
      status: 'PENDING_APPROVAL',
      totalPrice: 1500.50,
      validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // Válido por 15 días
      items: {
        create: [
          {
            baseMaterialId: baseMaterial1.id,
            inkMaterialId: inkMaterial.id,
            packageWidthCm: 15,
            packageHeightCm: 25,
            quantity: 10000,
            inkCoveragePct: 40,
            calculatedAreaM2: 375,
            calculatedMaterialKg: 9.37,
            calculatedInkKg: 1.5,
            itemPrice: 1500.50,
          }
        ]
      }
    }
  });

  console.log('✅ Datos semilla creados con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error al ejecutar el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
