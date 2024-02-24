import { InvalidCredentialsError } from "@/application/errors/use-case-errors";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { randomUUID } from "crypto";
import { orgPasswordHashTest, orgTest } from "test/entities";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate.use-case";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateUseCase;

const { email, password } = orgTest;

describe("Authenticate Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgsRepository);

    await orgsRepository.create({
      ...orgTest,
      passwordHash: orgPasswordHashTest,
    });
  });

  it("should be able to authenticate as org", async () => {
    const { org: authenticatedOrg } = await sut.execute({ email, password });
    // eslint-disable-next-line
    const { password: _, ...expectedData } = orgTest;

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
