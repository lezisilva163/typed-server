import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

export class HashPasswordUtil {
  static async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString("hex");
    const iterations = 10000;
    const keylen = 64;
    const digest = "sha512";

    const hash = pbkdf2Sync(
      password,
      salt,
      iterations,
      keylen,
      digest
    ).toString("hex");
    return `${iterations}:${salt}:${hash}`;
  }

  /**
   * Verifica se a senha fornecida corresponde ao hash salvo no banco.
   */
  static async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const [iterations, salt, originalHash] = hashedPassword.split(":");
    const keylen = 64;
    const digest = "sha512";

    const hash = pbkdf2Sync(
      password,
      salt,
      parseInt(iterations),
      keylen,
      digest
    ).toString("hex");
    return timingSafeEqual(
      Buffer.from(hash, "hex"),
      Buffer.from(originalHash, "hex")
    );
  }
}
