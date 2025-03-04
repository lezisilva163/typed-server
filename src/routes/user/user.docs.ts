import z from "zod";

export const createUserDoc = {
  schema: {
    tags: ["users"],
    description: "Create a new user",
    operationId: "createUser",
    body: z.object({ name: z.string() }),
    response: {
      201: z.object({ id: z.string(), name: z.string() }),
    },
  },
};

export const getUsersDoc = {
  schema: {
    tags: ["users"],
    description: "Get all users",
    operationId: "getUsers",
    response: {
      200: z.array(z.object({ id: z.string(), name: z.string() })),
    },
  },
};

export const getUserByIdDoc = {
  schema: {
    tags: ["users"],
    description: "Get user by id",
    operationId: "getUserById",
    params: z.object({ id: z.string() }),
    response: {
      200: z.object({ id: z.string(), name: z.string() }),
      404: z.object({ message: z.string() }),
    },
  },
};

export const deleteUserByIdDoc = {
  schema: {
    tags: ["users"],
    description: "Delete user by id",
    operationId: "deleteUserById",
    params: z.object({ id: z.string() }),
    response: {
      200: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
  },
};
