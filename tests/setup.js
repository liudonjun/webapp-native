/**
 * Jest测试环境设置
 * 在每个测试文件运行前执行
 */

// 设置测试超时时间
jest.setTimeout(30000);

// 全局测试工具函数
global.createMockFileSystem = () => {
  const files = {};
  return {
    existsSync: jest.fn((path) => files[path] !== undefined),
    readFileSync: jest.fn((path) => files[path] || ''),
    writeFileSync: jest.fn((path, content) => {
      files[path] = content;
    }),
    mkdirSync: jest.fn(),
    readdirSync: jest.fn((path) => Object.keys(files).filter(k => k.startsWith(path))),
    statSync: jest.fn((path) => ({
      size: files[path] ? files[path].length : 0,
      isFile: () => files[path] !== undefined,
      isDirectory: () => false
    })),
    copyFileSync: jest.fn(),
    getFiles: () => files
  };
};

// 注意：不mock console，保留真实的console输出以便调试
// 如果需要在特定测试中mock console，可以在该测试文件中单独mock

