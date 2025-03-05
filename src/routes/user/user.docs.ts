import z from "zod";

export const createUserDoc = {
  schema: {
    tags: ["authentications"],
    description: "Create a new user",
    operationId: "createUser",
    body: z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    }),
    response: {
      201: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        password: z.string(),
      }),
      500: z.object({ message: z.string() }),
    },
  },
};

export const loginUserDoc = {
  schema: {
    tags: ["authentications"],
    description: "Login user",
    operationId: "loginUser",
    body: z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }),
    response: {
      200: z.string(),
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
};
