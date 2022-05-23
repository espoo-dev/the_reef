module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  moduleNameMapper: {
    '@/test/(.+)': '<rootDir>/test/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.test.ts'],
  roots: [
    '<rootDir>/src',
    '<rootDir>/test'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  clearMocks: true,
}
