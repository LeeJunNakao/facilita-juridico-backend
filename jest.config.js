module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  roots: ['<rootDir>/tests'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsconfig: {
          isolatedModules: true,
          sourceMap: false,
        },
      },
    ],
  },
  moduleNameMapper: {
    '^@src/(.*)': '<rootDir>/src/$1',
    '^@tests/(.*)': '<rootDir>/tests/$1',
  },
};
