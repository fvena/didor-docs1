module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/*.spec.[jt]s?(x)'],
  collectCoverage: true,
  collectCoverageFrom: ['src/components/**/*.{js,vue}', 'src/views/**/*.{js,vue}', 'src/directives/*.js', 'src/services/*.js', 'src/utils/*.js', '!src/**/index.js'],
  coverageReporters: ['text', 'text-summary'],
  transform: {
    '\\.js$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
};
