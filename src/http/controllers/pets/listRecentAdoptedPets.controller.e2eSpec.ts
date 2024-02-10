import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/http/test/createAndAuthenticateOrg";
import { prisma } from "@/lib/prisma";
import { petSpec } from "@/utils/test/entities";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("List recent adopted pets (E2E)", () => {
  it("should be able to list recent adopted pets", async () => {
    const { org } = await createAndAuthenticateOrg(app);

    const limit = 2;

    await prisma.pet.createMany({
      data: Array.from({ length: limit + 1 }).map(() => {
        return { orgId: org.id, ...petSpec, adopted: new Date() };
      }),
    });

    const response = await request(app.server)
      .get("/pets/adoptions")
      .query({ limit })
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(limit);
    expect(response.body.pets).toEqual(
      Array.from({ length: limit }).map(() => {
        return expect.objectContaining({
          orgId: org.id,
          adopted: expect.any(String),
        });
      }),
    );
  });
});
