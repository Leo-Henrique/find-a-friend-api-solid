import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository";
import { AuthenticateUseCase } from "../use-cases/org/authenticate.use-case";
import { GetOrgProfileUseCase } from "../use-cases/org/get-org-profile.use-case";
import { RegisterUseCase } from "../use-cases/org/register.use-case";

const orgsRepository = new PrismaOrgsRepository();

export function makeRegisterUseCase() {
  return new RegisterUseCase(orgsRepository);
}

export function makeAuthenticateUseCase() {
  return new AuthenticateUseCase(orgsRepository);
}

export function makeGetOrgProfileUseCase() {
  return new GetOrgProfileUseCase(orgsRepository);
}
