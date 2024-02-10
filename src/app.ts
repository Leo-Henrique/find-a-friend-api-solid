import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import multer from "fastify-multer";
import { env } from "./config";
import { appRoutes } from "./http/controllers/routes";
import { errorHandler } from "./http/plugins/errorHandler";

export const app = fastify();

app.register(fastifyJwt, { secret: env.JWT_SECRET });
app.register(multer.contentParser);
app.register(appRoutes);
app.setErrorHandler(errorHandler);
