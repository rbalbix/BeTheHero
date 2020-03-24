const request = require('supertest');

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
    // const dev = await factory.build('Dev', {
    //   github_username: 'rbalbix',
    //   technologies: 'React, Node, React Native'
    // });

    const ong = {
      name: 'APAD',
      email: 'conntato@apad.com',
      whatsapp: '21000000000',
      city: 'Niterói',
      uf: 'RJ'
    };

    const response = await request(app)
      .post('/ongs')
      .send(ong);

    const { id } = response.body;

    const search = await db('ongs')
      .select('id')
      .where({
        id
      });

    expect(response.status).toBe(200);
    expect(id).toBe(search[0].id);
  });

  // it('should not create an existent Dev', async () => {
  //   const dev = {
  //     github_username: 'rbalbix',
  //     techs: 'React, Node, React Native',
  //     latitude: -22.8945253,
  //     longitude: -43.1843926
  //   };

  //   const response = await request(app)
  //     .post('/devs')
  //     .send(dev);

  //   const duplicate = await request(app)
  //     .post('/devs')
  //     .send(dev);

  //   expect(response.status).toBe(200);
  //   expect(response.body._id).toBe(duplicate.body._id);
  // });

  // it('should return a Dev', async () => {
  //   const dev = {
  //     github_username: 'rbalbix',
  //     techs: 'React, Node, React Native',
  //     latitude: -22.8945253,
  //     longitude: -43.1843926
  //   };

  //   await request(app)
  //     .post('/devs')
  //     .send(dev);

  //   const response = await request(app).get('/devs');

  //   expect(response.status).toBe(200);
  //   expect(response.body[0]).toHaveProperty('name');
  //   expect(response.body[0]).toHaveProperty('github_username');
  //   expect(response.body[0]).toHaveProperty('bio');
  //   expect(response.body[0]).toHaveProperty('avatar_url');
  //   expect(response.body[0]).toHaveProperty('techs');
  //   expect(response.body[0]).toHaveProperty('location');
  // });
});
