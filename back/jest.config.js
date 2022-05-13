/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
};