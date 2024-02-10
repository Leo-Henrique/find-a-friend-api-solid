import { InMemoryOrgsRepository } from "@/repositories/inMemory/inMemoryOrgs.repository";
import { InMemoryPetPhotosRepository } from "@/repositories/inMemory/inMemoryPetPhotos.repository";
import { InMemoryPetRequirementsRepository } from "@/repositories/inMemory/inMemoryPetRequirements.repository";
import { InMemoryPetsRepository } from "@/repositories/inMemory/inMemoryPets.repository";
import {
  orgPasswordHashSpec,
  orgSpec,
  petUseCaseSpec,
} from "@/utils/test/entities";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetUseCase } from "./createPet.useCase";
import { ResourceNotFoundError } from "./errors/resourceNotFound.error";

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
