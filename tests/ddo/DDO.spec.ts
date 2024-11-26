import { test, expect } from '@playwright/test';


test('DDO-V2', async ({ page,request }) => {
  test.slow();

  const res = await request.post('https://security-authenticator-service.asis-dev5.hq.local/authenticate',{
          
          headers:{
            'content-type':'application/json',
            'Authorization':'Basic dummy'
        }
        });
        expect(res.status()).toBe(200);
        const token=(await res.body()).toString();
        console.log("token");
        await page.goto('https://ops-ioofonline-assets.asis-dev5.hq.local/ddo-reporting?authToken='+token);

        await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
        await page.getByRole('option', { name: 'Individual Investment Records V2' }).click();
        await page.locator('#date-from').click();
        await page.locator('#date-from').fill('01/01/2024');
        await page.locator('#date-to').click();
        await page.locator('#date-to').fill('01/02/2024');
        await page.locator('div').filter({ hasText: /^Filter by determination resultSelect\.\.\.$/ }).locator('svg').click();
        await page.getByRole('option', { name: 'INSIDE' }).locator('div').click();

        await page.locator('div').filter({ hasText: /^Filter by DDO in-scopeSelect\.\.\.$/ }).locator('svg').click();
        await page.getByRole('option', { name: 'YES' }).locator('div').click();
        await page.locator('div').filter({ hasText: /^Filter by advisedSelect\.\.\.$/ }).locator('svg').click();
        await page.getByRole('option', { name: 'YES' }).locator('div').click();
        await page.locator('div').filter({ hasText: /^Filter by registry systemSelect\.\.\.$/ }).locator('svg').click();
        await page.getByRole('option', { name: 'ASIS' }).click();
        await page.getByRole('button', { name: 'Download' }).click();
       
});

test('DDO-V1', async ({ page,request }) => {
       test.slow();
       const res = await request.post('https://security-authenticator-service.asis-dev5.hq.local/authenticate',{
          
       headers:{
         'content-type':'application/json',
        'Authorization':'Basic dummy'
}
        });
        expect(res.status()).toBe(200);
        const token=(await res.body()).toString();
        console.log("token");
        await page.goto('https://ops-ioofonline-assets.asis-dev5.hq.local/ddo-reporting?authToken='+token);

        await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
        await page.getByRole('option', { name: 'Individual Investment Records V1' }).click();
        await page.locator('#date-from').click();
        await page.locator('#date-from').fill('01/01/2024');
        await page.locator('#date-to').click();
        await page.locator('#date-to').fill('01/02/2024');
        await page.locator('div').filter({ hasText: /^Filter by determination resultSelect\.\.\.$/ }).locator('svg').click();
        await page.getByRole('option', { name: 'INSIDE' }).locator('div').click();

        await page.locator('div').filter({ hasText: /^Filter by DDO in-scopeSelect\.\.\.$/ }).locator('svg').click();
        await page.getByRole('option', { name: 'YES' }).locator('div').click();
        await page.locator('div').filter({ hasText: /^Filter by advisedSelect\.\.\.$/ }).locator('svg').click();
        await page.getByRole('option', { name: 'YES' }).locator('div').click();
        await page.locator('div').filter({ hasText: /^Filter by registry systemSelect\.\.\.$/ }).locator('svg').click();
        
       await page.getByRole('option', { name: 'ASIS' }).click();
       await page.getByRole('button', { name: 'Download' }).click();
});

test('DDO-Individual Product Records', async ({ page,request }) => {
  test.slow();

  const res = await request.post('https://security-authenticator-service.asis-dev5.hq.local/authenticate',{
          
  headers:{
    'content-type':'application/json',
    'Authorization':'Basic dummy'
}
        });
        expect(res.status()).toBe(200);
        const token=(await res.body()).toString();
        console.log("token");
        await page.goto('https://ops-ioofonline-assets.asis-dev5.hq.local/ddo-reporting?authToken='+token);

        await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
        await page.getByRole('option', { name: 'Individual Product Records' }).click();
        await page.locator('#date-from').click();
        await page.locator('#date-from').fill('01/01/2024');
        await page.locator('#date-to').click();
        await page.locator('#date-to').fill('01/02/2024');
        await page.locator('div').filter({ hasText: /^Filter by determination resultSelect\.\.\.$/ }).locator('svg').click();
        await page.getByRole('option', { name: 'INSIDE' }).locator('div').click();

        await page.locator('div').filter({ hasText: /^Filter by DDO in-scopeSelect\.\.\.$/ }).locator('svg').click();
        await page.getByRole('option', { name: 'YES' }).locator('div').click();
        await page.locator('div').filter({ hasText: /^Filter by advisedSelect\.\.\.$/ }).locator('svg').click();
        await page.getByRole('option', { name: 'YES' }).locator('div').click();
        await page.locator('div').filter({ hasText: /^Filter by registry systemSelect\.\.\.$/ }).locator('svg').click();
        
       await page.getByRole('option', { name: 'ASIS' }).click();
       await page.getByRole('button', { name: 'Download' }).click();
});


test('DDO-Maximum reporting duration is one year', async ({ page,request }) => {
  test.slow();

  const res = await request.post('https://security-authenticator-service.asis-dev5.hq.local/authenticate',{
          
  headers:{
    'content-type':'application/json',
    'Authorization':'Basic dummy'
}
        });
        expect(res.status()).toBe(200);
        const token=(await res.body()).toString();
        console.log("token");
        await page.goto('https://ops-ioofonline-assets.asis-dev5.hq.local/ddo-reporting?authToken='+token);

        await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
        await page.getByRole('option', { name: 'Individual Investment Records V2' }).click();
        await page.locator('#date-from').click();
        await page.locator('#date-from').fill('01/01/2023');
        await page.locator('#date-to').click();
        await page.locator('#date-to').fill('01/05/2024');

        await expect(page.getByText('Maximum reporting duration is')).toBeVisible();

  
      
});
