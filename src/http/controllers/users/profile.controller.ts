import { getOrgProfileUseCaseFactory } from "@/useCases/factories/getOrgProfileUseCase.factory";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profileController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const orgId = req.user.sub;

  const getOrgProfileUseCase = getOrgProfileUseCaseFactory();
  const { org } = await getOrgProfileUseCase.execute({ orgId });

  res.status(200).send({ org });
}
