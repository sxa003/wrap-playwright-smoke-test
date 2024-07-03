import { test, expect } from '@playwright/test';


test('should navigate to Adviser login page', async ({page}) => {
  await page.goto('/')
 // const loginUrlPattern = RegExp("https://login-staging\.portfolioonline\.com\.au.*")
  //const auth0UrlPattern = RegExp("https://auth-staging\.ioofonline\.com\.au.*")
  //await page.waitForURL(loginUrlPattern)
  //await page.waitForURL(auth0UrlPattern)
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('H685-3708@ioof.com.au');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Staging1@');
  await page.getByRole('button', { name: 'Log in' }).click();
  //await expect(page.getByRole('heading', { name: 'H685' })).toBeVisible();
  

});

test('should navigate to Client login page', async ({page}) => {
  await page.goto('https://client-staging.portfolioonline.com.au/')
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('16858048-0200TSP@ioof.com.au');
  await page.getByLabel('Password').click();await page.locator('span').filter({ hasText: 'Recent updates' }).click();
  await page.getByLabel('Password').fill('Staging1@');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByText('Balance over time')).toBeVisible();
  await page.getByRole('link', { name: 'Beneficiaries' }).click();
  await expect(page.getByRole('heading', { name: 'Death benefit nomination' })).toBeVisible();
  
});