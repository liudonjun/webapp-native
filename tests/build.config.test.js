/**
 * build.config.js 配置模块测试
 */

// Mock dotenv模块，避免读取真实的.env文件
jest.mock('dotenv', () => {
  return {
    config: jest.fn(() => {
      // 不读取真实.env文件，只使用process.env中已设置的值
      // 这样测试可以完全控制环境变量
      return {};
    })
  };
});

const { loadConfig } = require('./helpers/config-loader');

describe('build.config.js', () => {
  
  describe('默认配置', () => {
    test('应该返回默认的应用ID', () => {
      const config = loadConfig();
      expect(config.appId).toBe('com.example.app');
    });
    
    test('应该返回默认的应用名称', () => {
      const config = loadConfig();
      expect(config.appName).toBe('My App');
    });
    
    test('应该返回默认的版本号', () => {
      const config = loadConfig();
      expect(config.version).toBe('1.0.0');
    });
    
    test('应该返回默认的构建模式', () => {
      const config = loadConfig();
      expect(config.buildMode).toBe('debug');
    });
  });
  
  describe('环境变量配置', () => {
    test('应该从环境变量读取APP_ID', () => {
      const config = loadConfig({ APP_ID: 'com.test.app' });
      expect(config.appId).toBe('com.test.app');
    });
    
    test('应该从环境变量读取APP_NAME', () => {
      const config = loadConfig({ APP_NAME: 'Test App' });
      expect(config.appName).toBe('Test App');
    });
    
    test('应该从环境变量读取APP_VERSION', () => {
      const config = loadConfig({ APP_VERSION: '2.0.0' });
      expect(config.version).toBe('2.0.0');
    });
    
    test('应该从环境变量读取BUILD_MODE', () => {
      const config = loadConfig({ BUILD_MODE: 'release' });
      expect(config.buildMode).toBe('release');
    });
  });
  
  describe('Android配置', () => {
    test('应该返回默认的Android SDK版本', () => {
      const config = loadConfig();
      expect(config.android.minSdkVersion).toBe(22);
      expect(config.android.targetSdkVersion).toBe(34);
    });
    
    test('应该从环境变量读取Android SDK版本', () => {
      const config = loadConfig({
        ANDROID_MIN_SDK_VERSION: '23',
        ANDROID_TARGET_SDK_VERSION: '33'
      });
      expect(config.android.minSdkVersion).toBe(23);
      expect(config.android.targetSdkVersion).toBe(33);
    });
  });
  
  describe('签名配置', () => {
    test('应该返回默认的签名配置（未启用）', () => {
      const config = loadConfig();
      expect(config.signing.enabled).toBe(false);
    });
    
    test('应该从环境变量读取签名启用状态', () => {
      const config = loadConfig({ SIGNING_ENABLED: 'true' });
      expect(config.signing.enabled).toBe(true);
    });
    
    test('应该从环境变量读取签名配置', () => {
      const config = loadConfig({
        SIGNING_ENABLED: 'true',
        KEYSTORE_PATH: 'test.keystore',
        KEYSTORE_PASSWORD: 'test123',
        KEY_ALIAS: 'test-key',
        KEY_PASSWORD: 'key123'
      });
      expect(config.signing.enabled).toBe(true);
      expect(config.signing.keystorePath).toBe('test.keystore');
      expect(config.signing.keystorePassword).toBe('test123');
      expect(config.signing.keyAlias).toBe('test-key');
      expect(config.signing.keyPassword).toBe('key123');
    });
  });
  
  describe('布尔值解析', () => {
    test('应该正确解析true字符串', () => {
      const config = loadConfig({ SIGNING_ENABLED: 'true' });
      expect(config.signing.enabled).toBe(true);
    });
    
    test('应该正确解析1字符串', () => {
      const config = loadConfig({ SIGNING_ENABLED: '1' });
      expect(config.signing.enabled).toBe(true);
    });
    
    test('应该正确解析false字符串', () => {
      const config = loadConfig({ SIGNING_ENABLED: 'false' });
      expect(config.signing.enabled).toBe(false);
    });
  });
  
  describe('数字解析', () => {
    test('应该正确解析数字字符串', () => {
      const config = loadConfig({ ANDROID_MIN_SDK_VERSION: '24' });
      expect(config.android.minSdkVersion).toBe(24);
      expect(typeof config.android.minSdkVersion).toBe('number');
    });
  });
});

