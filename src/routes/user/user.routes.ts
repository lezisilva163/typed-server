import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { createUserDoc, loginUserDoc } from "./user.docs";

import UserController from "@/modules/user/user.controller";
// import authenticationMiddleware from "@/utils/middlewares/authMiddleware";

export const userRoutes: FastifyPluginAsyncZod = async (app) => {
  // app.addHook("onRequest", authenticationMiddleware);

  app.post("/register", createUserDoc, UserController.create);
  app.post("/login", loginUserDoc, UserController.login);
};
