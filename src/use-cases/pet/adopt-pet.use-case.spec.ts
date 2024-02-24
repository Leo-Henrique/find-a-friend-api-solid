import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets.repository";
import { petUseCaseSpec } from "@/utils/test/entities";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { AdoptPetUseCase } from "./adopt-pet.use-case";

let petsRepository: InMemoryPetsRepository;
let sut: AdoptPetUseCase;

const params = {
  orgId: "",
  petId: "",
};

describe("Adopt Pet Use Case", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    sut = new AdoptPetUseCase(petsRepository);

    const pet = await petsRepository.create({
      orgId: randomUUID(),
      ...petUseCaseSpec,
    });

    params.orgId = pet.orgId;
    params.petId = pet.id;
  });

  it("should be able mark a pet as adopted", async () => {
    const { pet: updatedPet } = await sut.execute(params);

    expect(updatedPet.adopted).toBeInstanceOf(Date);
  });

  it("should be able unmark a pet as adopted", async () => {
    await sut.execute(params);

    const { pet: updatedPet } = await sut.execute(params);

    expect(updatedPet.adopted).toBeNull();
  });

  it("should not be able to mark a non-existent pet as adopted", async () => {
    const adopted = sut.execute({ petId: randomUUID(), orgId: params.orgId });

    expect(adopted).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to mark a pet with an organization other than the one created", async () => {
    const adopted = sut.execute({ petId: params.petId, orgId: randomUUID() });

    expect(adopted).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
