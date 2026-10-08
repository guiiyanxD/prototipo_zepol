import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { createMaterialRouter } from './features/materials/presentation/MaterialRouter.js';
import { createInventoryRouter } from './features/inventory/presentation/InventoryRouter.js';
import { createClientRouter } from './features/clients/presentation/ClientRouter.js';
import { createQuoteRouter } from './features/quotes/presentation/QuoteRouter.js';

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/materials', createMaterialRouter(prisma));
app.use('/api/inventory', createInventoryRouter(prisma));
app.use('/api/clients', createClientRouter(prisma));
app.use('/api/quotes', createQuoteRouter(prisma));

app.get('/health', async (req: Request, res: Response) => {
  try {
    // Verificar conexión a la BD
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'OK', database: 'Connected' });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', database: 'Disconnected' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

