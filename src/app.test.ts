import request from 'supertest';
import app from './app';
import { Server } from 'http';

describe('Commodities API', () => {
  let server: Server;
  beforeAll(() => {
    server = app.listen();
  });
  
  afterAll((done) => {
    server.close(done);
  });

  it('should have get to retrieve unique Commodity', async () => {
    const res = await request(app).get('/Commodity/histogram');
    expect(res.status).toBe(200);
    expect(res.text).toBe(`<div>Rice, Beans</div>`);
  });
});
