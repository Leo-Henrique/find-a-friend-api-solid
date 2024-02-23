import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository";
import { RegisterUseCase } from "../register.use-case";

export function registerUseCaseFactory() {
  const orgsRepository = new PrismaOrgsRepository();

  return new RegisterUseCase(orgsRepository);
}
