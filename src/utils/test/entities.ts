import { hashSync } from "bcryptjs";

export const orgSpec = {
  name: "Org",
  email: "org@example.com",
  password: "123456",
  tel: "14999999999",
  cep: "12345678",
  state: "State",
  city: "City",
  neighborhood: "Neighborhood",
  street: "Street",
  addressNumber: 123,
};

export const orgPasswordHashSpec = hashSync(orgSpec.password, 6);

export const petSpec = {
  name: "Paçoca",
  description: "Paçoca é um adorável cão Shih-tzu que adora uma companhia.",
  age: 2,
  type: "dog",
  size: "medium",
  independency: "very",
  energyLevel: 5,
} as const;

export const petUseCaseSpec = {
  ...petSpec,
  requirements: <[]>[],
  photos: <[]>[],
} as const;
