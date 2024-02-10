import { app } from "./app";
import { env } from "./config";

(async () => {
  await app.listen({ host: "0.0.0.0", port: env.APP_PORT });

  console.log(
    `Application "${env.APP_NAME}" HTTP server is running on port ${env.APP_PORT}!`,
  );
})();
