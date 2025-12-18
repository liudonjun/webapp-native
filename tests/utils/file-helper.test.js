/**
 * 文件操作辅助函数测试
 */

const path = require('path');

describe('文件路径处理', () => {
  describe('路径拼接', () => {
    test('应该正确拼接路径', () => {
      const result = path.join('scripts', '..', 'build.config.js');
      expect(result).toContain('build.config.js');
    });
    
    test('应该处理Windows路径', () => {
      const result = path.join('C:', 'Users', 'Test', 'project');
      expect(result).toBe('C:\\Users\\Test\\project');
    });
    
    test('应该处理相对路径', () => {
      const result = path.join(__dirname, '..', 'scripts');
      expect(result).toContain('scripts');
    });
  });
  
  describe('路径解析', () => {
    test('应该正确解析绝对路径', () => {
      const result = path.resolve('scripts', 'build-apk.js');
      expect(path.isAbsolute(result)).toBe(true);
    });
    
    test('应该正确获取相对路径', () => {
      const from = 'android/app/build.gradle';
      const to = 'release.keystore';
      const result = path.relative(path.dirname(from), to);
      expect(result).toBeDefined();
    });
  });
});

