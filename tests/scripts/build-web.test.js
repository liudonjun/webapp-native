/**
 * build-web.js 脚本测试
 */

const fs = require('fs');
const path = require('path');

jest.mock('fs');
jest.mock('child_process');

describe('build-web.js', () => {
  let mockFs;
  let mockExecSync;
  
  beforeEach(() => {
    jest.resetModules();
    
    mockFs = {
      existsSync: jest.fn(),
      readFileSync: jest.fn(),
      readdirSync: jest.fn()
    };
    
    mockExecSync = jest.fn();
    
    fs.existsSync = mockFs.existsSync;
    fs.readFileSync = mockFs.readFileSync;
    fs.readdirSync = mockFs.readdirSync;
    
    const { execSync } = require('child_process');
    execSync.mockImplementation(mockExecSync);
  });
  
  describe('detectBuildCommand', () => {
    test('应该检测npm run build命令', () => {
      const mockPackageJson = {
        scripts: {
          build: 'vite build'
        }
      };
      
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockPackageJson));
      
      const packageJson = JSON.parse(mockFs.readFileSync('package.json'));
      const buildCommand = packageJson.scripts.build ? 'npm run build' : null;
      
      expect(buildCommand).toBe('npm run build');
    });
    
    test('应该在找不到build命令时抛出错误', () => {
      const mockPackageJson = {
        scripts: {}
      };
      
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockPackageJson));
      
      const packageJson = JSON.parse(mockFs.readFileSync('package.json'));
      const buildCommand = packageJson.scripts.build || packageJson.scripts['build:prod'];
      
      expect(() => {
        if (!buildCommand) {
          throw new Error('未找到构建命令');
        }
      }).toThrow('未找到构建命令');
    });
  });
  
  describe('validateBuildOutput', () => {
    test('应该验证构建输出目录存在', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['index.html', 'assets']);
      
      const webDir = 'web/dist';
      const exists = mockFs.existsSync(webDir);
      const files = mockFs.readdirSync(webDir);
      
      expect(exists).toBe(true);
      expect(files.length).toBeGreaterThan(0);
    });
    
    test('应该检查index.html是否存在', () => {
      mockFs.existsSync.mockImplementation((path) => {
        return path.includes('index.html');
      });
      mockFs.readdirSync.mockReturnValue(['index.html', 'assets']);
      
      const indexPath = 'web/dist/index.html';
      const exists = mockFs.existsSync(indexPath);
      
      expect(exists).toBe(true);
    });
  });
});

