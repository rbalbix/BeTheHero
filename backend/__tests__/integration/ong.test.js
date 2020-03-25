const request = require('supertest');
const faker = require('faker/locale/pt_BR');

const app = require('../../src/app');
const db = require('../../src/database/connection');
// const db = require('../../src/database');
// const factory = require('../factories');

// Categoria dos testes
describe('Ongs', () => {
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

  it('should find a /ongs (GET) route', async () => {
    const response = await request(app).get('/ongs');

    expect(response.status).toBe(200);
  });

  it('should create a Ong /ongs (POST)', async () => {
    const ong = {
      name: faker.company.bsNoun(),
      email: faker.internet.email(),
      whatsapp: faker.phone.phoneNumberFormat(2).replace(/[() -]/g, ''),
      city: faker.address.city(),
      uf: faker.address.stateAbbr()
    };

    const response = await request(app)
      .post('/ongs')
      .send(ong);

    const { id } = response.body;

    const search = await db('ongs').where({
      id
    });

    expect(response.status).toBe(200);
    expect(id).toBe(search[0].id);

    expect(search[0]).toHaveProperty('name');
    expect(search[0]).toHaveProperty('email');
    expect(search[0]).toHaveProperty('whatsapp');
    expect(search[0]).toHaveProperty('city');
    expect(search[0]).toHaveProperty('uf');
  });
});
