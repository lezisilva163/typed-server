import { HashPasswordUtil } from "@/utils/hashPassword";
import { JWTUtil } from "@/utils/JWT";
import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const prisma = new PrismaClient();

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type User = z.infer<typeof userSchema>;

class UserController {
  public async login(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<string | { message: string }> {
    try {
      const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      });

      const { email, password } = loginSchema.parse(request.body);

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return reply.status(404).send({ message: "Credenciais inválidas." });
      }

      const isPasswordValid = await HashPasswordUtil.verifyPassword(
        password,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error("Credenciais inválidas.");
      }

      return reply.status(200).send(JWTUtil.generateToken(user));
    } catch (error) {
      return reply
        .status(500)
        .send({ message: `Internal server error: ${error}` });
    }
  }

  public async create(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<User | { message: string }> {
    try {
      const createUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      });

      const { name, email, password } = createUserSchema.parse(request.body);

      // adicionar validação de email único
      const hashedPassword = await HashPasswordUtil.hashPassword(password);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return reply.status(201).send(user);
    } catch (error) {
      return reply
        .status(500)
        .send({ message: `Internal server error: ${error}` });
    }
  }
}

export default new UserController();
