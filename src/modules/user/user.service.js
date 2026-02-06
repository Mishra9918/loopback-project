import db from '../../config/db.js';

export async function listUsers() {
  const { rows } = await db.query(
    'SELECT id, name, email, created_at FROM users ORDER BY id ASC'
  );
  return rows;
}

export async function getUserById(id) {
  const { rows } = await db.query(
    'SELECT id, name, email, created_at FROM users WHERE id = $1',
    [id]
  );
  return rows[0] || null;
}

export async function createUser({ name, email }) {
  const { rows } = await db.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, created_at',
    [name, email]
  );
  return rows[0];
}

export async function updateUser(id, { name, email }) {
  const { rows } = await db.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, created_at',
    [name, email, id]
  );
  return rows[0] || null;
}

export async function deleteUser(id) {
  const { rows } = await db.query(
    'DELETE FROM users WHERE id = $1 RETURNING id',
    [id]
  );
  return rows[0] || null;
}
