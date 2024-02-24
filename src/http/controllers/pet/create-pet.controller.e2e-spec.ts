import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/http/test/create-and-authenticate-org";
import { petSpec } from "@/utils/test/entities";
import { join } from "path";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Create pet (E2E)", () => {
  it("should be able to create pet", async () => {
    const { authorization } = await createAndAuthenticateOrg(app);
    const tmpFolderPath = join(__dirname, "../../../../tmp");

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", authorization)
      .field(petSpec)
      .attach("photos", join(tmpFolderPath, "uploads/pacoca.jpg"));

    expect(response.statusCode).toEqual(201);
  });
});
