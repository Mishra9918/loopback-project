import {
  createUser,
  deleteUser,
  getUserById,
  listUsers,
  updateUser,
} from './user.service.js';

export async function getUsers(req, res, next) {
  try {
    const users = await listUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const { id } = req.validated.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: { message: 'User not found' } });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function createUserHandler(req, res, next) {
  try {
    const { name, email } = req.validated.body;
    const user = await createUser({ name, email });
    res.status(201).json(user);
  } catch (err) {
    if (err.code === '23505') {
      err.status = 409;
      err.message = 'Email already exists';
    }
    next(err);
  }
}

export async function updateUserHandler(req, res, next) {
  try {
    const { id } = req.validated.params;
    const { name, email } = req.validated.body;
    const user = await updateUser(id, { name, email });
    if (!user) {
      return res.status(404).json({ error: { message: 'User not found' } });
    }
    res.json(user);
  } catch (err) {
    if (err.code === '23505') {
      err.status = 409;
      err.message = 'Email already exists';
    }
    next(err);
  }
}

export async function deleteUserHandler(req, res, next) {
  try {
    const { id } = req.validated.params;
    const deleted = await deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ error: { message: 'User not found' } });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
