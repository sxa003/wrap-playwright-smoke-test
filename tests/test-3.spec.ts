import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page.getByRole('button', { name: 'I\'m Feeling Lucky' })).toBeVisible();
  await page.getByRole('button', { name: 'Google Search' }).click();
});


[
  { name: 'Alice', expected: 'Hello, Alice!' },
  { name: 'Bob', expected: 'Hello, Bob!' },
  { name: 'Charlie', expected: 'Hello, Charlie!' },
].forEach(({ name, expected }) => {
  // You can also do it with test.describe() or with multiple tests as long the test name is unique.
  test(`testing with ${name}`, async ({ page }) => {
    await page.goto(`https://example.com/greet?name=${name}`);
    //await expect(page.getByRole('heading')).toHaveText(expected);
  });
});