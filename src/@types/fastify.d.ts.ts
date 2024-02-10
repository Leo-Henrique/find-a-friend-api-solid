import { File } from "fastify-multer/lib/interfaces";

export type Upload<Base> = Omit<Base, "fields" | "type">;

declare module "fastify" {
  interface FastifyRequest {
    file: File;
    files: File[];
  }
}
