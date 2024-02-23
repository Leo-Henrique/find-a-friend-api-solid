import { app } from "@/app";
import { orgSpec } from "@/utils/test/entities";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Authenticate (E2E)", () => {
  it("should be able to authenticate", async () => {
    await request(app.server).post("/users").send(orgSpec);

    const response = await request(app.server).post("/sessions").send(orgSpec);

    expect(response.statusCode).toEqual(200);
    expect(response.body.org).toEqual(
      expect.objectContaining({ email: orgSpec.email }),
    );
    expect(response.body.accessToken).toBeTypeOf("string");
  });
});
