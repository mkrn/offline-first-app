const express = require('express');
const Promise = require('bluebird');
const sqlite = require('sqlite');
const cors = require('cors');
const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.json());

const port = process.env.PORT || 4000;

const dbPromise = Promise.resolve()
  .then(() => sqlite.open('./database.sqlite', { Promise }))
  .then(db => db.migrate({ 
    migrationsPath: './migrations',
    // force: 'last' 
  }));


app.get('/user', async (req, res, next) => {
  try {
    const db = await dbPromise;
    const users = await db.all('SELECT * FROM Users');
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

app.post('/user', async (req, res, next) => {
  try {
    const db = await dbPromise;
    await db.run('INSERT INTO Users (id, name, email, avatar) VALUES (?, ?, ?, ?)', [
      req.body.id,
      req.body.name,
      req.body.email,
      req.body.avatar
    ]);

    const user = await db.get('SELECT * FROM Users WHERE id = ?', [req.body.id]);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

app.get('/user/:id', async (req, res, next) => {
  try {
    const db = await dbPromise;
    const user = await db.get('SELECT * FROM Users WHERE id = ?', req.params.id);
    if (!user) throw new Error('User not Found');
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/user/:id', async (req, res, next) => {
  try {
    const db = await dbPromise;

    const { stmt } = await db.run('UPDATE Users SET name = ?, email = ?, avatar = ?, version = version + 1 WHERE id = ? AND version = ?', [
      req.body.name,
      req.body.email,
      req.body.avatar,
      req.params.id,
      parseInt(req.body.version)
    ]);

    if (!stmt.changes) {
      throw new Error('Could not update user. Your version may be stale or user does no longer exist');
    }

    // Return the user with this id and updated version
    const user = await db.get('SELECT * FROM Users WHERE id = ?', [
      req.params.id
    ]);

    if (!user) throw new Error('Could not find updated user');
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

app.get('/', (req, res, next) => {
  res.json({ 'status': 'ok' })
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ status: 'error', message: err.message });
})

app.use((req, res) => {
    res.status(404);
});

const server = app.listen(port);

module.exports = server;
