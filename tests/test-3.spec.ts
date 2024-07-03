import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('button', { name: 'I\'m Feeling Lucky' }).click();
  await page.getByRole('link', { name: 'Celebrating Ribbon Skirts and' }).click();
  await page.getByRole('heading', { name: 'Celebrating Ribbon Skirts and Ribbon Shirts', exact: true }).click();
await page.locator('#glue-drawer-2465973').getByRole('link', { name: 'Library' }).click();
await page.getByRole('button', { name: 'Format' }).click();
await page.locator('label').filter({ hasText: 'Animated / GIF' }).locator('div').nth(1).click();
await page.locator('label').filter({ hasText: 'Still Image' }).locator('div').nth(1).click();
//await page.getByRole('heading', { name: 'Celebrating Ribbon Skirts and Ribbon Shirts', exact: true }).click();
await page.locator('#glue-drawer-2465973').getByRole('link', { name: 'Library' }).click();
});