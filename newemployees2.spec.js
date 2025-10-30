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

test('User able to  edit actions - department', async ({ page }) => {
 await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Department' }).click();
  await page.getByRole('cell', { name: 'Andrews, David' }).click();
  await page.getByRole('row', { name: 'HR 2020-11-06', exact: true }).getByRole('button').first().click();
  await page.getByRole('combobox').filter({ hasText: 'HRAdminHRNothing matched your' }).locator('div').first().click();
  await page.locator('#department-0').getByText('Admin').click();
  await page.getByRole('button', { name: 'Update' }).click();
});

test('Record per page should able to change - department', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Department' }).click();
  await page.getByRole('combobox').locator('div').first().click();
  await page.getByRole('option', { name: '5', exact: true }).locator('span').first().click();
  await expect(page.locator('div').filter({ hasText: /^5$/ }).locator('span')).toBeVisible();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
  await page.getByRole('combobox').locator('div').first().click();
  await page.getByRole('option', { name: '10', exact: true }).locator('span').first().click();
  await expect(page.locator('div').filter({ hasText: /^10$/ }).locator('span')).toBeVisible();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
});

test('User should able to navigate back and forward arrow page - department', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Department' }).click();
  await page.getByRole('link', { name: ' Next' }).click();
  await page.getByRole('link', { name: ' Previous' }).click();
});

test('Total Records numbers should accurate to the list - department', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Department' }).click();
  await page.getByRole('combobox').locator('div').first().click();
  await page.getByRole('option', { name: '5', exact: true }).locator('span').first().click();
  await page.getByRole('combobox').locator('div').first().click();
  await page.getByRole('option', { name: '20' }).locator('span').first().click();
  await expect(page.getByText('Total Records:')).toBeVisible();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
});

test('Employee Number should be visible - department', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Department' }).click();
  await expect(page.getByRole('columnheader', { name: 'Employee ID' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'EMP0355' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'EMP0328' })).toBeVisible();
});

test('Employee Full Name should be visible - department', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Department' }).click();
  await expect(page.getByRole('columnheader', { name: 'Employee Name' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Andrews, David' })).toBeVisible();
});

test('User able to delete actions - department', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Department' }).click();
  await page.getByRole('cell', { name: 'Andrews, David' }).click();
  await page.getByRole('row', { name: 'Admin 2020-11-06', exact: true }).getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
});

test('User should open Divisions', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Divisions' }).click();
  await expect(page.getByRole('heading', { name: 'Employee Divisions' })).toBeVisible();
});

test.skip('User should import files - divisions', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Divisions' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: ' Import' }).click();
});

test.skip('User should export files - divisions', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Divisions' }).click();
  await page.getByRole('button', { name: '' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: ' Export' }).click();
  const page1 = await page1Promise;
});

test.skip('User should export Details files - divisions', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Divisions' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: ' Export Details' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: ' Export Details' }).click();
});

test('User should able to add division', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Divisions' }).click();
  await page.getByRole('cell', { name: 'Andrews, David' }).click();
  await page.getByRole('button', { name: 'Add Division' }).click();
  await page.getByRole('combobox').filter({ hasText: 'Select DivisionNothing' }).locator('div').first().click();
  await page.getByRole('combobox').filter({ hasText: 'Select DivisionNothing' }).locator('div').first().click();
  await page.locator('#listbox-division').getByText('List is empty.').click();
  await page.getByRole('button', { name: 'Create' }).click();
});

test.skip('User should able to delete division', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Divisions' }).click();
  await page.getByRole('row', { name: 'EMP0355 Andrews, David' }).getByRole('cell').nth(3).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
});

test('User should able to click more options or 3 dots - divisions', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Divisions' }).click();
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByRole('button', { name: ' Export' })).toBeVisible();
  await expect(page.getByRole('button', { name: ' Export Details' })).toBeVisible();
  await expect(page.getByRole('button', { name: ' Import' })).toBeVisible();
});

test('Record per page should able to change - divisions', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Divisions' }).click();
  await page.getByRole('combobox').locator('div').first().click();
  await page.getByRole('option', { name: '5', exact: true }).locator('span').first().click();
  await expect(page.locator('div').filter({ hasText: /^5$/ }).locator('span')).toBeVisible();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
  await page.getByRole('combobox').locator('div').first().click();
  await page.getByRole('option', { name: '10', exact: true }).locator('span').first().click();
  await expect(page.locator('div').filter({ hasText: /^10$/ }).locator('span')).toBeVisible();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
});

test('Search button should able to be functional - divisions', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Divisions' }).click();
  await page.getByRole('textbox', { name: 'Search...' }).click();
  await page.getByRole('textbox', { name: 'Search...' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Search...' }).fill('D');
  await page.getByRole('textbox', { name: 'Search...' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Search...' }).fill('Dominador');
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByRole('textbox', { name: 'Search...' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Cueva, Dominador' })).toBeVisible();
});

test.skip('Filter button should able to be functional - divisions', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Divisions' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('combobox').filter({ hasText: 'ALLEMP0355 - Andrews,' }).locator('div').first().click();
  await page.getByRole('option', { name: 'EMP0355 - Andrews, David' }).locator('span').first().click();
  await page.getByRole('option', { name: 'EMP0328 - Baxter, Jennifer' }).locator('span').first().click();
  await page.locator('#headlessui-dialog-panel-v-0-4 div').filter({ hasText: 'StatusActiveALLActiveInactiveNothing matched your searchList is empty.Payroll' }).nth(1).click();
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
});

test('Total Records numbers should accurate to the list - divisions', async ({ page }) => {
  await page.getByRole('link', { name: ' Dashboard' }).click();
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Divisions' }).click();
  await expect(page.getByText('Total Records:')).toBeVisible();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
});

test('User should open Position', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Position' }).click();
  await expect(page.getByRole('heading', { name: 'Employee Position' })).toBeVisible();
});

test.skip('User should import files - position', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Position' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: ' Import' }).click();
});

test.skip('User should export files - position', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Position' }).click();
  await page.getByRole('button', { name: '' }).click();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: ' Export' }).click();
  const page2 = await page2Promise;
});

test.skip('User should export Details files - position', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Position' }).click();
  await page.getByRole('button', { name: '' }).click();
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: ' Export Details' }).click();
  const page3 = await page3Promise;
});

test('User should able to click more options or 3 dots - position', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Position' }).click();
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByRole('button', { name: ' Export' })).toBeVisible();
  await expect(page.getByRole('button', { name: ' Export Details' })).toBeVisible();
  await expect(page.getByRole('button', { name: ' Import' })).toBeVisible();
});

test('Record per page should able to change1 - position', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Position' }).click();
  await page.getByRole('combobox').locator('div').first().click();
  await page.getByText('5', { exact: true }).click();
  await expect(page.locator('div').filter({ hasText: /^5$/ }).locator('span')).toBeVisible();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
  await page.getByRole('combobox').locator('div').first().click();
  await page.getByRole('option', { name: '10', exact: true }).locator('span').first().click();
  await expect(page.locator('div').filter({ hasText: /^10$/ }).locator('span')).toBeVisible();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
});

test.skip('Search button should able to be functional - position', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Position' }).click();
  await page.getByRole('textbox', { name: 'Search...' }).click();
  await page.getByRole('textbox', { name: 'Search...' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Search...' }).fill('D');
  await page.getByRole('textbox', { name: 'Search...' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Search...' }).fill('Dominador');
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByRole('textbox', { name: 'Search...' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Cueva, Dominador' })).toBeVisible();
});

test.skip('Filter button should able to be functional - position', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Position' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('combobox').filter({ hasText: 'ALLEMP0355 - Andrews,' }).locator('div').first().click();
  await page.getByRole('option', { name: 'EMP0355 - Andrews, David' }).locator('span').first().click();
  await page.getByRole('option', { name: 'EMP0328 - Baxter, Jennifer' }).locator('span').first().click();
  await page.locator('#headlessui-dialog-panel-v-0-4 div').filter({ hasText: 'StatusActiveALLActiveInactiveNothing matched your searchList is empty.Payroll' }).nth(1).click();
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
});

test('User able to edit actions - position', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Position' }).click();
  await page.getByRole('cell', { name: 'Andrews, David' }).click();
  await page.getByRole('row', { name: 'Admin 2020-11-06', exact: true }).getByRole('button').first().click();
  await page.getByRole('combobox').filter({ hasText: 'AdminAdminHRITNothing matched' }).locator('div').first().click();
  await page.getByRole('option', { name: 'IT Press enter to select' }).locator('span').first().click();
  await page.getByRole('button', { name: 'Update' }).click();
});

test('Record per page should able to change2 - position', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Position' }).click();
  await page.getByRole('combobox').locator('div').first().click();
  await page.getByRole('option', { name: '5', exact: true }).locator('span').first().click();
  await expect(page.locator('div').filter({ hasText: /^5$/ }).locator('span')).toBeVisible();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
  await page.getByRole('combobox').locator('div').first().click();
  await page.getByRole('option', { name: '10', exact: true }).locator('span').first().click();
  await expect(page.locator('div').filter({ hasText: /^10$/ }).locator('span')).toBeVisible();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
});

test('User should able to navigate back and forward arrow page - position', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Position' }).click();
  await page.getByRole('link', { name: ' Next' }).click();
  await page.getByRole('link', { name: ' Previous' }).click();
});

test('Total Records numbers should accurate to the list - position', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Position' }).click();
  await expect(page.getByText('Total Records:')).toBeVisible();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
});