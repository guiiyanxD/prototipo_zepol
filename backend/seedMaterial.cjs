const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.material.create({
    data: {
      name: "BOPP Laminado Brillante",
      type: "BASE",
      grammageGm2: 25,
      pricePerKg: 4.5,
      stockKg: 1000,
      wasteMarginPct: 5
    }
  });
  console.log("Material creado.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
