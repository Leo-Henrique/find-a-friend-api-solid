import { Org } from "@/entities/org.entity";
import { OrgsRepository } from "@/repositories/orgs.repository";
import { serializeUser } from "@/utils/serialize-user";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials.error";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  org: Omit<Org, "passwordHash">;
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) throw new InvalidCredentialsError();

    const isValidPassword = await compare(password, org.passwordHash);

    if (!isValidPassword) throw new InvalidCredentialsError();

    return { org: serializeUser(org) };
  }
}
