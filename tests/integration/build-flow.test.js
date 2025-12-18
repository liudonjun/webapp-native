/**
 * 构建流程集成测试
 */

// Mock dotenv模块，避免读取真实的.env文件
jest.mock('dotenv', () => {
  return {
    config: jest.fn(() => {
      // 不读取真实.env文件，只使用process.env中已设置的值
      return {};
    })
  };
});

const { loadConfig } = require('../helpers/config-loader');

describe('构建流程集成测试', () => {
  describe('配置读取流程', () => {
    test('应该按优先级读取配置', () => {
      // 1. 环境变量优先级最高
      const config1 = loadConfig({ APP_NAME: 'Env App Name' });
      expect(config1.appName).toBe('Env App Name');
      
      // 2. 清除环境变量后使用默认值
      const config2 = loadConfig();
      expect(config2.appName).toBe('My App');
    });
  });
  
  describe('配置一致性', () => {
    test('所有配置项应该有默认值', () => {
      const config = loadConfig();
      
      expect(config.appId).toBeDefined();
      expect(config.appName).toBeDefined();
      expect(config.version).toBeDefined();
      expect(config.buildMode).toBeDefined();
      expect(config.android).toBeDefined();
      expect(config.signing).toBeDefined();
    });
  });
  
  describe('版本号格式', () => {
    test('应该正确解析版本号格式', () => {
      const version = '1.2.3';
      const match = version.match(/^(\d+)\.(\d+)\.(\d+)/);
      
      expect(match).not.toBeNull();
      if (match) {
        const [, major, minor, patch] = match;
        expect(major).toBe('1');
        expect(minor).toBe('2');
        expect(patch).toBe('3');
      }
    });
    
    test('应该正确计算versionCode', () => {
      const version = '2.1.3';
      const match = version.match(/^(\d+)\.(\d+)\.(\d+)/);
      
      if (match) {
        const [, major, minor, patch] = match;
        const versionCode = parseInt(major) * 10000 + parseInt(minor) * 100 + parseInt(patch);
        expect(versionCode).toBe(20103);
      }
    });
  });
});

