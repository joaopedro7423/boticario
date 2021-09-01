export default {
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],

  testEnvironment: "node",
  transform: {
    '.+\\.ts$': 'ts-jest'
  },

  testMatch: ['**/*.spec.ts'],


};
