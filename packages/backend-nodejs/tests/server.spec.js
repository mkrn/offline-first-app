const request = require('supertest');
const { v4: uuid } = require('uuid');
const app = require('../src/index');

describe('Server', () => {
  const demoUser = {
    id: uuid(),
    name: 'Demo', 
    email: 'demo@gmail.com'
  };

  let userAsInserted;

  it('Returns 200 to /', async (done) => {
    await request(app).get('/').expect(200);
    done();
  });


  it('Inserts a user', async (done) => {
    const res = await request(app).post('/user')
      .send(demoUser)
      .expect('Content-Type', /json/)
      .expect(200);

      userAsInserted = res.body;

    expect(userAsInserted.email).toEqual(demoUser.email);
    expect(userAsInserted.version).toEqual(1);
    
    done();
  });

  it('Retrieves a list of users', async (done) => {
    const res = await request(app).get('/user')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toEqual(
      expect.arrayContaining([{ avatar: null, version: 1, ...demoUser }])
    );

    done();
  });

  it('Updates a user', async (done) => {
    const res = await request(app).post(`/user/${demoUser.id}`)
      .send({
        ...userAsInserted, 
        name: 'New Name',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.name).toEqual('New Name');
    
    done();
  });

  it('Rejects update from a stale version', async (done) => {
    const res = await request(app).post(`/user/${demoUser.id}`)
      .send({
        ...userAsInserted, 
        name: 'New Name 2',
      })
      .expect('Content-Type', /json/)
      .expect(500);
    
    done();
  });

  afterAll((done) => {
    app.close(done);
  });
});