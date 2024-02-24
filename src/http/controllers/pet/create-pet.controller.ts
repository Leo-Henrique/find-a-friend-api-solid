import { makeCreatePetUseCase } from "@/factories/pet.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const createPetBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).max(300),
  age: z.number().int().min(1),
  type: z.enum(["cat", "dog"]),
  size: z.enum(["small", "medium", "large"]),
  independency: z.enum(["little", "normal", "very"]),
  energyLevel: z.number().int().min(1).max(5),
  requirements: z.array(z.object({ text: z.string().min(1) })).default([]),
});

export async function createPetController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const orgId = req.user.id;
  const body = createPetBodySchema.parse(req.body);

  const createPetUseCase = makeCreatePetUseCase();

  await createPetUseCase.execute({
    orgId,
    ...body,
    energyLevel: body.energyLevel as 1 | 2 | 3 | 4 | 5,
    photos: req.files.map(() => ({
      source: "fake-path",
      alt: `${body.name} photography.`,
    })),
  });

  res.status(201).send();
}
