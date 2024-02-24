import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { createAndAuthenticateOrg } from "test/e2e/create-and-authenticate-org";
import { petTest } from "test/entities";
import { describe, expect, it } from "vitest";

describe("Get pet profile (E2E)", () => {
  it("should be able to get pet profile", async () => {
    const { org } = await createAndAuthenticateOrg(app);

    const pet = await prisma.pet.create({
      data: { orgId: org.id, ...petTest },
    });

    const response = await request(app.server).get(`/pets/${pet.id}`).send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.org.id).toEqual(org.id);
    expect(response.body.pet.id).toEqual(pet.id);
  });
});
