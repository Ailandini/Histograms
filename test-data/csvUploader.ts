import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const filePath = path.resolve(__dirname, './Projection2021.csv');
console.log('File path:', filePath);

async function parseCSVAndInsertData() {
  const results: any[] = [];

  fs.createReadStream(filePath)
    .pipe(csvParser({ }))
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        for (const row of results) {
          await prisma.commodity.create({
            data: {
              attribute: row['Attribute'],
              commodity: row.Commodity,
              commodity_type: row.CommodityType,
              units: row.Units,
              year_type: row.YearType,
              year: row.Year,
              value: parseFloat(row.Value),
            },
          });
        }
        console.log('Data inserted successfully');
      } catch (error) {
        console.error('Error inserting data:', error);
      } finally {
        await prisma.$disconnect();
      }
    });
}

parseCSVAndInsertData();
