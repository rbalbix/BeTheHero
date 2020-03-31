const request = require('supertest');
const faker = require('faker/locale/pt_BR');

const app = require('../../src/app');
const db = require('../../src/database/connection');

// Categoria dos testes
describe('Profiles', () => {
  beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should find a /profile (GET) route', async () => {
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
      .get('/profile')
      .set({ Authorization: id });

    expect(response.status).toBe(200);
  });

  it('should create list specific incidents', async () => {
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

    // Create an incident
    const incident = {
      title: faker.lorem.slug(),
      description: faker.lorem.sentence(),
      value: faker.random.number(),
      ong_id: id
    };

    const incResponse = await request(app)
      .post('/incidents')
      .send(incident)
      .set({ Authorization: id });

    const incId = incResponse.body.id;

    const response = await request(app)
      .get('/profile')
      .set({ Authorization: id });

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
