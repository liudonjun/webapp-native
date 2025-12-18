#!/usr/bin/env node

/**
 * H5构建脚本
 * 功能：
 * 1. 执行前端框架的构建命令
 * 2. 处理构建错误
 * 3. 验证构建输出
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const config = require('../build.config.js');

console.log('🔨 开始构建H5项目...\n');

// 检测构建命令
function detectBuildCommand() {
  const webDir = path.join(__dirname, '..', 'web');
  const packageJsonPath = path.join(webDir, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error('web/package.json 不存在，请先初始化项目');
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const scripts = packageJson.scripts || {};
    
    // 优先使用build命令
    if (scripts.build) {
      return 'npm run build';
    } else if (scripts['build:prod']) {
      return 'npm run build:prod';
    } else {
      throw new Error('未找到构建命令，请在web/package.json中配置build脚本');
    }
  } catch (error) {
    throw new Error(`读取package.json失败: ${error.message}`);
  }
}

// 验证构建输出
function validateBuildOutput() {
  const webDir = path.join(__dirname, '..', config.webDir);
  
  if (!fs.existsSync(webDir)) {
    throw new Error(`构建输出目录不存在: ${webDir}`);
  }
  
  const files = fs.readdirSync(webDir);
  if (files.length === 0) {
    throw new Error('构建输出目录为空');
  }
  
  // 检查是否有index.html
  const indexPath = path.join(webDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.warn('⚠️  警告: 构建输出中没有找到index.html');
  }
  
  console.log(`✅ 构建输出验证通过: ${config.webDir}`);
  console.log(`   文件数量: ${files.length}`);
}

// 执行构建
function buildWeb() {
  const webDir = path.join(__dirname, '..', 'web');
  
  if (!fs.existsSync(webDir)) {
    throw new Error('web目录不存在，请先初始化项目');
  }
  
  // 检查node_modules是否存在
  const nodeModulesPath = path.join(webDir, 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    console.log('📥 安装web项目依赖...');
    try {
      execSync('npm install', {
        stdio: 'inherit',
        cwd: webDir
      });
    } catch (error) {
      throw new Error(`安装依赖失败: ${error.message}`);
    }
  }
  
  // 执行构建命令
  const buildCommand = detectBuildCommand();
  console.log(`📦 执行构建命令: ${buildCommand}`);
  
  try {
    execSync(buildCommand, {
      stdio: 'inherit',
      cwd: webDir,
      env: {
        ...process.env,
        NODE_ENV: 'production'
      }
    });
    
    console.log('✅ H5项目构建完成');
    
    // 验证构建输出
    validateBuildOutput();
    
  } catch (error) {
    console.error('❌ 构建失败:', error.message);
    process.exit(1);
  }
}

// 主函数
function main() {
  try {
    buildWeb();
    console.log('\n✅ H5构建流程完成！');
  } catch (error) {
    console.error('\n❌ 构建失败:', error.message);
    process.exit(1);
  }
}

main();

