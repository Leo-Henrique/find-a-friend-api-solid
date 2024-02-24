import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { createAndAuthenticateOrg } from "test/e2e/create-and-authenticate-org";
import { petTest } from "test/entities";
import { describe, expect, it } from "vitest";

describe("List recent adopted pets (E2E)", () => {
  it("should be able to list recent adopted pets", async () => {
    const { org } = await createAndAuthenticateOrg(app);

    const limit = 2;

    await prisma.pet.createMany({
      data: Array.from({ length: limit + 1 }).map(() => {
        return { orgId: org.id, ...petTest, adopted: new Date() };
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
