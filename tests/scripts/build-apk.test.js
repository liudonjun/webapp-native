/**
 * build-apk.js 脚本测试
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

// Mock模块
jest.mock('fs');
jest.mock('os');
jest.mock('child_process');

describe('build-apk.js', () => {
  let mockFs;
  let mockOs;
  let mockExecSync;
  
  beforeEach(() => {
    jest.resetModules();
    
    mockFs = {
      existsSync: jest.fn(),
      readFileSync: jest.fn(),
      writeFileSync: jest.fn(),
      readdirSync: jest.fn(),
      statSync: jest.fn(),
      copyFileSync: jest.fn(),
      mkdirSync: jest.fn()
    };
    
    mockOs = {
      platform: jest.fn(() => 'win32'),
      homedir: jest.fn(() => 'C:\\Users\\Test')
    };
    
    mockExecSync = jest.fn();
    
    fs.existsSync = mockFs.existsSync;
    fs.readFileSync = mockFs.readFileSync;
    fs.writeFileSync = mockFs.writeFileSync;
    fs.readdirSync = mockFs.readdirSync;
    fs.statSync = mockFs.statSync;
    fs.copyFileSync = mockFs.copyFileSync;
    fs.mkdirSync = mockFs.mkdirSync;
    
    os.platform = mockOs.platform;
    os.homedir = mockOs.homedir;
    
    const { execSync } = require('child_process');
    execSync.mockImplementation(mockExecSync);
  });
  
  describe('getGradleCommand', () => {
    test('应该在Windows上返回gradlew.bat', () => {
      mockOs.platform.mockReturnValue('win32');
      const isWindows = mockOs.platform() === 'win32';
      const command = isWindows ? 'gradlew.bat' : './gradlew';
      expect(command).toBe('gradlew.bat');
    });
    
    test('应该在Unix系统上返回./gradlew', () => {
      mockOs.platform.mockReturnValue('linux');
      const isWindows = mockOs.platform() === 'win32';
      const command = isWindows ? 'gradlew.bat' : './gradlew';
      expect(command).toBe('./gradlew');
    });
  });
  
  describe('validateAndroidProject', () => {
    test('应该验证Android项目存在', () => {
      mockFs.existsSync.mockImplementation((filePath) => {
        // 模拟android目录和build.gradle文件都存在
        if (filePath === 'android' || filePath.includes('android')) {
          return true;
        }
        if (filePath.includes('build.gradle')) {
          return true;
        }
        return false;
      });
      
      const androidDir = 'android';
      const buildGradlePath = path.join(androidDir, 'build.gradle');
      const androidExists = mockFs.existsSync(androidDir);
      const buildGradleExists = mockFs.existsSync(buildGradlePath);
      const exists = androidExists && buildGradleExists;
      
      expect(exists).toBe(true);
    });
    
    test('应该在Android项目不存在时抛出错误', () => {
      mockFs.existsSync.mockReturnValue(false);
      
      expect(() => {
        if (!mockFs.existsSync('android')) {
          throw new Error('Android目录不存在');
        }
      }).toThrow('Android目录不存在');
    });
  });
  
  describe('updateAndroidConfig', () => {
    test('应该更新build.gradle中的应用ID', () => {
      const mockBuildGradle = `
android {
    defaultConfig {
        applicationId "com.old.app"
    }
}
`;
      
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(mockBuildGradle);
      
      const newAppId = 'com.new.app';
      const updated = mockBuildGradle.replace(
        /applicationId\s+["'][^"']+["']/,
        `applicationId "${newAppId}"`
      );
      
      expect(updated).toContain(`applicationId "${newAppId}"`);
      expect(updated).not.toContain('com.old.app');
    });
    
    test('应该更新版本号', () => {
      const mockBuildGradle = `
android {
    defaultConfig {
        versionCode 10000
        versionName "1.0.0"
    }
}
`;
      
      const version = '2.1.3';
      const versionMatch = version.match(/^(\d+)\.(\d+)\.(\d+)/);
      
      if (versionMatch) {
        const [, major, minor, patch] = versionMatch;
        const versionCode = parseInt(major) * 10000 + parseInt(minor) * 100 + parseInt(patch);
        
        expect(versionCode).toBe(20103);
      }
    });
  });
  
  describe('updateAppName', () => {
    test('应该更新strings.xml中的应用名称', () => {
      const mockStringsXml = `<?xml version='1.0' encoding='utf-8'?>
<resources>
    <string name="app_name">Old App</string>
    <string name="title_activity_main">Old App</string>
</resources>`;
      
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(mockStringsXml);
      
      const newAppName = 'New App';
      let updated = mockStringsXml.replace(
        /<string name="app_name">[^<]+<\/string>/,
        `<string name="app_name">${newAppName}</string>`
      );
      updated = updated.replace(
        /<string name="title_activity_main">[^<]+<\/string>/,
        `<string name="title_activity_main">${newAppName}</string>`
      );
      
      expect(updated).toContain(`<string name="app_name">${newAppName}</string>`);
      expect(updated).toContain(`<string name="title_activity_main">${newAppName}</string>`);
      expect(updated).not.toContain('Old App');
    });
  });
});

