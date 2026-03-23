/**
 * 完整的自动化验证流程
 * 1. 启动服务器
 * 2. 运行主题切换测试
 * 3. 报告结果
 */

const { spawn } = require('child_process');
const { chromium } = require('playwright');
const http = require('http');

const PORT = 3002;
const BASE_URL = `http://localhost:${PORT}`;

function checkServer() {
  return new Promise((resolve) => {
    http.get(`${BASE_URL}/zh`, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

function startServer() {
  return new Promise((resolve, reject) => {
    console.log('🚀 启动开发服务器...');
    const server = spawn('npm', ['run', 'dev'], {
      cwd: process.cwd(),
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let resolved = false;

    const checkReady = (data) => {
      const output = data.toString();
      if (output.includes('Ready') && !resolved) {
        resolved = true;
        console.log('✅ 服务器已启动\n');
        setTimeout(() => resolve(server), 2000);
      }
    };

    server.stdout.on('data', checkReady);
    server.stderr.on('data', checkReady);

    setTimeout(() => {
      if (!resolved) {
        reject(new Error('服务器启动超时'));
      }
    }, 45000);
  });
}

async function verifyTheme() {
  console.log('🎯 主题切换验证\n');
  console.log('=====================================\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  try {
    // 测试 1: 首次访问（应该是 dark）
    console.log('📌 测试 1: 首次访问');
    await page.goto(`${BASE_URL}/zh`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    let htmlClass = await page.locator('html').getAttribute('class');
    let pass1 = htmlClass?.includes('dark');
    console.log(`   html.className: ${htmlClass}`);
    console.log(`   ${pass1 ? '✅ PASS' : '❌ FAIL'}: 应该包含 dark`);
    results.push(pass1);

    // 测试 2: 点击切换（应该是 light）
    console.log('\n📌 测试 2: 点击切换 → light');
    const toggleBtn = page.locator('button:has-text("☀️"), button:has-text("🌙")').first();
    if (await toggleBtn.count() > 0) {
      await toggleBtn.click();
      await page.waitForTimeout(1500);

      htmlClass = await page.locator('html').getAttribute('class');
      let storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
      let pass2 = htmlClass?.includes('light') && storedTheme === 'light';
      console.log(`   html.className: ${htmlClass}`);
      console.log(`   localStorage.theme: ${storedTheme}`);
      console.log(`   ${pass2 ? '✅ PASS' : '❌ FAIL'}: 应该是 light`);
      results.push(pass2);

      // 测试 3: 刷新页面（应该保持 light）
      console.log('\n📌 测试 3: 刷新页面 → 保持 light');
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      htmlClass = await page.locator('html').getAttribute('class');
      let pass3 = htmlClass?.includes('light');
      console.log(`   html.className: ${htmlClass}`);
      console.log(`   ${pass3 ? '✅ PASS' : '❌ FAIL'}: 仍然应该是 light`);
      results.push(pass3);

      // 测试 4: 再切换回 dark
      console.log('\n📌 测试 4: 再切换 → dark');
      await toggleBtn.click();
      await page.waitForTimeout(1500);

      htmlClass = await page.locator('html').getAttribute('class');
      let storedTheme2 = await page.evaluate(() => localStorage.getItem('theme'));
      let pass4 = htmlClass?.includes('dark') && storedTheme2 === 'dark';
      console.log(`   html.className: ${htmlClass}`);
      console.log(`   localStorage.theme: ${storedTheme2}`);
      console.log(`   ${pass4 ? '✅ PASS' : '❌ FAIL'}: 应该是 dark`);
      results.push(pass4);
    } else {
      console.log('   ❌ FAIL: 找不到主题切换按钮');
      results.push(false);
    }

    return results;

  } finally {
    await browser.close();
  }
}

async function main() {
  let server = null;

  try {
    // 检查或启动服务器
    const isRunning = await checkServer();
    if (!isRunning) {
      server = await startServer();
    } else {
      console.log('✅ 服务器已在运行\n');
    }

    // 运行测试
    const results = await verifyTheme();

    // 汇总
    console.log('\n=====================================');
    const passed = results.filter(r => r).length;
    const total = results.length;
    console.log(`\n📊 结果: ${passed}/${total} 测试通过`);

    if (passed === total) {
      console.log('\n✅ 所有测试通过！可以部署。\n');
      console.log('🌐 运行以下命令部署到 Vercel:');
      console.log('   npx vercel --prod\n');
    } else {
      console.log('\n❌ 存在失败的测试，请检查代码。\n');
    }

    process.exit(passed === total ? 0 : 1);

  } catch (error) {
    console.error('\n❌ 错误:', error.message);
    process.exit(1);
  } finally {
    if (server) {
      console.log('🛑 关闭服务器...');
      server.kill();
    }
  }
}

main();
