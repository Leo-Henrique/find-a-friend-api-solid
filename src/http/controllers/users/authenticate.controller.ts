import { encodeJWT } from "@/http/plugins/require-JWT";
import { authenticateUseCaseFactory } from "@/use-cases/factories/authenticate-use-case.factory";
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

  const { accessToken } = await encodeJWT(org.id, res);

  res.send({ org, accessToken });
}
