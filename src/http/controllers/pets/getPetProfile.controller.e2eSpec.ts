import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/http/test/createAndAuthenticateOrg";
import { prisma } from "@/lib/prisma";
import { petSpec } from "@/utils/test/entities";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Get pet profile (E2E)", () => {
  it("should be able to get pet profile", async () => {
    const { org } = await createAndAuthenticateOrg(app);

    const pet = await prisma.pet.create({
      data: { orgId: org.id, ...petSpec },
    });

    const response = await request(app.server).get(`/pets/${pet.id}`).send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.org.id).toEqual(org.id);
    expect(response.body.pet.id).toEqual(pet.id);
  });
});
