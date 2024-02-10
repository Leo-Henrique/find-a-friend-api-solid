import { PrismaOrgsRepository } from "@/repositories/prisma/prismaOrgs.repository";
import { GetOrgProfileUseCase } from "../getOrgProfile.useCase";

export function getOrgProfileUseCaseFactory() {
  const orgsRepository = new PrismaOrgsRepository();

  return new GetOrgProfileUseCase(orgsRepository);
}
