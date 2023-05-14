module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    "^react-router-dom$": "<rootDir>/src/__mocks__/react-router-dom.tsx",
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
