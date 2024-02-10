import { Pet } from "@/entities/pet";
import { OrgsRepository } from "@/repositories/orgs.repository";
import {
  FindManyAvailableForAdoptionParams,
  PetsRepository,
} from "@/repositories/pets.repository";

interface ListPetsAvailableForAdoptionUseCaseRequest
  extends Omit<FindManyAvailableForAdoptionParams, "orgIdsInSameCity"> {
  city: string;
}

interface ListPetsAvailableForAdoptionUseCaseResponse {
  pets: Pet[];
  totalInCity: number;
}

export class ListPetsAvailableForAdoptionUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    city,
    ...rest
  }: ListPetsAvailableForAdoptionUseCaseRequest): Promise<ListPetsAvailableForAdoptionUseCaseResponse> {
    const orgsInSameCity = await this.orgsRepository.findManyByCity(city);
    const orgIdsInSameCity = orgsInSameCity.map(({ id }) => id);

    const pets = await this.petsRepository.findManyAvailableForAdoption({
      orgIdsInSameCity,
      ...rest,
    });

    const totalInCity =
      await this.petsRepository.countAvailableForAdoptionByCity(
        orgIdsInSameCity,
      );

    return { pets, totalInCity };
  }
}
