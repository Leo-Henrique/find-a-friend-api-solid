import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { serializeUser } from "./serialize-user";

const user = {
  email: faker.internet.email(),
  passwordHash: faker.internet.password(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
};

describe("Serialize user", () => {
  it("should be able to remove password hash from user data", () => {
    const sut = serializeUser(user);

    // eslint-disable-next-line
    const { passwordHash, ...serializedUser } = user;

    expect(sut).not.toHaveProperty("passwordHash");
    expect(sut).toEqual(serializedUser);
  });
});
