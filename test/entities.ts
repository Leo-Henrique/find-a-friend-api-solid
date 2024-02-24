import { faker } from "@faker-js/faker";
import { hashSync } from "bcryptjs";

export const orgTest = {
  name: faker.company.name(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  tel: faker.string.numeric(11),
  cep: faker.location.zipCode({ format: "00000000" }),
  state: faker.location.state(),
  city: faker.location.city(),
  neighborhood: faker.location.streetAddress(false),
  street: faker.location.street(),
  addressNumber: faker.number.int(3),
};

export const orgPasswordHashTest = hashSync(orgTest.password, 6);

export const petTest = {
  name: faker.person.firstName(),
  description: faker.lorem.paragraph(),
  age: faker.number.int({ min: 2, max: 15 }),
  type: "dog",
  size: "medium",
  independency: "very",
  energyLevel: 5,
} as const;

export const petUseCaseTest = {
  ...petTest,
  requirements: <[]>[],
  photos: <[]>[],
} as const;
