import { PrismaOrgsRepository } from "@/repositories/prisma/prismaOrgs.repository";
import { AuthenticateUseCase } from "../authenticate.useCase";

export function authenticateUseCaseFactory() {
  const orgsRepository = new PrismaOrgsRepository();

  return new AuthenticateUseCase(orgsRepository);
}
