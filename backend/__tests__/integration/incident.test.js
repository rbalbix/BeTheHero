const request = require('supertest');
const faker = require('faker/locale/pt_BR');

const app = require('../../src/app');
const db = require('../../src/database/connection');
// const db = require('../../src/database');
// const factory = require('../factories');

// Categoria dos testes
describe('Incidents', () => {
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

  it('should find a /incidents (GET) route', async () => {
    const response = await request(app).get('/incidents');

    expect(response.status).toBe(200);
  });

  it('should create an Incident /incidents (POST)', async () => {
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

    const search = await db('incidents').where({
      id: incId
    });

    expect(incResponse.status).toBe(200);
    expect(incResponse.body.id).toBe(search[0].id);

    expect(search[0]).toHaveProperty('title');
    expect(search[0]).toHaveProperty('description');
    expect(search[0]).toHaveProperty('value');
    expect(search[0]).toHaveProperty('ong_id');
  });

  it('should not allow to delete an incident', async () => {
    const ongs = await request(app).get('/ongs');

    const incidents = await request(app).get('/incidents');

    const ong_id = ongs.body[1].id;
    const incident_id = incidents.body[0].id;

    const response = await request(app)
      .delete(`/incidents/${incident_id}`)
      .set({ Authorization: ong_id });

    expect(response.status).toBe(401);
  });

  it('should allow to delete an incident', async () => {
    const incidents = await request(app).get('/incidents');

    const ong_id = incidents.body[0].ong_id;
    const incident_id = incidents.body[0].id;

    const response = await request(app)
      .delete(`/incidents/${incident_id}`)
      .set({ Authorization: ong_id });

    // No content status
    expect(response.status).toBe(204);
  });
});
