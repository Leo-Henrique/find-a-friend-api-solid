import { app } from "@/app";
import { prisma, testDatabaseSchema, testDatabaseURL } from "@/lib/prisma";
import { execSync } from "child_process";
import { afterAll, beforeAll } from "vitest";

beforeAll(async () => {
  process.env.POSTGRES_URL = testDatabaseURL();
  execSync("pnpm prisma migrate deploy");

  await app.ready();
});

afterAll(async () => {
  await prisma.$queryRawUnsafe(
    `DROP SCHEMA IF EXISTS "${testDatabaseSchema}" CASCADE`,
  );
  await prisma.$disconnect();

  await app.close();
});
