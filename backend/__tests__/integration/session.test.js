const request = require('supertest');
const faker = require('faker/locale/pt_BR');

const app = require('../../src/app');
const db = require('../../src/database/connection');
// const db = require('../../src/database');
// const factory = require('../factories');

// Categoria dos testes
describe('Sessions', () => {
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

  it('should not find a ong session', async () => {
    const ongs = await request(app).get('/ongs');

    const response = await request(app)
      .post('/sessions')
      .send({ id: '1' });

    expect(response.status).toBe(400);
  });

  it('should find a ong session', async () => {
    const ongs = await request(app).get('/ongs');

    const response = await request(app)
      .post('/sessions')
      .send({ id: ongs.body[0].id });

    expect(response.status).toBe(200);
  });
});
