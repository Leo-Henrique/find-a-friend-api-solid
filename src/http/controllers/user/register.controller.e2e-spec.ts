import { app } from "@/app";
import request from "supertest";
import { orgSpec } from "test/entities";
import { describe, expect, it } from "vitest";

describe("Register (E2E)", () => {
  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send(orgSpec);

    expect(response.statusCode).toEqual(201);
  });
});
