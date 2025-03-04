import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const prisma = new PrismaClient();

export async function createUser(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<{ name: string; id: string }> {
  try {
    const bodySchema = z.object({
      name: z.string(),
    });

    const { name } = bodySchema.parse(request.body);

    const user = await prisma.user.create({
      data: {
        name,
      },
    });

    return reply.status(201).send(user);
  } catch (error) {
    return reply
      .status(500)
      .send({ message: `Internal server error: ${error}` });
  }
}

export async function getUsers(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<{ id: string; name: string }[]> {
  try {
    const users = await prisma.user.findMany();

    return reply.status(200).send(users);
  } catch (error) {
    return reply
      .status(500)
      .send({ message: `Internal server error: ${error}` });
  }
}

export async function getUserById(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<{ id: string; name: string } | { message: string }> {
  try {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return reply.status(404).send({ message: "User not found" });
    }

    return reply.status(200).send(user);
  } catch (error) {
    return reply
      .status(500)
      .send({ message: `Internal server error: ${error}` });
  }
}

export async function deleteUserById(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<{ message: string }> {
  try {
    console.log(request.params);
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    console.log(user);

    if (!user) {
      return reply.status(404).send({ message: "User not found" });
    }

    return reply.status(200).send({ message: "User deleted" });
  } catch (error) {
    return reply
      .status(500)
      .send({ message: `Internal server error: ${error}` });
  }
}
