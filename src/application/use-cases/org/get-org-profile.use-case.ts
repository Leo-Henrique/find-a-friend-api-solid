import { Org } from "@/application/entities/org.entity";
import { OrgsRepository } from "@/repositories/orgs.repository";
import { serializeUser } from "@/utils/serialize-user";
import { ResourceNotFoundError } from "../../errors/resource-not-found.error";

interface GetOrgProfileUseCaseRequest {
  orgId: string;
}

interface GetOrgProfileUseCaseResponse {
  org: Omit<Org, "passwordHash">;
}

export class GetOrgProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgProfileUseCaseRequest): Promise<GetOrgProfileUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) throw new ResourceNotFoundError("org");

    return { org: serializeUser(org) };
  }
}
