import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page.getByRole('button', { name: 'I\'m Feeling Lucky' })).toBeVisible();
  await expect(page.getByLabel('Search for Images')).toContainText('Images');
  await page.getByLabel('Search', { exact: true }).click();
  await page.getByLabel('Search', { exact: true }).fill('testing ');
  await page.getByText('testing table').click();

  await page.locator('#hdtb-sc').getByRole('link', { name: 'Images' }).click();
  await page.goto('https://www.google.com/maps?sca_esv=1dea5c61f81e2510&sca_upv=1&biw=1280&bih=720&output=search&q=testing+table&source=lnms&fbs=AEQNm0DPvcmG_nCbmwtBO9j6YBzM68ZanC7g01Skprhw5JoufVCiMv-hxC44jt6JduRQysBab-bgQXjPraaWFXMvOy8Kr1OAG3K-aj3De4zf3-LxKtkBtWaSCp743evHzhY6J0rIQUCXki65vOxhV0cGJtj0S1dF8YREnKrWtJctBkTv8-bs83YpB7p3IMTdYvjisDEty1xSxeLS4B_TKFXUiCrenmEMcA&entry=mc&ved=1t:200715&ictx=111');
});