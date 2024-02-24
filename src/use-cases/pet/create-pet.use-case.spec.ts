import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { InMemoryPetPhotosRepository } from "@/repositories/in-memory/in-memory-pet-photos.repository";
import { InMemoryPetRequirementsRepository } from "@/repositories/in-memory/in-memory-pet-requirements.repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets.repository";
import { randomUUID } from "crypto";
import { orgPasswordHashSpec, orgSpec, petUseCaseSpec } from "test/entities";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";
import { CreatePetUseCase } from "./create-pet.use-case";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let petRequirementsRepository: InMemoryPetRequirementsRepository;
let petPhotosRepository: InMemoryPetPhotosRepository;
let sut: CreatePetUseCase;

let orgId: string;

describe("Create Pet Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    petRequirementsRepository = new InMemoryPetRequirementsRepository();
    petPhotosRepository = new InMemoryPetPhotosRepository();

    sut = new CreatePetUseCase(
      orgsRepository,
      petsRepository,
      petRequirementsRepository,
      petPhotosRepository,
    );

    const org = await orgsRepository.create({
      ...orgSpec,
      passwordHash: orgPasswordHashSpec,
    });

    orgId = org.id;
  });

  it("should be able to register a pet as an org", async () => {
    const { pet: registeredPet } = await sut.execute({
      ...petUseCaseSpec,
      orgId,
    });

    expect(registeredPet.id).toEqual(expect.any(String));
  });

  it("should not be able to register a pet with a non-existent org", async () => {
    const createPet = sut.execute({ ...petUseCaseSpec, orgId: randomUUID() });

    await expect(createPet).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should be able register a pet with requirements", async () => {
    const requirements = [
      {
        text: "Requirement 1",
      },
      {
        text: "Requirement 2",
      },
    ];

    const { pet: registeredPet } = await sut.execute({
      ...petUseCaseSpec,
      orgId,
      requirements,
    });

    requirements.forEach((requirement, index) => {
      expect(petRequirementsRepository.data[index]).toEqual(
        expect.objectContaining({
          petId: registeredPet.id,
          text: requirement.text,
        }),
      );
    });
  });

  it("should be able register a pet with photos", async () => {
    const photos = [
      {
        source: "source",
        alt: "Photo 1",
      },
      {
        source: "source",
        alt: "Photo 2",
      },
    ];

    const { pet: registeredPet } = await sut.execute({
      ...petUseCaseSpec,
      orgId,
      photos,
    });

    photos.forEach(({ source, alt }, index) => {
      expect(petPhotosRepository.data[index]).toEqual(
        expect.objectContaining({
          petId: registeredPet.id,
          source,
          alt,
        }),
      );
    });
  });
});
