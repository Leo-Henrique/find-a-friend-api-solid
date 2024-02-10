import { getPetProfileUseCaseFactory } from "@/useCases/factories/getPetProfileUseCase.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const getPetProfileParamsSchema = z.object({
  petId: z.string().uuid(),
});

export async function getPetProfileController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const { petId } = getPetProfileParamsSchema.parse(req.params);

  const getPetProfileUseCase = getPetProfileUseCaseFactory();
  const pet = await getPetProfileUseCase.execute({ petId });

  res.status(200).send(pet);
}
