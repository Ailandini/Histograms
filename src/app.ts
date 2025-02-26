import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getCommodityHistogram, getCommodityTypeHistogram, getUnitsHistogram } from '@prisma/client/sql'
const PORT = process.env.PORT || 8000;

const app = express();
const prisma = new PrismaClient();

interface DynamicRow {
  [key: string]: any;
}

type CommoditiesHeader = 'commodity' | 'commodity_type' | 'units' | 'year_type' | 'year'
export const histogramHeaders = ['Commodity', 'CommodityType', 'Units', 'YearType', 'Year']

const result = async (column: CommoditiesHeader) => await prisma.$queryRawUnsafe(
  `SELECT ${column}, count(*) as "count" from "Commodity"
  GROUP BY ${column}
  ORDER BY ${column}`
) as DynamicRow[];


app.use(express.json());


histogramHeaders.forEach(header => {
  app.get(`/${header}/histogram`, async (req: Request, res: Response) => {
    const dbHeader = camelToSnakeCaseRobust(header)
    const commodities = await result(dbHeader as CommoditiesHeader);
    const commoditiesForResponse = commodities.map(c => `${c[dbHeader]}: ${c.count}`);
    res.send(`<div style="white-space: pre-wrap;">${commoditiesForResponse.join('\n')}</div>`);
  });
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

function camelToSnakeCaseRobust(str: string): string {
  return str
    .replace(/([A-Z])([A-Z])/g, '$1_$2') // Handle consecutive uppercase letters
    .replace(/([a-z])([A-Z])/g, '$1_$2') // Handle camel case transitions
    .toLowerCase(); // Convert to lowercase
}

export default app;
