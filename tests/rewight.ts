import { test } from '@playwright/test';
test('shouldDoReweight', async ({ page }) => {
  await page.goto('https://client-staging.portfolioonline.com.au/')
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('16858048-0200TSP@ioof.com.au');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Tester1@');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Investments' }).click(); 
});

test('should clear text input field when an item is added', async ({ page }) => {
  // create a new todo locator
 
});