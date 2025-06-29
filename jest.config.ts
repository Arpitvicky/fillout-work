import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // if you use path alias
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // mock styles
  },

  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

export default config;
