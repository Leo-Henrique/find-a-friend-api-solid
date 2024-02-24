import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/http/test/create-and-authenticate-org";
import { prisma } from "@/lib/prisma";
import { orgSpec, petSpec } from "@/utils/test/entities";
import request from "supertest";
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
