import request from 'supertest';
import app from './app';
import { Server } from 'http';
import csvParser from 'csv-parser';
import fs from 'fs';

describe('Commodities API', () => {
  let server: Server;
  beforeAll(() => {
    server = app.listen();
  });
  
  afterAll((done) => {
    server.close(done);
  });

  it('should have get to retrieve unique Commodity', async () => {
    const columnValues = await getColumnValues('Commodity');
    const distinctColumnValues = [...new Set(columnValues)];
    const res = await request(app).get('/Commodity/histogram');
    expect(res.status).toBe(200);
    expect(res.text).toBe(`<div>${distinctColumnValues.join(',')}</div>`);
  });

  async function getColumnValues(column: string) {
    const columnValues: string[] = []
    
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream('test-data/Projection2021.csv')
      .pipe(csvParser())
      .on('data', (row) => {
        columnValues.push(row[column])
      })
      .on('end', resolve)
      .on('error', reject);
    });

    return columnValues;
  }
});
