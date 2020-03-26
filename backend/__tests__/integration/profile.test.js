const request = require('supertest');
const faker = require('faker/locale/pt_BR');

const app = require('../../src/app');
const db = require('../../src/database/connection');
// const db = require('../../src/database');
// const factory = require('../factories');

// Categoria dos testes
describe('Profiles', () => {
  // beforeAll(async done => {
  //   db.connect();
  //   await db.truncate();
  //   db.disconnect(done);
  // });

  // beforeEach(() => {
  //   db.connect();
  // });

  // afterEach(done => {
  //   db.disconnect(done);
  // });

  it('should find a /profile (GET) route', async () => {
    const ongs = await request(app).get('/ongs');

    const response = await request(app)
      .get('/profile')
      .set({ Authorization: ongs.body[0].id });

    expect(response.status).toBe(200);
  });

  it('should create list specific incidents', async () => {
    const incidents = await request(app).get('/incidents');

    const response = await request(app)
      .get('/profile')
      .set({ Authorization: incidents.body[0].ong_id });

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
