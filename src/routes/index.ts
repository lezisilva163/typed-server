import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { userRoutes } from "./user/user.routes";

export const routes: FastifyPluginAsyncZod = async (app) => {
  app.register(userRoutes);
};
