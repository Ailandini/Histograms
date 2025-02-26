import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getCommodityHistogram, getCommodityTypeHistogram, getUnitsHistogram } from '@prisma/client/sql'
const PORT = process.env.PORT || 8000;

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/Commodity/histogram', async (req: Request, res: Response) => {
  const commodities = await prisma.$queryRawTyped(getCommodityHistogram())
  const commoditiesForResponse = commodities.map(c => `${c.commodity}: ${c.count}`);
  res.send(`<div style="white-space: pre-wrap;">${commoditiesForResponse.join('\n')}</div>`);
});

app.get('/CommodityType/histogram', async (req: Request, res: Response) => {
  const commodities = await prisma.$queryRawTyped(getCommodityTypeHistogram())
  const commoditiesForResponse = commodities.map(c => `${c.commodity_type}: ${c.count}`);
  res.send(`<div style="white-space: pre-wrap;">${commoditiesForResponse.join('\n')}</div>`);
});

app.get('/Units/histogram', async (req: Request, res: Response) => {
  const commodities = await prisma.$queryRawTyped(getUnitsHistogram())
  const commoditiesForResponse = commodities.map(c => `${c.units}: ${c.count}`);
  res.send(`<div style="white-space: pre-wrap;">${commoditiesForResponse.join('\n')}</div>`);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
