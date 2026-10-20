import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",
        globals: false,
        globalSetup: ["./src/tests/globalSetup.ts"],
        setupFiles: ["./src/tests/setup.ts"],
        include: ["src/tests/**/*.test.ts"],
        fileParallelism: false,
        hookTimeout: 180_000,
        testTimeout: 30_000,
    },
});
