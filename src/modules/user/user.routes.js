import { Router } from 'express';
import validate from '../../middlewares/validate.middleware.js';
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  listUsersSchema,
  updateUserSchema,
} from './user.validation.js';      
import {
  createUserHandler,
  deleteUserHandler,
  getUser,
  getUsers,
  updateUserHandler,
} from './user.controller.js';

const router = Router();

router.get('/', validate(listUsersSchema), getUsers);
router.get('/:id', validate(getUserSchema), getUser);
router.post('/', validate(createUserSchema), createUserHandler);
router.put('/:id', validate(updateUserSchema), updateUserHandler);
router.delete('/:id', validate(deleteUserSchema), deleteUserHandler);

export default router;
