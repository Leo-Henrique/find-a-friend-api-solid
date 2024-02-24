import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { createAndAuthenticateOrg } from "test/e2e/create-and-authenticate-org";
import { petSpec } from "test/entities";
import { describe, expect, it } from "vitest";

describe("Adopt pet (E2E)", () => {
  it("should be able to adopt pet", async () => {
    const { org, authorization } = await createAndAuthenticateOrg(app);

    const pet = await prisma.pet.create({
      data: { orgId: org.id, ...petSpec },
    });

    const response = await request(app.server)
      .patch(`/pets/${pet.id}/adoptions`)
      .set("Authorization", authorization)
      .send();

    expect(response.statusCode).toEqual(204);
  });
});
