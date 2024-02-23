import vitestConfig from "./vitest.config.mjs";
import { mergeConfig } from "vitest/config";

export default mergeConfig(vitestConfig, {
  test: {
    include: ["./**/*.e2e-spec.ts"],
    setupFiles: ["./test/e2e-setup.ts"],
  },
});
