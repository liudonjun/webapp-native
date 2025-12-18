#!/usr/bin/env node

/**
 * 创建.env文件脚本
 * 功能：根据当前环境自动生成.env文件
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const envExamplePath = path.join(__dirname, '..', '.env.example');
const envPath = path.join(__dirname, '..', '.env');

console.log('📝 创建.env配置文件...\n');

// 检测Android SDK路径
function detectAndroidSDK() {
  // 优先使用环境变量
  if (process.env.ANDROID_HOME) {
    return process.env.ANDROID_HOME;
  }
  if (process.env.ANDROID_SDK_ROOT) {
    return process.env.ANDROID_SDK_ROOT;
  }
  
  // 尝试常见位置
  const possiblePaths = [
    path.join(os.homedir(), 'AppData', 'Local', 'Android', 'Sdk'), // Windows
    path.join(os.homedir(), 'Library', 'Android', 'sdk'), // macOS
    path.join(os.homedir(), 'Android', 'Sdk'), // Linux
  ];
  
  for (const sdkPath of possiblePaths) {
    if (fs.existsSync(sdkPath) && fs.existsSync(path.join(sdkPath, 'platform-tools'))) {
      return sdkPath;
    }
  }
  
  return '';
}

// 检测Java SDK路径
function detectJavaSDK() {
  if (process.env.JAVA_HOME) {
    return process.env.JAVA_HOME;
  }
  
  // 尝试Android Studio自带的JDK
  const possiblePaths = [
    'C:\\Program Files\\Android\\Android Studio\\jbr',
    'C:\\Program Files (x86)\\Android\\Android Studio\\jbr',
    path.join(os.homedir(), 'AppData', 'Local', 'Android', 'Sdk', 'jbr'),
  ];
  
  for (const javaPath of possiblePaths) {
    const javaExe = path.join(javaPath, 'bin', os.platform() === 'win32' ? 'java.exe' : 'java');
    if (fs.existsSync(javaExe)) {
      return javaPath;
    }
  }
  
  return '';
}

// 读取.env.example模板
function readEnvExample() {
  if (!fs.existsSync(envExamplePath)) {
    throw new Error('.env.example文件不存在');
  }
  return fs.readFileSync(envExamplePath, 'utf8');
}

// 生成.env内容
function generateEnvContent() {
  const template = readEnvExample();
  const androidSdk = detectAndroidSDK();
  const javaSdk = detectJavaSDK();
  
  let content = template;
  
  // 替换Android SDK路径
  if (androidSdk) {
    // Windows路径需要转义反斜杠
    const escapedPath = androidSdk.replace(/\\/g, '\\\\');
    content = content.replace(
      /^ANDROID_HOME=.*$/m,
      `ANDROID_HOME=${androidSdk}`
    );
    console.log(`✅ 检测到Android SDK: ${androidSdk}`);
  } else {
    console.warn('⚠️  未检测到Android SDK，请手动设置ANDROID_HOME');
  }
  
  // 替换Java SDK路径
  if (javaSdk) {
    const escapedPath = javaSdk.replace(/\\/g, '\\\\');
    content = content.replace(
      /^# JAVA_HOME=.*$/m,
      `JAVA_HOME=${javaSdk}`
    );
    console.log(`✅ 检测到Java SDK: ${javaSdk}`);
  } else {
    console.warn('⚠️  未检测到Java SDK，将使用系统默认或自动检测');
  }
  
  return content;
}

// 主函数
function main() {
  try {
    // 检查.env是否已存在
    if (fs.existsSync(envPath)) {
      console.log('⚠️  .env文件已存在');
      console.log('   如需重新生成，请先删除现有.env文件');
      return;
    }
    
    // 检查.env.example是否存在
    if (!fs.existsSync(envExamplePath)) {
      throw new Error('.env.example文件不存在，请先创建模板文件');
    }
    
    // 生成.env内容
    const envContent = generateEnvContent();
    
    // 写入.env文件（确保使用UTF-8编码）
    fs.writeFileSync(envPath, envContent, 'utf8');
    
    console.log('\n✅ .env文件已创建');
    console.log(`   文件位置: ${envPath}`);
    console.log('\n📝 下一步：');
    console.log('1. 编辑.env文件，填写应用信息和签名配置');
    console.log('2. 如需签名，运行: npm run generate:keystore');
    console.log('3. 然后运行: npm run build:apk');
    
  } catch (error) {
    console.error('\n❌ 创建失败:', error.message);
    process.exit(1);
  }
}

main();

