import { makeAdoptPetUseCase } from "@/application/factories/pet.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const adoptPetParamsSchema = z.object({
  petId: z.string().uuid(),
});

export async function adoptPetController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const orgId = req.user.id;
  const { petId } = adoptPetParamsSchema.parse(req.params);

  const adoptPetUseCase = makeAdoptPetUseCase();

  await adoptPetUseCase.execute({ orgId, petId });

  res.status(204).send();
}
