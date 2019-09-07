const request = require('supertest');
const assert = require('assert');
const app = require('../src/index');

describe('Server', () => {
  const demoUser = {
    name: 'Demo', email: 'demo@gmail.com'
  };

  let id;

  it('Returns 200 to /', async (done) => {
    await request(app).get('/').expect(200);
    done();
  });

  it('Inserts a user', async (done) => {
    const res = await request(app).post('/user')
      .send(demoUser)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.email).toEqual(demoUser.email);

    id = res.body.id;
    
    done();
  });

  it('Retrieves a list of users', async (done) => {
    const res = await request(app).get('/user')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toEqual(
      expect.arrayContaining([{ id, avatar: null, ...demoUser }])
    );

    done();
  });

  it('Updates a user', async (done) => {
    const res = await request(app).post(`/user/${id}`)
      .send({
        ...demoUser, 
        name: 'New Name',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.name).toEqual('New Name');
    
    done();
  });

  afterAll((done) => {
    app.close(done);
  });
});