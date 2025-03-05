import { FastifyRequest, FastifyReply } from "fastify";
import { JWTUtil } from "../JWT";

async function authenticationMiddleware(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const token = req.headers.authorization;

  if (!token) {
    reply.status(403).send({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = JWTUtil.verifyToken(token);

    if (!decoded) {
      reply.status(401).send({ message: "Token inválido ou expirado." });
      return;
    }

    if (decoded) {
      req.headers["x-user-id"] = JSON.parse(decoded.user)?.id || null;
    }

    // Continue para o próximo middleware ou rota
  } catch (error) {
    reply.status(401).send({ message: "Invalid token." });
  }
}

export default authenticationMiddleware;
