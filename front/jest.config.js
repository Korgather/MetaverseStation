// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '@pages/(.*)$': '<rootDir>/pages/$1',
    '@components/(.*)$': '<rootDir>/src/components/$1',
    '@slices/(.*)$': '<rootDir>/src/slices/$1',
    '@store/(.*)$': '<rootDir>/src/store/$1',
    '@lib/(.*)$': '<rootDir>/src/lib/$1',
    '@actions/(.*)$': '<rootDir>/src/actions/$1',
    '@customTypes/(.*)$': '<rootDir>/src/customTypes/$1',
    '@assets/(.*)$': '<rootDir>/src/assets/$1',
    '@styles/(.*)$': '<rootDir>/src/styles/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
