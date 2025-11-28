export default {
  preset: "react-native",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|expo(-.*)?|@expo/.*|@tamagui/.*|msw|until-async)",
  ],
  modulePathIgnorePatterns: ["<rootDir>/android/", "<rootDir>/ios/"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/types/*",
    "!src/**/*.d.ts",
    "!src/navigation/*",
    "!src/test/**/*",
    "!src/App.tsx",
    "!src/index.ts",
  ],
};
