import { app } from "@/app";
import request from "supertest";
import { orgTest } from "test/entities";
import { describe, expect, it } from "vitest";

describe("Authenticate (E2E)", () => {
  it("should be able to authenticate", async () => {
    await request(app.server).post("/users").send(orgTest);

    const response = await request(app.server).post("/sessions").send(orgTest);

    expect(response.statusCode).toEqual(200);
    expect(response.body.org).toEqual(
      expect.objectContaining({ email: orgTest.email }),
    );
    expect(response.body.accessToken).toBeTypeOf("string");
  });
});
