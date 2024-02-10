import { Org } from "@/entities/org";
import { OrgsRepository } from "@/repositories/orgs.repository";
import { serializeUser } from "@/utils/serializeUser";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/orgAlreadyExists.error";

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

    if (orgWithSameEmail) throw new OrgAlreadyExistsError();

    const org = await this.orgsRepository.create({
      email,
      passwordHash: await hash(password, 6),
      ...rest,
    });

    return { org: serializeUser(org) };
  }
}
