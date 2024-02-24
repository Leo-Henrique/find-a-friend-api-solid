import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { createAndAuthenticateOrg } from "test/e2e/create-and-authenticate-org";
import { orgSpec, petSpec } from "test/entities";
import { describe, expect, it } from "vitest";

describe("List pets available for adoption (E2E)", () => {
  it("should be able to list pets available for adoption", async () => {
    const { org } = await createAndAuthenticateOrg(app);

    const petsCount = 3;

    await prisma.pet.createMany({
      data: Array.from({ length: petsCount }).map(() => {
        return { orgId: org.id, ...petSpec };
      }),
    });

    const response = await request(app.server)
      .get("/pets/available")
      .query({ city: orgSpec.city })
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toEqual(
      Array.from({ length: petsCount }).map(() => {
        return expect.objectContaining({ orgId: org.id, adopted: null });
      }),
    );
    expect(response.body.totalInCity).toEqual(petsCount);
  });
});
