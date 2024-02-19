import { authenticateUseCaseFactory } from "@/useCases/factories/authenticateUseCase.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function authenticateController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const body = authenticateBodySchema.parse(req.body);

  const authenticateUseCase = authenticateUseCaseFactory();
  const { org } = await authenticateUseCase.execute(body);

  const accessToken = await res.jwtSign({ id: org.id }, { expiresIn: "5m" });

  res.status(200).send({ org, accessToken });
}
