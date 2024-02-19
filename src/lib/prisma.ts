import { env } from "@/config";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

export const testDatabaseSchema = randomUUID();

export const testDatabaseURL = () => {
  const url = new URL(env.POSTGRES_URL);

  url.searchParams.set("schema", testDatabaseSchema);

  return url.toString();
};

export const prisma = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["error"] : [],
  datasourceUrl: env.NODE_ENV === "test" ? testDatabaseURL() : env.POSTGRES_URL,
});
