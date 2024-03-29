import { ResourceNotFoundError } from "@/application/errors/use-case-errors";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets.repository";
import { randomUUID } from "crypto";
import { orgPasswordHashTest, orgTest, petUseCaseTest } from "test/entities";
import { beforeEach, describe, expect, it } from "vitest";
import { GetPetProfileUseCase } from "./get-pet-profile.use-case";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: GetPetProfileUseCase;

let orgId: string;
let petId: string;

describe("Get pet profile Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetProfileUseCase(orgsRepository, petsRepository);

    const org = await orgsRepository.create({
      ...orgTest,
      passwordHash: orgPasswordHashTest,
    });

    const createdPet = await petsRepository.create({
      ...petUseCaseTest,
      orgId: org.id,
    });

    orgId = org.id;
    petId = createdPet.id;
  });

  it("should be able get the pet profile", async () => {
    const { pet, org } = await sut.execute({ petId });

    expect(pet.id).toEqual(petId);
    expect(org.id).toEqual(orgId);
  });

  it("should not be able to get the profile of a non existing pet", async () => {
    const getPet = sut.execute({ petId: randomUUID() });

    await expect(getPet).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to get pet profile if the responsible org does not exist", async () => {
    const createdPet = await petsRepository.create({
      ...petUseCaseTest,
      orgId: randomUUID(),
    });

    const getPet = sut.execute({ petId: createdPet.id });

    await expect(getPet).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
