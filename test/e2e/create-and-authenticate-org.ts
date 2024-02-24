import { Org } from "@/application/entities/org.entity";
import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import request from "supertest";
import { orgPasswordHashTest, orgTest } from "test/entities";

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  // eslint-disable-next-line
  const { password, ...org } = orgTest;

  await prisma.org.create({
    data: { ...org, passwordHash: orgPasswordHashTest },
  });

  const response = await request(app.server).post("/sessions").send(orgTest);

  const body = response.body as {
    org: Omit<Org, "passwordHash">;
    accessToken: string;
  };

  return { ...body, authorization: `Bearer ${body.accessToken}` };
}
