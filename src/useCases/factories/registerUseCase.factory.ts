import { PrismaOrgsRepository } from "@/repositories/prisma/prismaOrgs.repository";
import { RegisterUseCase } from "../register.useCase";

export function registerUseCaseFactory() {
  const orgsRepository = new PrismaOrgsRepository();

  return new RegisterUseCase(orgsRepository);
}
