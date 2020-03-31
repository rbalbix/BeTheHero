const request = require('supertest');
const faker = require('faker/locale/pt_BR');

const app = require('../../src/app');
const db = require('../../src/database/connection');

// Categoria dos testes
describe('Sessions', () => {
  beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should not find a ong session', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ id: '1' });

    expect(response.status).toBe(400);
  });

  it('should find a ong session', async () => {
    const ong = {
      name: faker.company.bsNoun(),
      email: faker.internet.email(),
      whatsapp: faker.phone.phoneNumberFormat(2).replace(/[() -]/g, ''),
      city: faker.address.city(),
      uf: faker.address.stateAbbr()
    };

    const ongResponse = await request(app)
      .post('/ongs')
      .send(ong);

    const { id } = ongResponse.body;

    const response = await request(app)
      .post('/sessions')
      .send({ id });

    expect(response.status).toBe(200);
  });
});
