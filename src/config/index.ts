import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

const schema = z.object({
  APP_NAME: z.string(),
  NODE_ENV: z.enum(["test", "development", "production"]),
  APP_PORT: z.coerce.number(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASS: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_NAME: z.string(),
  POSTGRES_URL: z.string().url(),
  JWT_SECRET: z.string(),
});

const _env = schema.safeParse(process.env);

if (!_env.success) {
  console.error(_env.error.format());

  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
