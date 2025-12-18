/**
 * Jest测试配置文件
 */

module.exports = {
  // 测试环境
  testEnvironment: 'node',
  
  // 测试文件匹配模式
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // 覆盖率配置
  collectCoverageFrom: [
    'scripts/**/*.js',
    'build.config.js',
    '!scripts/**/*.test.js',
    '!**/node_modules/**'
  ],
  
  // 覆盖率阈值
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  },
  
  // 模块路径映射
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  
  // 自动mock配置
  automock: false,
  
  // 手动mock目录
  roots: ['<rootDir>'],
  
  // 测试前设置（注意：setupFilesAfterEnv会在每个测试文件之前运行）
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  
  // 清除所有mock（确保测试隔离）
  clearMocks: true,
  restoreMocks: true,
  
  // 忽略的路径
  testPathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/web/',
    '/build/'
  ],
  
  // 清除mock
  clearMocks: true,
  
  // 恢复mock
  restoreMocks: true
};

