import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository";
import { GetOrgProfileUseCase } from "../get-org-profile.use-case";

export function getOrgProfileUseCaseFactory() {
  const orgsRepository = new PrismaOrgsRepository();

  return new GetOrgProfileUseCase(orgsRepository);
}
