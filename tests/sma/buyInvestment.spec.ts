
import { test, expect } from '@playwright/test';

test('buyInvestment', async ({page,request}) => {
    test.slow();
  //ART will insert the data for me

  
  
  const Time1 = Date.now() + 5 * 60_000;
  const Time2 = Date.now() + 3 * 60_000;
  
  const res = await request.post('https://security-authenticator-service.asis-dev13.hq.local/authenticate',{
            
  headers:{
    'content-type':'application/json',
    'Authorization':'Basic dummy'
}
          });
          expect(res.status()).toBe(200);
          //const body = await res.json();
          const token=(await res.body()).toString();
          console.log("token");
          console.log(token)
          console.log(Time1)
          console.log(Time2)
  
          
          const res1 = await request.post('https://transaction-service.asis-dev13.hq.local/platform/TSP/batches',{
            
            headers:{
              'content-type':'application/json',
              'Authorization':'ioof-token '+ token
          },
  
          data:{
            "number": null,
            "fundCode": "TSP",
            "effectiveDate": "2024-10-10T04:39:06.315Z",
            "comment": "MP Testing 2023-07-03",
            "transactionCount": 0,
            "unallocatedTransactionCount": 0,
            "type": "S"
        }
          });
          expect(res1.status()).toBe(200);
          const resBody = JSON.parse(await res1.text())
          const batch = (await resBody.number)
          console.log("batch");
          console.log(resBody);
          console.log("batch number");
          console.log(batch);
  //ADD cash
        
  const res3= await request.post('https://transaction-service.asis-dev13.hq.local/platform/TSP/member/16878931',{
          
          headers:{
            'content-type':'application/json',
            'Authorization':'ioof-token '+ token
        },

        data: {
          "number": batch,
          "transactions": [
              {
                  "gross": "1000",
                  "holdings": "20.0",
                  "assetValue": "1.0",
                  "net": "1000",
                  "costs": "0.00",
                  "typeCode": "J",
                  "subtypeCode": "",
                  "investmentNumber": "10499",
                  "effectiveDate": "2024-10-10",
                  "dueDate": "2024-10-10",
                  "allocated": true,
                  "comment": "postman test",
                  "memberNumber": "16878931",
                  "platformCode": "TSP",
                  "fundCode": "TSP",
                  "clientReferenceId": "IncomeTransaction988777D"+Time2,
                  "batchNumber": batch,
                  "incomeComponents": {
                      "interestIncome": 0,
                      "nonResidentInterest": 0
                  },
                  "nonResidentWithheldTax": 0,
                  "noTaxFileNumberWithheldTax": 0
              }
          ]
      }
        });
       expect(res3.status()).toBe(201);
        const resBody2 = JSON.parse(await res3.text())
        console.log("cba");
        console.log(resBody2);


        });