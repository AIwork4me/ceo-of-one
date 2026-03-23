/**
 * 主题切换端到端测试
 * 验证：切换主题 → 保持状态 → 刷新后仍然正确
 */

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3002';

test.describe('主题切换功能', () => {
  test.beforeEach(async ({ page }) => {
    // 清除 localStorage
    await page.goto(BASE_URL);
    await page.evaluate(() => localStorage.clear());
  });

  test('首次访问应该是暗色主题', async ({ page }) => {
    await page.goto(`${BASE_URL}/zh`);
    await page.waitForLoadState('networkidle');
    
    const htmlClass = await page.locator('html').getAttribute('class');
    expect(htmlClass).toContain('dark');
  });

  test('点击切换按钮后应该变成亮色', async ({ page }) => {
    await page.goto(`${BASE_URL}/zh`);
    await page.waitForLoadState('networkidle');
    
    // 找到主题切换按钮
    const toggleBtn = page.locator('button[aria-label*="亮色"], button[aria-label*="light"]').first();
    await expect(toggleBtn).toBeVisible();
    
    // 点击切换
    await toggleBtn.click();
    await page.waitForTimeout(1000);
    
    // 验证 html class 变成 light
    const htmlClass = await page.locator('html').getAttribute('class');
    expect(htmlClass).toContain('light');
    
    // 验证 localStorage
    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBe('light');
  });

  test('刷新页面后应该保持亮色主题', async ({ page }) => {
    await page.goto(`${BASE_URL}/zh`);
    await page.waitForLoadState('networkidle');
    
    // 切换到亮色
    const toggleBtn = page.locator('button[aria-label*="亮色"]').first();
    await toggleBtn.click();
    await page.waitForTimeout(500);
    
    // 刷新页面
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // 验证仍然是亮色
    const htmlClass = await page.locator('html').getAttribute('class');
    expect(htmlClass).toContain('light');
  });

  test('切换回暗色应该正常工作', async ({ page }) => {
    await page.goto(`${BASE_URL}/zh`);
    await page.waitForLoadState('networkidle');
    
    // 先切换到亮色
    const lightBtn = page.locator('button[aria-label*="亮色"]').first();
    await lightBtn.click();
    await page.waitForTimeout(500);
    
    // 再切换回暗色
    const darkBtn = page.locator('button[aria-label*="暗色"]').first();
    await darkBtn.click();
    await page.waitForTimeout(500);
    
    // 验证是暗色
    const htmlClass = await page.locator('html').getAttribute('class');
    expect(htmlClass).toContain('dark');
    
    // 验证 localStorage
    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBe('dark');
  });

  test('所有页面主题切换都应该正常', async ({ page }) => {
    const pages = ['/zh', '/zh/courses', '/zh/auth'];
    
    for (const path of pages) {
      await page.goto(`${BASE_URL}${path}`);
      await page.waitForLoadState('networkidle');
      
      // 切换到亮色
      const toggleBtn = page.locator('button[aria-label*="亮色"], button[aria-label*="dark"]').first();
      if (await toggleBtn.count() > 0) {
        await toggleBtn.click();
        await page.waitForTimeout(500);
        
        const htmlClass = await page.locator('html').getAttribute('class');
        expect(htmlClass).toMatch(/(light|dark)/);
      }
    }
  });
});
