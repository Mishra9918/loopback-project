import 'dotenv/config';
import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';
import db from '../src/config/db.js';

async function resetDb() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
  await db.query('TRUNCATE TABLE users RESTART IDENTITY');
}

test('users CRUD', async (t) => {
  await resetDb();

  const createRes = await request(app)
    .post('/api/users')
    .send({ name: 'Alice', email: 'alice@example.com' });
  assert.equal(createRes.status, 201);
  assert.equal(createRes.body.id, 1);

  const listRes = await request(app).get('/api/users');
  assert.equal(listRes.status, 200);
  assert.equal(listRes.body.length, 1);

  const getRes = await request(app).get('/api/users/1');
  assert.equal(getRes.status, 200);
  assert.equal(getRes.body.email, 'alice@example.com');

  const updateRes = await request(app)
    .put('/api/users/1')
    .send({ name: 'Alice Smith', email: 'alice.smith@example.com' });
  assert.equal(updateRes.status, 200);
  assert.equal(updateRes.body.name, 'Alice Smith');

  const deleteRes = await request(app).delete('/api/users/1');
  assert.equal(deleteRes.status, 204);

  const emptyRes = await request(app).get('/api/users');
  assert.equal(emptyRes.body.length, 0);
});

test('cleanup', async () => {
  await db.end();
});
