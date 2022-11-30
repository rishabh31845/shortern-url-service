module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    "src/server/config/app.ts",
  ],
  "testResultsProcessor": "jest-sonar-reporter"
};
