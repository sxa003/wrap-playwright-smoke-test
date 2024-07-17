import { test, expect } from '@playwright/test';

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const records = parse(fs.readFileSync(path.join("tests/data1.csv")), {
  columns: true,
  skip_empty_lines: true
});


for (const record of records) {
  test(`foo: ${record.email}`, async ({ page }) => {
  console.log(record.email, record.password);
});

}

