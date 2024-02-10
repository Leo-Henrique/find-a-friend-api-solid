import { CreateOrg, Org } from "@/entities/org";
import { randomUUID } from "crypto";
import { OrgsRepository } from "../orgs.repository";

export class InMemoryOrgsRepository implements OrgsRepository {
  public data: Org[] = [];

  async create(data: CreateOrg) {
    const org = {
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
    };

    this.data.push(org);

    return org;
  }

  async findById(id: string) {
    const org = this.data.find(org => org.id === id);

    if (!org) return null;

    return org;
  }

  async findByEmail(email: string) {
    const org = this.data.find(org => org.email === email);

    if (!org) return null;

    return org;
  }
}
