import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/http/test/create-and-authenticate-org";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Authenticate (E2E)", () => {
  it("should be able to get authenticated org", async () => {
    const { accessToken } = await createAndAuthenticateOrg(app);

    const response = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.org).toEqual(
      expect.objectContaining({ email: expect.any(String) }),
    );
  });
});
