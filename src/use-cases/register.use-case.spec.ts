import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { orgSpec } from "@/utils/test/entities";
import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { OrgAlreadyExistsError } from "./errors/org-already-exists.error";
import { RegisterUseCase } from "./register.use-case";

let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterUseCase;

describe("Register Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterUseCase(orgsRepository);
  });

  it("should be able register an org", async () => {
    const { org: registeredOrg } = await sut.execute(orgSpec);

    expect(registeredOrg.id).toEqual(expect.any(String));
  });

  it("should not be able register org with email already registered", async () => {
    await sut.execute(orgSpec);

    await expect(sut.execute(orgSpec)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError,
    );
  });

  it("should to save a hash of the password when registering", async () => {
    await sut.execute(orgSpec);

    const { passwordHash } = orgsRepository.data[0];
    const isValidPassword = await compare(orgSpec.password, passwordHash);

    expect(isValidPassword).toBeTruthy();
  });
});
