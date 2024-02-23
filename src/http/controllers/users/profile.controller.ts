import { getOrgProfileUseCaseFactory } from "@/use-cases/factories/get-org-profile-use-case.factory";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profileController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const orgId = req.user.id;

  const getOrgProfileUseCase = getOrgProfileUseCaseFactory();
  const { org } = await getOrgProfileUseCase.execute({ orgId });

  res.status(200).send({ org });
}
