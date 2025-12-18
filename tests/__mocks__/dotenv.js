/**
 * dotenv模块的Mock实现
 * 用于测试时阻止读取真实的.env文件
 */

module.exports = {
  config: jest.fn((options) => {
    // 不读取.env文件，返回空对象
    // 这样测试可以完全通过process.env控制环境变量
    return {};
  })
};

