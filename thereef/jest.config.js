const glob = require('glob');

module.exports = async () => {
  const componentSpecFiles = await new Promise((resolve, reject) => {
    glob('src/app/**/*.component.spec.ts', (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });

  return {
    preset: 'jest-preset-angular',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    transform: {
      '^.+\\.(ts|js|html)$': 'jest-preset-angular',
    },
    transformIgnorePatterns: [
      'node_modules/(?!.*\\.mjs$)',
    ],
    moduleNameMapper: {
      '\\.(html|scss)$': 'identity-obj-proxy'
    },
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageReporters: ['html', 'text', 'lcov', 'json-summary', 'clover'],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.ts',
      '!src/main.ts',
      '!src/polyfills.ts',
      '!src/environments/**',
      '!src/app/app.config.ts',
      '!src/**/*.component.ts',
      '!src/**/*.spec.ts',
      '!src/**/*.routes.ts'
    ],
    testPathIgnorePatterns: componentSpecFiles
  };
};
