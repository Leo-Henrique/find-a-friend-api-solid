import { makeGetOrgProfileUseCase } from "@/application/factories/org.factory";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profileController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const orgId = req.user.id;

  const getOrgProfileUseCase = makeGetOrgProfileUseCase();
  const { org } = await getOrgProfileUseCase.execute({ orgId });

  res.status(200).send({ org });
}
