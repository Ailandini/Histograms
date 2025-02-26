import request from 'supertest';
import app from './app';
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

  it('should have get to retrieve Commodity histogram', async () => {
    const columnValues = await getColumnHistogram('Commodity');
    const expectedHistogram = Object.keys(columnValues).sort().map(key => {
      return `${key}: ${columnValues[key]}`
    })
    const res = await request(app).get('/Commodity/histogram');
    expect(res.status).toBe(200);
    expect(res.text).toBe(`<div style="white-space: pre-wrap;">${expectedHistogram.join('\n')}</div>`);
  });

    it('should have get to retrieve CommodityType histogram', async () => {
    const columnValues = await getColumnHistogram('CommodityType');
    const expectedHistogram = Object.keys(columnValues).sort().map(key => {
      return `${key}: ${columnValues[key]}`
    })
    const res = await request(app).get('/CommodityType/histogram');
    expect(res.status).toBe(200);
    expect(res.text).toBe(`<div style="white-space: pre-wrap;">${expectedHistogram.join('\n')}</div>`);
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

    return columnValues;
  }
});
