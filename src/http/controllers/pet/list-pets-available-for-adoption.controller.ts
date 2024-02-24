import { makeListPetsAvailableForAdoptionUseCase } from "@/factories/pet.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createPetBodySchema } from "./create-pet.controller";

const listPetsAvailableForAdoptionQuerySchema = z.object({
  city: z.string().min(1),
  items: z.coerce.number().int().min(1).max(100).default(20),
  page: z.coerce.number().int().min(1).default(1),
  age: z.enum(["adult", "cub"]).optional(),
  energyLevel: z.coerce.number().int().min(1).max(5).optional(),
  size: createPetBodySchema.shape.size.optional(),
  independency: createPetBodySchema.shape.independency.optional(),
});

export async function listPetsAvailableForAdoptionController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const { city, items, page, ...filters } =
    listPetsAvailableForAdoptionQuerySchema.parse(req.query);

  const listPetsAvailableForAdoption =
    makeListPetsAvailableForAdoptionUseCase();

  const pets = await listPetsAvailableForAdoption.execute({
    city,
    items,
    page,
    filters,
  });

  res.status(200).send(pets);
}
