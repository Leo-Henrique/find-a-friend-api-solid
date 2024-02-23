import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository";
import { AuthenticateUseCase } from "../authenticate.use-case";

export function authenticateUseCaseFactory() {
  const orgsRepository = new PrismaOrgsRepository();

  return new AuthenticateUseCase(orgsRepository);
}
