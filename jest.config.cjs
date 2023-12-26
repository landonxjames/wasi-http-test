const projectConfigBase = {
    extensionsToTreatAsEsm: [".ts"],
    transform: {
      "^.+\\.ts?$": [
        "ts-jest",
        {
          isolatedModules: true,
          tsconfig: "./tsconfig.json",
          useESM: true,
        },
      ],
    },
  };
  
  module.exports = {
    testEnvironment: "node",
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    preset: "ts-jest/presets/default-esm",
    projects: [
      {
        displayName: "runtimeUnitTests",
        roots: ["<rootDir>/src"],
        testMatch: ["<rootDir>/src/**/*.test.ts"],
        ...projectConfigBase
      },
    ],
  };
  