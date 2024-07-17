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
 //const loginUrlPattern = RegExp("https://login-staging\.portfolioonline\.com\.au.*")
  //const auth0UrlPattern = RegExp("https://auth-staging\.ioofonline\.com\.au.*")
  //await page.waitForURL(loginUrlPattern)
  //await page.waitForURL(auth0UrlPattern)
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('k454-7947@ioof.com.au');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Staging1@');
  await page.getByRole('button', { name: 'Log in' }).click();
  /*
  await expect(page.getByRole('main')).toContainText('Recent updates');

  await page.screenshot({ path: 'screenshot1.png', fullPage: true });
  await page.locator('[data-test="Your_clients_toolbar_item"]').click()
  await expect(page.getByText('Select All')).toBeVisible();

  await page.screenshot({ path: 'screenshot2.png', fullPage: true });
  await page.getByText('Alger, Patricia Ann').click();
  await page.getByRole('link', { name: 'Investments' }).click();

  await page.screenshot({ path: 'screenshot3.png', fullPage: true });
  */



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
  //Create TD as a Draft
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
//Submit the order
  await page.getByTestId('summary-panel-next-container').getByText('Maturing investments').click();
  await expect(page.getByTestId('summary-panel-next-container').getByText('Maturing investments')).toBeVisible();
  await page.getByText('I have received personal financial advice in relation to the product(s) selected in this form; or I have reviewed and understand the Target Market Determination of the relevant product(s) selected (if applicable) and confirm that they meet my objectives, financial situation and needs.').click();
  await page.getByTestId('summary-panel-next-container').getByPlaceholder('Enter your password').click();
  await page.getByTestId('summary-panel-next-container').getByPlaceholder('Enter your password').fill('Tester1@');
  await page.getByTestId('summary-panel-next-container').getByTestId('submitOrderConfirmationPanel').click();
  await expect(page.getByRole('heading', { name: 'Your order has been submitted' })).toBeVisible();
  await page.getByTestId('summary-panel-next-container').locator('[data-test="closeCompletionOverlayButton"] a').click();

  //Refesh the page
  await page.getByRole('link', { name: 'Summary' }).click();
  await page.getByRole('link', { name: 'Investments' }).click();

  const buyText = RegExp("Scheduled buy.*")
 
  
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


test('smaCashInOut', async ({ page }) => {
  test.slow();
  await page.goto('https://client-dev13.portfolioonline.com.au/')
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('16901609-1302IDP@ioof.com.au');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Tester1@');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Investments' }).click(); 

  await expect(page.getByRole('heading', { name: 'Separately Managed Accounts' })).toBeVisible();

  const aa= await page.getByTestId('investment-row-c4f01a43-aad6-4d8a-ab9e-f8a3ac937490').getByTestId('current-value').locator('div').allInnerTexts();
  console.log(aa)
  

 //Cash In

  await page.getByTestId('investment-row-c4f01a43-aad6-4d8a-ab9e-f8a3ac937490').getByText('SMA Model c4f').click();
  await page.getByTestId('expand-underlying-trigger').click();
  await page.getByTestId('expand-underlying-trigger').click();
  await page.getByTestId('buy-button-c4f01a43-aad6-4d8a-ab9e-f8a3ac937490').click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByTestId('number-input').click();
  await page.getByTestId('number-input').fill('5000');
  await page.getByTestId('order-editor-add').click();
  await page.getByTestId('review-order-button').click();
  await expect(page.getByTestId('summary-panel-next-container').getByText('Separately managed accounts')).toBeVisible();
  await page.getByTestId('summary-panel-next-container').getByPlaceholder('Enter your password').click();
  await page.getByTestId('summary-panel-next-container').getByPlaceholder('Enter your password').fill('Tester1@');
  await page.getByTestId('summary-panel-next-container').getByTestId('submitOrderConfirmationPanel').click();
  await expect(page.getByRole('heading', { name: 'Your order has been submitted' })).toBeVisible();
  await page.getByTestId('summary-panel-next-container').locator('[data-test="closeCompletionOverlayButton"] a').click();

//Cash OUt

await page.getByTestId('sell-button-c4f01a43-aad6-4d8a-ab9e-f8a3ac937490').click();
await page.getByTestId('number-input').click();
await page.getByTestId('number-input').fill('5000');
await page.getByTestId('order-editor-add').click();
await page.getByTestId('review-order-button').click();
await expect(page.getByTestId('summary-panel-next-container').getByText('Separately managed accounts')).toBeVisible();
await page.getByTestId('summary-panel-next-container').getByPlaceholder('Enter your password').click();
await page.getByTestId('summary-panel-next-container').getByPlaceholder('Enter your password').fill('Tester1@');
await page.getByTestId('summary-panel-next-container').getByTestId('submitOrderConfirmationPanel').click();
await expect(page.getByRole('heading', { name: 'Your order has been submitted' })).toBeVisible();
await page.getByTestId('summary-panel-next-container').locator('[data-test="closeCompletionOverlayButton"] a').click();

//check the model cash balance
await expect(page.getByRole('heading', { name: 'Separately Managed Accounts' })).toBeVisible();
const aa1= await page.getByTestId('investment-row-c4f01a43-aad6-4d8a-ab9e-f8a3ac937490').getByTestId('current-value').locator('div').allInnerTexts();
console.log(aa1);
await expect(page.getByRole('heading', { name: 'Separately Managed Accounts' })).toBeVisible();

expect(aa).toEqual(aa1);


});

test('Forms', async ({page}) => {
  test.slow();
  await page.goto('https://client-dev13.portfolioonline.com.au/')
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('16901609-1302IDP@ioof.com.au');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Tester1@');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Investments' }).click();
  
  //Tranaction page

  await page.getByRole('link', { name: 'Transactions' }).click();
  await expect(page.getByTestId('filterTransactions')).toBeVisible();
  await expect(page.getByTestId('filterTransactions')).toBeVisible();
  await page.getByTestId('filterTransactions').click();
  await page.locator('div:nth-child(11) > .css-1j9xm1q > div:nth-child(2) > label > input').check();
  await page.getByTestId('viewTransactions').click();
  await expect(page.getByRole('button', { name: 'Separately Managed Accounts' })).toBeVisible();


//Account Details Page

  await page.getByRole('link', { name: 'Account details' }).click();
  await expect(page.getByText('Personal details')).toBeVisible();

  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Direct debit request' }).click();

  const page3 = (await page3Promise).url();
  console.log(page3)
  await expect(page3).toEqual('https://myexpand.com.au/_doc/expand_direct-debit-request')

});

test('editTDInstructins', async ({page}) => {
  test.slow();
  await page.goto('https://client-dev13.portfolioonline.com.au/')
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('16611822-9743TSP@ioof.com.au');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Tester1@');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Investments' }).click(); 

  //Edit TD instructions

  await expect(page.getByRole('heading', { name: 'Maturing investments' })).toBeVisible();
  await page.locator('[data-test="edit-instruction-36993"]').click();
  await expect(page.locator('#EDIT_MATURITY_INSTRUCTION-Content').getByRole('heading', { name: 'Maturity instruction' })).toBeVisible();
  await page.locator('#EDIT_MATURITY_INSTRUCTION-Content [data-test="edit-instruction-select"] svg').click();
  await page.getByText('Reinvest principal', { exact: true }).click();
 
await page.locator('#EDIT_MATURITY_INSTRUCTION-Content [data-test="edit-instruction-select"] svg').click();
await page.locator('#EDIT_MATURITY_INSTRUCTION-Content [data-test="edit-instruction-select"] svg').click();
await page.locator('#EDIT_MATURITY_INSTRUCTION-Content #react-select-2-input').press('Tab');

await page.locator('input[name="password-fjjuzg"]').fill('Tester1@');
await page.locator('[data-test="password-submit"]').first().press('Enter');
await expect(page.getByRole('heading', { name: 'Your instruction has been' })).toBeVisible();
await page.locator('#EDIT_MATURITY_INSTRUCTION-Content a').click();
await expect(page.getByText('To reinvest principal')).toBeVisible();


});


test('investmentTransferIn', async ({page}) => {
  test.slow();
//ART will insert the data for me


  await page.goto('https://client-dev13.portfolioonline.com.au/')
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('16901609-1302IDP@ioof.com.au');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Tester1@');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Investments' }).click(); 

  //Transfer In

  //await page.getByTestId('expand-underlying-trigger').click();
  await page.getByTestId('buy-button-c4f01a43-aad6-4d8a-ab9e-f8a3ac937490').click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByTestId('transfer-toggle-10499').click();
  await page.getByTestId('order-editor-add').click();
  await page.getByTestId('review-order-button').click();
  await page.locator('[data-test-id="SUMMARY_PANEL_NEXT-closebutton"]').click();
  await page.getByTestId('review-order-button').click();
  await expect(page.getByTestId('summary-panel-next-container').getByText('Separately managed accounts')).toBeVisible();
  await page.getByTestId('summary-panel-next-container').getByPlaceholder('Enter your password').click();
  await page.getByTestId('summary-panel-next-container').getByPlaceholder('Enter your password').fill('Tester1@');
  await page.getByTestId('summary-panel-next-container').getByTestId('submitOrderConfirmationPanel').click();
  await expect(page.getByRole('heading', { name: 'Your order has been submitted' })).toBeVisible();
  await page.getByTestId('summary-panel-next-container').locator('[data-test="closeCompletionOverlayButton"] a').click();

 


});