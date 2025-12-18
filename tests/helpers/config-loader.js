/**
 * 配置加载辅助函数
 * 用于测试时隔离加载build.config.js
 */

/**
 * 加载配置模块（隔离模式）
 * @param {Object} envVars - 要设置的环境变量
 * @returns {Object} 配置对象
 */
function loadConfig(envVars = {}) {
  // 保存原始环境变量
  const originalEnv = { ...process.env };
  
  // 清除所有相关环境变量
  Object.keys(process.env).forEach(key => {
    if (key.startsWith('APP_') || key.startsWith('ANDROID_') || 
        key.startsWith('BUILD_') || key.startsWith('SIGNING_') ||
        key.startsWith('WEB_') || key.startsWith('OUTPUT_') ||
        key.startsWith('FRAMEWORK_') || key.startsWith('KEYSTORE_') ||
        key.startsWith('KEY_')) {
      delete process.env[key];
    }
  });
  
  // 设置新的环境变量
  Object.assign(process.env, envVars);
  
  // 重置模块缓存
  jest.resetModules();
  
  // 加载配置
  const config = require('../../build.config.js');
  
  // 恢复原始环境变量
  process.env = originalEnv;
  
  return config;
}

module.exports = { loadConfig };

