import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { orgPasswordHashTest, orgTest } from "test/entities";
import { describe, expect, it } from "vitest";

describe("Token (E2E)", () => {
  it("should be able to get new access token", async () => {
    // eslint-disable-next-line
    const { password, ...org } = orgTest;

    await prisma.org.create({
      data: { ...org, passwordHash: orgPasswordHashTest },
    });

    const authResponse = await request(app.server)
      .post("/sessions")
      .send(orgTest);
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
