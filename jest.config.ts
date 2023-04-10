import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  moduleDirectories: ["node_modules", "src"],
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
};

export default config;
