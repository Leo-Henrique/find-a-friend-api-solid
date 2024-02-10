import { Org } from "@/entities/org";
import { prisma } from "@/lib/prisma";
import { orgPasswordHashSpec, orgSpec } from "@/utils/test/entities";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  // eslint-disable-next-line
  const { password, ...org } = orgSpec;

  await prisma.org.create({
    data: { ...org, passwordHash: orgPasswordHashSpec },
  });

  const response = await request(app.server).post("/sessions").send(orgSpec);

  const body = response.body as {
    org: Omit<Org, "passwordHash">;
    accessToken: string;
  };

  return { ...body, authorization: `Bearer ${body.accessToken}` };
}
