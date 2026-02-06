import { z } from 'zod';

const idParam = z.object({
  id: z.coerce.number().int().positive(),
});

export const listUsersSchema = z.object({
  query: z.object({}).optional(),
});

export const getUserSchema = z.object({
  params: idParam,
});

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
  }),
});

export const updateUserSchema = z.object({
  params: idParam,
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
  }),
});

export const deleteUserSchema = z.object({
  params: idParam,
});
