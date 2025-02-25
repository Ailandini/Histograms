import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const PORT = process.env.PORT || 8000;

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/commodities', async (req: Request, res: Response) => {
  const commodities = await prisma.commodity.findMany();
  res.json(commodities);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
