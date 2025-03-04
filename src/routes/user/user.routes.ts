import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
} from "@/http/controllers/user.controller";

import {
  createUserDoc,
  getUsersDoc,
  getUserByIdDoc,
  deleteUserByIdDoc,
} from "./user.docs";

export const userRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post("/users", createUserDoc, createUser);

  app.get("/users", getUsersDoc, getUsers);

  app.get("/users/:id", getUserByIdDoc, getUserById);

  app.delete("/users/:id", deleteUserByIdDoc, deleteUserById);
};
