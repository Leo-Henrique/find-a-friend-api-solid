import { registerUseCaseFactory } from "@/use-cases/factories/register-use-case.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const registerBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  tel: z.string().min(1),
  cep: z.string().min(8),
  state: z.string().min(1),
  city: z.string().min(1),
  neighborhood: z.string().min(1),
  street: z.string().min(1),
  addressNumber: z.number().min(1),
});

export async function registerController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const body = registerBodySchema.parse(req.body);

  const registerUseCase = registerUseCaseFactory();

  await registerUseCase.execute(body);

  res.status(201).send();
}
