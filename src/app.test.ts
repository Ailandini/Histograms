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

  it('should retrieve commodities', async () => {
    const res = await request(app).get('/commodities');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
