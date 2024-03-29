import { serializeUser } from "@/application/adapters/serialize-user";
import { Org } from "@/application/entities/org.entity";
import { ResourceAlreadyExistsError } from "@/application/errors/use-case-errors";
import { OrgsRepository } from "@/repositories/orgs.repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  tel: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  addressNumber: number;
}

interface RegisterUseCaseResponse {
  org: Omit<Org, "passwordHash">;
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
    ...rest
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) throw new ResourceAlreadyExistsError("Organization");

    const org = await this.orgsRepository.create({
      email,
      passwordHash: await hash(password, 6),
      ...rest,
    });

    return { org: serializeUser(org) };
  }
}
