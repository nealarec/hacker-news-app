export default {
  preset: "react-native",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|expo(-.*)?|@expo/.*|@tamagui/.*|msw|until-async)",
  ],
  modulePathIgnorePatterns: ["<rootDir>/android/", "<rootDir>/ios/"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/test/__mocks__/fileMock.js",
  },
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
