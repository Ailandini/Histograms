import express, { Request, Response } from 'express';
import { PrismaClient, Commodity } from '@prisma/client';
const PORT = process.env.PORT || 8000;

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/Commodity/histogram', async (req: Request, res: Response) => {
  const commodities: Pick<Commodity, 'commodity'>[] = await prisma.commodity.findMany({
    distinct: ['commodity'],
    select: { commodity: true }
  });
  const commoditiesForResponse = commodities.map(c => c.commodity);
  res.send(`<div>${commoditiesForResponse.join(',')}</div>`);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
