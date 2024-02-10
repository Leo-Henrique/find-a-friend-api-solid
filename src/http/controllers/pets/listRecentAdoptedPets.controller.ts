import { listRecentAdoptedPetsUseCaseFactory } from "@/useCases/factories/listRecentAdoptedPetsUseCase.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const listRecentAdoptedPetsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(20).default(8),
});

export async function listRecentAdoptedPetsController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const query = listRecentAdoptedPetsQuerySchema.parse(req.query);

  const listRecentAdoptedPets = listRecentAdoptedPetsUseCaseFactory();

  const pets = await listRecentAdoptedPets.execute(query);

  res.status(200).send(pets);
}