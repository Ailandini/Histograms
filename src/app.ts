import express, { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { getCommodityHistogram } from '@prisma/client/sql'
const PORT = process.env.PORT || 8000;

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/Commodity/histogram', async (req: Request, res: Response) => {
  const commodities = await prisma.$queryRawTyped(getCommodityHistogram())
  const commoditiesForResponse = commodities.map(c => `${c.commodity}: ${c.count}`);
  res.send(`<div>${commoditiesForResponse.join(',')}</div>`);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
