import { ResourceAlreadyExistsError } from "@/application/errors";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { compare } from "bcryptjs";
import { orgTest } from "test/entities";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register.use-case";

let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterUseCase;

describe("Register Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterUseCase(orgsRepository);
  });

  it("should be able register an org", async () => {
    const { org: registeredOrg } = await sut.execute(orgTest);

    expect(registeredOrg.id).toEqual(expect.any(String));
  });

  it("should not be able register org with email already registered", async () => {
    await sut.execute(orgTest);

    await expect(sut.execute(orgTest)).rejects.toBeInstanceOf(
      ResourceAlreadyExistsError,
    );
  });

  it("should to save a hash of the password when registering", async () => {
    await sut.execute(orgTest);

    const { passwordHash } = orgsRepository.data[0];
    const isValidPassword = await compare(orgTest.password, passwordHash);

    expect(isValidPassword).toBeTruthy();
  });
});
