import { Org } from "@/entities/org";
import { OrgsRepository } from "@/repositories/orgs.repository";
import { serializeUser } from "@/utils/serializeUser";
import { ResourceNotFoundError } from "./errors/resourceNotFound.error";

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
