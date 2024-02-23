import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { orgPasswordHashSpec, orgSpec } from "@/utils/test/entities";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Token (E2E)", () => {
  it("should be able to get new access token", async () => {
    // eslint-disable-next-line
    const { password, ...org } = orgSpec;

    await prisma.org.create({
      data: { ...org, passwordHash: orgPasswordHashSpec },
    });

    const authResponse = await request(app.server)
      .post("/sessions")
      .send(orgSpec);
    const refreshTokenCookie = authResponse.headers["set-cookie"];

    const response = await request(app.server)
      .patch("/sessions/token")
      .set("Cookie", refreshTokenCookie);

    expect(response.statusCode).toEqual(200);
    expect(response.headers["set-cookie"]).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
    expect(response.body).toHaveProperty("accessToken");
  });
});
