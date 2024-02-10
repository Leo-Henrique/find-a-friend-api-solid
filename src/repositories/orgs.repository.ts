import { CreateOrg, Org } from "@/entities/org";

export interface OrgsRepository {
  create(data: CreateOrg): Promise<Org>;
  findById(id: string): Promise<Org | null>;
  findByEmail(email: string): Promise<Org | null>;
}
