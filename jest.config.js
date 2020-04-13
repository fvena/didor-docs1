module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/*.spec.[jt]s?(x)'],
  collectCoverage: true,
  collectCoverageFrom: ['src/components/**/*.{js,vue}', 'src/views/**/*.{js,vue}', '!src/**/index.js'],
  coverageReporters: ['text', 'text-summary'],
};
