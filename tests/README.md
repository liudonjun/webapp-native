# 测试文档

## 测试框架

项目使用 [Jest](https://jestjs.io/) 作为测试框架。

## 运行测试

### 运行所有测试

```bash
npm test
```

### 监听模式（开发时使用）

```bash
npm run test:watch
```

### 生成覆盖率报告

```bash
npm run test:coverage
```

## 测试结构

```
tests/
├── setup.js                    # Jest测试环境设置
├── build.config.test.js        # 配置模块测试
├── utils/                      # 工具函数测试
│   ├── config-helper.test.js
│   └── file-helper.test.js
├── scripts/                    # 脚本测试
│   ├── build-apk.test.js
│   ├── build-web.test.js
│   └── sync-capacitor.test.js
└── integration/                # 集成测试
    └── build-flow.test.js
```

## 测试覆盖范围

### 单元测试

- ✅ `build.config.js` - 配置读取和解析
- ✅ 环境变量处理
- ✅ 文件路径处理
- ✅ 配置验证

### 集成测试

- ✅ 构建流程集成
- ✅ 配置优先级
- ✅ 版本号处理

## 编写测试

### 示例测试

```javascript
describe('功能模块', () => {
  beforeEach(() => {
    // 测试前设置
  });
  
  test('应该执行某个操作', () => {
    // 测试代码
    expect(result).toBe(expected);
  });
});
```

### Mock使用

```javascript
jest.mock('fs');

const fs = require('fs');
fs.existsSync = jest.fn(() => true);
```

## 测试最佳实践

1. **隔离测试**：每个测试应该独立，不依赖其他测试
2. **清理环境**：使用 `beforeEach` 和 `afterEach` 清理测试环境
3. **Mock外部依赖**：Mock文件系统、网络请求等外部依赖
4. **测试边界情况**：测试正常情况、边界情况和错误情况
5. **描述性测试名称**：使用清晰的测试描述

## 覆盖率目标

- 语句覆盖率：≥ 60%
- 分支覆盖率：≥ 60%
- 函数覆盖率：≥ 60%
- 行覆盖率：≥ 60%

## 持续集成

测试应该在以下情况自动运行：

- 提交代码前（pre-commit hook）
- Pull Request时
- 主分支合并前

