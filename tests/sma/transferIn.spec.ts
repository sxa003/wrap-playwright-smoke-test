

import { test, expect } from '@playwright/test';

test('investmentTransferIn', async ({page,request}) => {
    test.slow();


    //confirm all pending transactions
await page.goto('https://mockfolio.asis-dev13.hq.local/');
await page.getByRole('tab', { name: 'Cofirmations' }).click();
await page.locator('#react-select-4-input').click();
await page.locator('#react-select-4-input').fill('TSP16878931');
await page.getByText('TSP16878931', { exact: true }).click();
await page.getByRole('button', { name: 'Confirm unconfirmed' }).click();

    //Login client site to do TransferIn (CBA into Model)

  await page.goto('https://client-dev13.portfolioonline.com.au/')
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('16878931-5042tsp@ioof.com.au');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Tester1@');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Investments' }).click(); 

  //Transfer In


  await page.getByTestId('buy-button-b21a83ef-89dd-4a3f-934d-ad3e65f5ae53').click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByTestId('transfer-toggle-10499').click();
  await page.getByTestId('order-editor-add').click();
  await page.getByTestId('review-order-button').click();
  await page.locator('[data-test-id="SUMMARY_PANEL_NEXT-closebutton"]').click();1
  await page.getByTestId('review-order-button').click();
  await expect(page.getByTestId('summary-panel-next-container').getByText('Separately managed accounts')).toBeVisible();
  await page.getByTestId('summary-panel-next-container').getByPlaceholder('Enter your password').click();
  await page.getByTestId('summary-panel-next-container').getByPlaceholder('Enter your password').fill('Tester1@');
  await page.getByTestId('summary-panel-next-container').getByTestId('submitOrderConfirmationPanel').click();
  await expect(page.getByRole('heading', { name: 'Your order has been submitted' })).toBeVisible();
  await page.getByTestId('summary-panel-next-container').locator('[data-test="closeCompletionOverlayButton"] a').click();

});