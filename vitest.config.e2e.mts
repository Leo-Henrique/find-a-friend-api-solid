import vitestConfig from "./vitest.config.mjs";
import { mergeConfig } from "vitest/config";

export default mergeConfig(vitestConfig, {
  test: {
    include: ["./**/*.e2eSpec.ts"],
    setupFiles: ["./test/e2eSetup.ts"],
  },
});
