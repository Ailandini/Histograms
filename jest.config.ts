module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  extensionsToTreatAsEsm: [".ts"], // Ensure Jest treats TypeScript as ESM
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1" // Handles imports with .js extensions in ESM mode
  }
};