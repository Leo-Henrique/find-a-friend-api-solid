import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets.repository";
import { randomUUID } from "crypto";
import { petUseCaseSpec } from "test/entities";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ListRecentAdoptedPetsUseCase } from "./list-recent-adopted-pets.use-case";

let petsRepository: InMemoryPetsRepository;
let sut: ListRecentAdoptedPetsUseCase;

const pet = {
  ...petUseCaseSpec,
  orgId: randomUUID(),
};

describe("List recent adopted pets Use Case", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    sut = new ListRecentAdoptedPetsUseCase(petsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to list adopted pets", async () => {
    for (let i = 1; i <= 2; i++) await petsRepository.create(pet);

    const adoptedPetsCount = 3;

    for (let i = 1; i <= adoptedPetsCount; i++)
      await petsRepository.create({ ...pet, adopted: new Date() });

    const { pets } = await sut.execute({ limit: 8 });

    expect(pets).toHaveLength(adoptedPetsCount);
  });

  it("should be able to list recent adopted pets from most recent to oldest", async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 8, 0));

    for (let i = 1; i <= 3; i++) {
      await petsRepository.create({ ...pet, adopted: new Date() });

      vi.advanceTimersByTime(1000 * 60);
    }

    const { pets } = await sut.execute({ limit: 8 });

    expect(pets).toEqual(
      pets.map((pet, index) => {
        const nextPet = pets[index + 1];

        if (nextPet) {
          expect(pet.adopted!.getTime()).toBeGreaterThan(
            nextPet.adopted!.getTime(),
          );
        }

        return expect.objectContaining({ adopted: expect.any(Date) });
      }),
    );
  });

  it("should be able to list recent adopted pets with a limit", async () => {
    const limit = 4;

    for (let i = 1; i <= limit + 2; i++)
      await petsRepository.create({ ...pet, adopted: new Date() });

    const { pets } = await sut.execute({ limit });

    expect(pets).toHaveLength(limit);
  });
});
