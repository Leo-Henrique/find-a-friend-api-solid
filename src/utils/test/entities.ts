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
