export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/services/**/*.ts" // Vamos focar a cobertura nos Services
  ],
};