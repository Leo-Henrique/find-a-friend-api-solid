import { Org } from "@/application/entities/org.entity";
import { ResourceNotFoundError } from "@/application/errors";
import { OrgsRepository } from "@/repositories/orgs.repository";
import { serializeUser } from "@/utils/serialize-user";

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

    if (!org) throw new ResourceNotFoundError("Org");

    return { org: serializeUser(org) };
  }
}
