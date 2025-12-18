#!/usr/bin/env node

/**
 * 生成Android签名证书（keystore）脚本
 * 功能：
 * 1. 使用keytool生成keystore文件
 * 2. 配置签名信息到build.config.js
 * 3. 生成签名配置说明
 */

// 加载环境变量
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const readline = require('readline');

const configPath = path.join(__dirname, '..', 'build.config.js');

console.log('🔐 Android签名证书生成工具\n');

// 创建readline接口用于交互式输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 询问用户输入
function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// 查找Java keytool命令
function findKeytool() {
  let javaHome = process.env.JAVA_HOME;
  
  if (!javaHome) {
    // 尝试查找Android Studio自带的JDK
    const possibleJavaPaths = [
      'C:\\Program Files\\Android\\Android Studio\\jbr',
      'C:\\Program Files (x86)\\Android\\Android Studio\\jbr',
      path.join(os.homedir(), 'AppData', 'Local', 'Android', 'Sdk', 'jbr'),
    ];
    
    for (const javaPath of possibleJavaPaths) {
      const keytoolPath = path.join(javaPath, 'bin', os.platform() === 'win32' ? 'keytool.exe' : 'keytool');
      if (fs.existsSync(keytoolPath)) {
        javaHome = javaPath;
        process.env.JAVA_HOME = javaHome;
        break;
      }
    }
  }
  
  if (!javaHome) {
    throw new Error('未找到Java环境，请设置JAVA_HOME环境变量');
  }
  
  const keytoolPath = path.join(javaHome, 'bin', os.platform() === 'win32' ? 'keytool.exe' : 'keytool');
  if (!fs.existsSync(keytoolPath)) {
    throw new Error(`keytool不存在: ${keytoolPath}`);
  }
  
  return keytoolPath;
}

// 生成keystore文件
async function generateKeystore() {
  try {
    // 读取当前配置
    const config = require(configPath);
    
    console.log('请填写以下信息来生成签名证书：\n');
    
    // 获取用户输入
    let keystoreName = await question('Keystore文件名（默认: release.keystore）: ') || 'release.keystore';
    
    // 确保文件名有.keystore后缀
    if (!keystoreName.toLowerCase().endsWith('.keystore') && !keystoreName.toLowerCase().endsWith('.jks')) {
      keystoreName = keystoreName + '.keystore';
    }
    
    const keystorePath = path.join(__dirname, '..', keystoreName);
    
    // 检查文件是否已存在
    if (fs.existsSync(keystorePath)) {
      const overwrite = await question(`文件 ${keystoreName} 已存在，是否覆盖？(y/N): `);
      if (overwrite.toLowerCase() !== 'y') {
        console.log('已取消操作');
        rl.close();
        return;
      }
    }
    
    const keystorePassword = await question('Keystore密码（至少6位）: ');
    if (keystorePassword.length < 6) {
      throw new Error('密码至少需要6位');
    }
    
    const keyAlias = await question('Key别名（默认: release-key）: ') || 'release-key';
    const keyPassword = await question('Key密码（默认与Keystore密码相同，直接回车）: ') || keystorePassword;
    
    const validityYears = await question('证书有效期（年，默认: 25）: ') || '25';
    const validityDays = parseInt(validityYears) * 365;
    
    // 组织信息
    const cn = await question('组织名称/CN（默认: My Company）: ') || 'My Company';
    const ou = await question('组织单位/OU（默认: IT Department）: ') || 'IT Department';
    const o = await question('组织/O（默认: My Company）: ') || 'My Company';
    const city = await question('城市/City（默认: Beijing）: ') || 'Beijing';
    const state = await question('省份/State（默认: Beijing）: ') || 'Beijing';
    const country = await question('国家代码/Country（默认: CN）: ') || 'CN';
    
    console.log('\n正在生成keystore文件...');
    
    // 查找keytool
    const keytool = findKeytool();
    
    // 构建keytool命令
    const dname = `CN=${cn}, OU=${ou}, O=${o}, L=${city}, ST=${state}, C=${country}`;
    const keytoolCommand = `"${keytool}" -genkey -v -keystore "${keystorePath}" -alias ${keyAlias} -keyalg RSA -keysize 2048 -validity ${validityDays} -storepass ${keystorePassword} -keypass ${keyPassword} -dname "${dname}"`;
    
    // 执行keytool命令
    execSync(keytoolCommand, {
      stdio: 'inherit',
      shell: os.platform() === 'win32'
    });
    
    console.log(`\n✅ Keystore文件已生成: ${keystorePath}`);
    
    // 更新.env文件（优先）
    updateEnvFile(keystoreName, keystorePassword, keyAlias, keyPassword);
    
    // 更新build.config.js（保持兼容性，但build.config.js现在从环境变量读取）
    updateBuildConfig(keystoreName, keystorePassword, keyAlias, keyPassword);
    
    console.log('\n✅ 签名配置已更新到 .env 和 build.config.js');
    console.log('\n📝 重要提示：');
    console.log('1. 请妥善保管keystore文件和密码');
    console.log('2. 如果丢失keystore文件或密码，将无法更新已发布的应用');
    console.log('3. 建议将keystore文件备份到安全位置');
    console.log('4. 不要将keystore文件提交到Git仓库（已在.gitignore中排除）');
    
  } catch (error) {
    console.error('\n❌ 生成失败:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// 更新.env文件配置
function updateEnvFile(keystoreName, keystorePassword, keyAlias, keyPassword) {
  const envPath = path.join(__dirname, '..', '.env');
  
  // 如果.env文件不存在，创建它
  if (!fs.existsSync(envPath)) {
    console.log('⚠️  .env文件不存在，正在创建...');
    // 读取.env.example作为模板
    const envExamplePath = path.join(__dirname, '..', '.env.example');
    if (fs.existsSync(envExamplePath)) {
      let envContent = fs.readFileSync(envExamplePath, 'utf8');
      // 更新签名配置
      envContent = updateEnvContent(envContent, keystoreName, keystorePassword, keyAlias, keyPassword);
      fs.writeFileSync(envPath, envContent, 'utf8');
    } else {
      // 如果没有.env.example，创建基本的.env文件
      const basicEnvContent = `# 签名配置
SIGNING_ENABLED=true
KEYSTORE_PATH=${keystoreName}
KEYSTORE_PASSWORD=${keystorePassword}
KEY_ALIAS=${keyAlias}
KEY_PASSWORD=${keyPassword}
BUILD_MODE=release
`;
      fs.writeFileSync(envPath, basicEnvContent, 'utf8');
    }
  } else {
    // 更新现有的.env文件
    let envContent = fs.readFileSync(envPath, 'utf8');
    envContent = updateEnvContent(envContent, keystoreName, keystorePassword, keyAlias, keyPassword);
    fs.writeFileSync(envPath, envContent, 'utf8');
  }
}

// 更新.env文件内容
function updateEnvContent(content, keystoreName, keystorePassword, keyAlias, keyPassword) {
  // 更新或添加签名配置
  const signingConfig = `SIGNING_ENABLED=true
KEYSTORE_PATH=${keystoreName}
KEYSTORE_PASSWORD=${keystorePassword}
KEY_ALIAS=${keyAlias}
KEY_PASSWORD=${keyPassword}
BUILD_MODE=release`;
  
  // 检查是否已有签名配置部分
  if (content.includes('SIGNING_ENABLED=')) {
    // 更新现有的签名配置
    content = content.replace(/SIGNING_ENABLED=.*/g, 'SIGNING_ENABLED=true');
    content = content.replace(/KEYSTORE_PATH=.*/g, `KEYSTORE_PATH=${keystoreName}`);
    content = content.replace(/KEYSTORE_PASSWORD=.*/g, `KEYSTORE_PASSWORD=${keystorePassword}`);
    content = content.replace(/KEY_ALIAS=.*/g, `KEY_ALIAS=${keyAlias}`);
    content = content.replace(/KEY_PASSWORD=.*/g, `KEY_PASSWORD=${keyPassword}`);
    content = content.replace(/BUILD_MODE=.*/g, 'BUILD_MODE=release');
  } else {
    // 添加签名配置部分
    if (content.includes('# 签名配置')) {
      // 替换签名配置部分
      content = content.replace(/# 签名配置[\s\S]*?(?=\n#|$)/, `# 签名配置\n${signingConfig}`);
    } else {
      // 在文件末尾添加签名配置
      content += `\n\n# 签名配置\n${signingConfig}`;
    }
  }
  
  return content;
}

// 更新build.config.js配置（保持兼容性，但build.config.js现在从环境变量读取）
function updateBuildConfig(keystoreName, keystorePassword, keyAlias, keyPassword) {
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  // 更新签名配置（现在build.config.js从环境变量读取，但保持注释说明）
  configContent = configContent.replace(
    /signing:\s*\{[^}]*\}/s,
    `signing: {
    enabled: getEnvBool('SIGNING_ENABLED', false),
    keystorePath: getEnv('KEYSTORE_PATH', ''),
    keystorePassword: getEnv('KEYSTORE_PASSWORD', ''),
    keyAlias: getEnv('KEY_ALIAS', ''),
    keyPassword: getEnv('KEY_PASSWORD', ''),
  }`
  );
  
  // 更新构建模式为release（build.config.js也从环境变量读取）
  // 匹配各种可能的格式
  configContent = configContent.replace(
    /buildMode:\s*getEnv\(['"]BUILD_MODE['"],\s*['"](debug|release)['"]\)/,
    "buildMode: getEnv('BUILD_MODE', 'release')"
  );
  
  // 如果buildMode不是通过getEnv读取的，也更新它
  if (!configContent.includes("buildMode: getEnv('BUILD_MODE'")) {
    configContent = configContent.replace(
      /buildMode:\s*['"](debug|release)['"]/,
      "buildMode: getEnv('BUILD_MODE', 'release')"
    );
  }
  
  fs.writeFileSync(configPath, configContent);
}

// 主函数
async function main() {
  await generateKeystore();
}

main();

