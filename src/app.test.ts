import request from 'supertest';
import app, { histogramHeaders } from './app';
import { Server } from 'http';
import csvParser from 'csv-parser';
import fs from 'fs';

type ColumnHistogram = {
  [key: string]: number;
}

describe('Commodities API', () => {
  let server: Server;
  beforeAll(() => {
    server = app.listen();
  });
  
  afterAll((done) => {
    server.close(done);
  });

  it.each(histogramHeaders)('should have a get endpoint for %s', async (header) => {
    const expectedHistogram = await getColumnHistogram(header);
    const res = await request(app).get(`/${header}/histogram`);

    expect(res.status).toBe(200);
    expectedHistogram.forEach((valueCount) => {
      expect(res.text).toContain(valueCount)
    })
  });

  async function getColumnHistogram(column: string) {
    const columnValues: ColumnHistogram = {}
    
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream('test-data/Projection2021.csv')
      .pipe(csvParser())
      .on('data', (row) => {
        const value = row[column]
        if (!columnValues[value]) {
          columnValues[value] = 1;
          return;
        }
        columnValues[value]++;
      })
      .on('end', resolve)
      .on('error', reject);
    });

    return Object.keys(columnValues).sort().map(key => {
      return `${key}: ${columnValues[key]}`
    });
  }
});
