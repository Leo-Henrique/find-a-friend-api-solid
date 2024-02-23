import { CreateOrg, Org } from "@/entities/org.entity";

export interface OrgsRepository {
  create(data: CreateOrg): Promise<Org>;
  findById(id: string): Promise<Org | null>;
  findByEmail(email: string): Promise<Org | null>;
  findManyByCity(city: string): Promise<Org[]>;
}
