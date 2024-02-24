import { ResourceNotFoundError } from "@/application/errors";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { randomUUID } from "crypto";
import { orgPasswordHashSpec, orgSpec } from "test/entities";
import { beforeEach, describe, expect, it } from "vitest";
import { GetOrgProfileUseCase } from "./get-org-profile.use-case";

let orgsRepository: InMemoryOrgsRepository;
let sut: GetOrgProfileUseCase;

let orgId: string;

describe("Get org profile Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new GetOrgProfileUseCase(orgsRepository);

    const org = await orgsRepository.create({
      ...orgSpec,
      passwordHash: orgPasswordHashSpec,
    });

    orgId = org.id;
  });

  it("should be able get the org profile", async () => {
    const { org } = await sut.execute({ orgId });

    expect(org.id).toEqual(orgId);
  });

  it("should not be able to get the profile of a non existing org", async () => {
    const getOrg = sut.execute({ orgId: randomUUID() });

    await expect(getOrg).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
