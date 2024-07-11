import { test, expect } from '@playwright/test';

[
  { Email: 'd665-2488@ioof.com.au', Password: 'Staging1@' },
  { Email: 'k454-7947@ioof.com.au', Password: 'Staging1@' },
].forEach(({ Email, Password }) => {
  // You can also do it with test.describe() or with multiple tests as long the test name is unique.
  test(`testing with ${Email}`, async ({ page }) => {
    test.slow();
    await page.goto('/');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill(Email);
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(Password);
    await page.getByRole('button', { name: 'Log in' }).click();

    await page.getByRole('main').locator('div').filter({ hasText: /^member$/ }).click();
    const downloadPromise = page.waitForEvent('download');
    await page.locator('[data-test="as__actions__btnCsv"]').click();
    const download = await downloadPromise;
  });
});


test('should navigate to Adviser login page', async ({page}) => {
  test.slow();
  await page.goto('/')
 // const loginUrlPattern = RegExp("https://login-staging\.portfolioonline\.com\.au.*")
  //const auth0UrlPattern = RegExp("https://auth-staging\.ioofonline\.com\.au.*")
  //await page.waitForURL(loginUrlPattern)
  //await page.waitForURL(auth0UrlPattern)
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('k454-7947@ioof.com.au');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Staging1@');
  await page.getByRole('button', { name: 'Log in' }).click();
  //wait expect(page.getByRole('heading', { name: 'B455' })).toBeVisible();
  await expect(page.getByRole('main')).toContainText('Recent updates');
  await page.locator('[data-test="Your_clients_toolbar_item"]').click()
  await page.locator('[data-test="Your_clients_toolbar_item"]').screenshot({ path: 'screenshot.png' });
 
  await page.getByText('Alger, Patricia Ann').click();
  await page.getByRole('link', { name: 'Investments' }).click();
  await page.getByRole('link', { name: 'Investments' }).screenshot({ path: 'screenshot1.png' });

});

test('shouldLoginAndAddTDAsAClient', async ({page}) => {
  test.slow();
  await page.goto('https://client-dev13.portfolioonline.com.au/')
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('16901609-1302IDP@ioof.com.au');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Tester1@');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Investments' }).click(); 

  await page.locator('[data-test="term-investment-autosuggest_investmentPickerButton"]').click();
  await page.locator('[data-test="maturing_searchInvestments"]').getByPlaceholder('Start typing a name or code...').click();
  await page.getByRole('option', { name: 'Adelaide Bank ADB' }).click();
  await page.locator('[data-test="term-rate-selector"] svg').click();
  await page.locator('#react-select-2-option-0').click();
  await page.getByTestId('number-input').click();
  await page.getByTestId('number-input').click();
  await page.getByTestId('number-input').fill('9000');
  await page.getByTestId('order-editor-add').click();
  await page.getByTestId('review-order-button').click();

  await page.getByTestId('summary-panel-next-container').getByText('Maturing investments').click();
  await expect(page.getByTestId('summary-panel-next-container').getByText('Maturing investments')).toBeVisible();
  await page.getByText('I have received personal financial advice in relation to the product(s) selected in this form; or I have reviewed and understand the Target Market Determination of the relevant product(s) selected (if applicable) and confirm that they meet my objectives, financial situation and needs.').click();
  await page.getByTestId('summary-panel-next-container').getByPlaceholder('Enter your password').click();
  await page.getByTestId('summary-panel-next-container').getByPlaceholder('Enter your password').fill('Tester1@');
  await page.getByTestId('summary-panel-next-container').getByTestId('submitOrderConfirmationPanel').click();
  await expect(page.getByRole('heading', { name: 'Your order has been submitted' })).toBeVisible();
  await page.getByTestId('summary-panel-next-container').locator('[data-test="closeCompletionOverlayButton"] a').click();

  await page.getByRole('link', { name: 'Summary' }).click();
  await page.getByRole('link', { name: 'Investments' }).click();

  const buyText = RegExp("Scheduled buy.*")
  //await expect(page.getByText(buyText)).toBeVisible({ timeout: 10000 });
  //await expect(page.getByText(buyText)).toHaveCount(1);
  
  await expect(page.getByTestId('trade-tooltip').locator('a')).toBeVisible();
  await page.getByText('Delete', { exact: true }).click();
  await page.locator('[data-test-id="request-cancellation-dialog_footer"] [data-test="edit-instruction-password-field"]').click();
  await page.locator('[data-test-id="request-cancellation-dialog_footer"] [data-test="edit-instruction-password-field"]').fill('Tester1@');
  await page.locator('[data-test-id="request-cancellation-dialog_footer"] [data-test="password-submit"]').click();

});



test('deleteTDs', async ({page}) => {
  test.slow();
  await page.goto('https://client-dev13.portfolioonline.com.au/')
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('16901609-1302IDP@ioof.com.au');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Tester1@');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Investments' }).click(); 

//await expect(page.getByText('Adelaide Bank')).toBeVisible();
await expect(page.getByRole('heading', { name: 'Cash Account' })).toBeVisible();
const count11 = await page.getByText('Adelaide Bank').count();
console.log(await page.getByText('Adelaide Bank').count());
console.log('dfrgtre')
console.log(count11)

for (var i=1; i<=count11; i++)  {
  await page.locator('span').filter({ hasText: 'deleteDelete' }).first().click()
  await page.locator('[data-test-id="request-cancellation-dialog_footer"] [data-test="edit-instruction-password-field"]').click();
  await page.locator('[data-test-id="request-cancellation-dialog_footer"] [data-test="edit-instruction-password-field"]').fill('Tester1@');
  await page.locator('[data-test-id="request-cancellation-dialog_footer"] [data-test="password-submit"]').click();
  
}




});