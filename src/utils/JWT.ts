import jwt from "jsonwebtoken";

const JWT_SECRET = String(process.env.JWT_SECRET);
const JWT_EXPIRES_IN = "6h"; // Tempo de expiração do token

export class JWTUtil {
  /**
   * Gera um token JWT para autenticar o usuário.
   */
  static generateToken(entity: object): string {
    return jwt.sign({ user: JSON.stringify(entity) }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  }

  /**
   * Verifica a validade de um token JWT e retorna os dados decodificados.
   */
  static verifyToken(token: string): { user: string } | null {
    try {
      return jwt.verify(token, JWT_SECRET) as { user: string };
    } catch (err) {
      return null;
    }
  }
}
