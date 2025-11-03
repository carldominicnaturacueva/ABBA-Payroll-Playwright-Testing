import { test, expect } from '@playwright/test';

const BASE_LOGIN_URL = 'https://theabbapayroll.com/login?redirectFrom=/';
const TEST_EMAIL = 'heyitsnicoboy@gmail.com';
const TEST_PASSWORD = 'CDNC19960308.nico';

async function loginpayroll(page) {
  await page.goto(BASE_LOGIN_URL);
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill(TEST_EMAIL);
  await page.getByRole('textbox', { name: 'Password' }).click();
  // fill the final intended password
  await page.getByRole('textbox', { name: 'Password' }).fill(TEST_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
}

test.beforeEach(async ({ page }) => {
  await loginpayroll(page);
});

test('Leave Management employee number should be visible', async ({ page }) => {
await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Leave Mngt.' }).click();
  await expect(page.getByRole('columnheader', { name: 'Employee ID' })).toBeVisible();
  await expect(page.getByText('EMP0326')).toBeVisible();
  await expect(page.getByText('EMP0335')).toBeVisible();
  await expect(page.getByText('EMP0328')).toBeVisible();
});

test('Leave Management employee names should be visible', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Leave Mngt.' }).click();
  await expect(page.getByRole('columnheader', { name: 'Employee', exact: true })).toBeVisible();
  await expect(page.getByText('Wolf, Alicia')).toBeVisible();
  await expect(page.getByText('Lawson, Richard')).toBeVisible();
  await expect(page.getByText('Baxter, Jennifer')).toBeVisible();
});

test('User should able to navigate Leave type', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Leave Mngt.' }).click();
  await page.getByRole('combobox').filter({ hasText: 'All Leave TypesAll Leave' }).locator('div').first().click();
  await page.getByRole('option', { name: 'Vacation' }).locator('span').first().click();
  await page.getByRole('combobox').filter({ hasText: 'VacationAll Leave' }).locator('div').first().click();
  await page.getByRole('option', { name: 'All Leave Types' }).locator('span').first().click();
  await expect(page.locator('div').filter({ hasText: /^All Leave Types$/ }).locator('span')).toBeVisible();
});

test('User should able to navigate refresh', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Leave Mngt.' }).click();
  await expect(page.getByRole('button', { name: 'Refresh' })).toBeVisible();
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.getByRole('button', { name: 'Refresh' }).click();
});

test('User should able to navigate template', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Leave Mngt.' }).click();
  const page1Promise = page.waitForEvent('popup');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Template' }).click();
  const page1 = await page1Promise;
  const download = await downloadPromise;
  await expect(page.getByRole('button', { name: 'Template' })).toBeVisible();
});

test('User should able to navigate leave adjustment', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Leave Mngt.' }).click();
  await expect(page.getByRole('button', { name: 'Leave Adjustment' })).toBeVisible();
  await page.getByRole('button', { name: 'Leave Adjustment' }).click();
  await expect(page.getByRole('heading', { name: 'Create Leave Adjustment' })).toBeVisible();
});

test('User should open banks', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Banks' }).click();
  await expect(page.getByRole('heading', { name: 'Employee Banks' })).toBeVisible();
});

test.skip('User should import files', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Banks' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: ' Import' }).click();
});

test.skip('User should export files', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Banks' }).click();
  await page.getByRole('button', { name: '' }).click();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: ' Export' }).click();
  const page2 = await page2Promise;
});

test.skip('User should export details files', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Banks' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: ' Export Details' }).click();
});

test('User should able to click more options or 3 dots', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Banks' }).click();
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByRole('button', { name: ' Export' })).toBeVisible();
  await expect(page.getByRole('button', { name: ' Export Details' })).toBeVisible();
  await expect(page.getByRole('button', { name: ' Import' })).toBeVisible();
});

test('Record per page should able to change', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Banks' }).click();
  await page.getByRole('combobox').locator('div').first().click();
  await page.getByRole('option', { name: '5', exact: true }).locator('span').first().click();
  await expect(page.locator('div').filter({ hasText: /^5$/ }).locator('span')).toBeVisible();
  await expect(page.getByRole('main').filter({ hasText: 'Employees' }).getByRole('main')).toBeVisible();
  await page.getByRole('combobox').locator('div').first().click();
  await page.getByRole('option', { name: '10', exact: true }).locator('span').first().click();
  await expect(page.locator('div').filter({ hasText: /^10$/ }).locator('span')).toBeVisible();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
});

test.skip('Search button should able to be functional', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Banks' }).click();
  await page.getByRole('textbox', { name: 'Search...' }).click();
  await page.getByRole('textbox', { name: 'Search...' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Search...' }).fill('D');
  await page.getByRole('textbox', { name: 'Search...' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Search...' }).fill('Dominador');
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByRole('textbox', { name: 'Search...' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Cueva, Dominador' })).toBeVisible();
});

test.skip('Filter button should able to be functional', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Banks' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('combobox').filter({ hasText: 'ALLEMP0355 - Andrews,' }).locator('div').first().click();
  await page.getByRole('option', { name: 'EMP0355 - Andrews, David' }).locator('span').first().click();
  await page.getByRole('option', { name: 'EMP0328 - Baxter, Jennifer' }).locator('span').first().click();
  await page.locator('#headlessui-dialog-panel-v-0-4 div').filter({ hasText: 'StatusActiveALLActiveInactiveNothing matched your searchList is empty.Payroll' }).nth(1).click();
  await page.getByRole('button', { name: 'Search' }).click();
});

test('User should able to navigate back and forward arrow page', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Banks' }).click();
  await page.getByRole('link', { name: ' Next' }).click();
  await page.getByRole('link', { name: ' Previous' }).click();
});

test('Total Records numbers should accurate to the list', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Banks' }).click();
  await expect(page.getByText('Total Records:')).toBeVisible();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
});

test('Banks employee number should be visible', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Banks' }).click();
  await expect(page.getByRole('columnheader', { name: 'Employee ID' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'EMP0355' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'EMP0328' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'EMP0340' })).toBeVisible();
});

test('Banks employee full name should be visible', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Banks' }).click();
  await expect(page.getByRole('columnheader', { name: 'Employee Name' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Andrews, David' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Baxter, Jennifer' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Butler, Carlos' })).toBeVisible();
});

test.skip('User should able to add bank details', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Banks' }).click();
  await page.getByRole('cell', { name: 'Andrews, David' }).click();
  await page.getByRole('button', { name: 'Add Bank Account' }).click();
  await page.locator('div').filter({ hasText: /^Select Bank$/ }).click();
  await page.getByRole('option', { name: 'BDO-12 Press enter to select' }).locator('span').first().click();
  await page.getByRole('textbox', { name: 'Account Number *' }).click();
  await page.getByRole('textbox', { name: 'Account Number *' }).fill('001230045678');
  await page.getByRole('button', { name: 'Create' }).click();
});

test('User should able to Delete bank details', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Banks' }).click();
  await page.getByRole('cell', { name: 'Andrews, David' }).click();
  await page.getByRole('row', { name: 'RCBC 1234567890123001 2025-11-03', exact: true }).getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
});

test('User should able to edit bank details', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Banks' }).click();
  await page.getByRole('cell', { name: 'Andrews, David' }).click();
  await page.getByRole('row', { name: 'BDO-12 001230045678 2025-11-03', exact: true }).getByRole('button').first().click();
  await page.getByRole('combobox').filter({ hasText: 'BDO-12RCBCRobinsons BankUnion' }).locator('div').first().click();
  await page.getByRole('option', { name: 'RCBC Press enter to select' }).locator('span').first().click();
  await page.getByRole('button', { name: 'Update' }).click();
  await page.getByRole('textbox', { name: 'Account Number *' }).click();
  await page.getByRole('textbox', { name: 'Account Number *' }).fill('1234 5678 9012 3001');
  await page.getByRole('button', { name: 'Update' }).click();
});