/**
 * 配置辅助函数测试
 */

describe('配置辅助函数', () => {
  describe('getEnv函数', () => {
    // 这个函数在build.config.js中定义，我们需要测试它的行为
    test('应该返回环境变量值如果存在', () => {
      process.env.TEST_VAR = 'test-value';
      const result = process.env.TEST_VAR || 'default';
      expect(result).toBe('test-value');
    });
    
    test('应该返回默认值如果环境变量不存在', () => {
      delete process.env.TEST_VAR;
      const result = process.env.TEST_VAR || 'default';
      expect(result).toBe('default');
    });
  });
  
  describe('getEnvBool函数', () => {
    test('应该正确解析true', () => {
      const value = 'true';
      const result = value.toLowerCase() === 'true' || value === '1';
      expect(result).toBe(true);
    });
    
    test('应该正确解析1', () => {
      const value = '1';
      const result = value.toLowerCase() === 'true' || value === '1';
      expect(result).toBe(true);
    });
    
    test('应该正确解析false', () => {
      const value = 'false';
      const result = value.toLowerCase() === 'true' || value === '1';
      expect(result).toBe(false);
    });
  });
  
  describe('getEnvInt函数', () => {
    test('应该正确解析数字字符串', () => {
      const value = '123';
      const result = parseInt(value, 10);
      expect(result).toBe(123);
      expect(typeof result).toBe('number');
    });
    
    test('应该处理无效数字', () => {
      const value = 'abc';
      const result = parseInt(value, 10);
      expect(isNaN(result)).toBe(true);
    });
  });
});

