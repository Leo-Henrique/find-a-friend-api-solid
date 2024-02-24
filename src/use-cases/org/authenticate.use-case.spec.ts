import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { orgPasswordHashSpec, orgSpec } from "@/utils/test/entities";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { InvalidCredentialsError } from "../errors/invalid-credentials.error";
import { AuthenticateUseCase } from "./authenticate.use-case";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateUseCase;

const { email, password } = orgSpec;

describe("Authenticate Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgsRepository);

    await orgsRepository.create({
      ...orgSpec,
      passwordHash: orgPasswordHashSpec,
    });
  });

  it("should be able to authenticate as org", async () => {
    const { org: authenticatedOrg } = await sut.execute({ email, password });
    // eslint-disable-next-line
    const { password: _, ...expectedData } = orgSpec;

    expect(authenticatedOrg).toEqual(expect.objectContaining(expectedData));
  });

  it("should not be able to authenticate with a non-existing email", async () => {
    const authenticate = sut.execute({ email: "email@example.com", password });

    await expect(authenticate).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with an invalid password", async () => {
    const authenticate = sut.execute({
      email,
      password: password + randomUUID(),
    });

    await expect(authenticate).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to return the authenticated org password", async () => {
    const { org } = await sut.execute({ email, password });

    expect(org).not.toHaveProperty("passwordHash");
  });
});
