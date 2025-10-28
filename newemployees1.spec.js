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

test.skip('User should import files - employment', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Employment' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: ' Import' }).click();
});

test.skip('User should export files - employment', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Employment' }).click();
  await page.getByRole('button', { name: '' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: ' Export' }).click();
  const page1 = await page1Promise;
});

test.skip('User should export details files - employment', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Employment' }).click();
  await page.getByRole('button', { name: '' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: ' Export Details' }).click();
  const page1 = await page1Promise;
});

test('User should able to click more options or 3 dots - employment', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Employment' }).click();
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByRole('button', { name: ' Export' })).toBeVisible();
  await expect(page.getByRole('button', { name: ' Export Details' })).toBeVisible();
  await expect(page.getByRole('button', { name: ' Import' })).toBeVisible();
});

test('Record per page should able to change - employment', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Employment' }).click();
  await page.getByRole('combobox').locator('div').first().click();
  await page.getByRole('option', { name: '5', exact: true }).locator('span').first().click();
  await expect(page.locator('div').filter({ hasText: /^5$/ }).locator('span')).toBeVisible();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
  await page.getByRole('combobox').locator('div').first().click();
  await page.getByRole('option', { name: '10', exact: true }).locator('span').first().click();
  await expect(page.locator('div').filter({ hasText: /^10$/ }).locator('span')).toBeVisible();
  await expect(page.getByRole('main').filter({ hasText: 'Employees' }).getByRole('main')).toBeVisible();
});

test('Search button should able to be functional - employment', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Employment' }).click();
  await page.getByRole('textbox', { name: 'Search...' }).click();
  await page.getByRole('textbox', { name: 'Search...' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Search...' }).fill('D');
  await page.getByRole('textbox', { name: 'Search...' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Search...' }).fill('Dominador');
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByRole('cell', { name: 'Cueva, Dominador' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Search...' })).toBeVisible();
});

test('Filter button should able to be functional - employment', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Employment' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('combobox').filter({ hasText: 'ALLEMP0355 - Andrews,' }).locator('div').nth(1).click();
  await page.getByText('EMP0355 - Andrews, David').click();
  await page.locator('#headlessui-dialog-panel-v-0-4 div').filter({ hasText: 'StatusActiveALLActiveInactiveNothing matched your searchList is empty.Payroll' }).nth(1).click();
  await page.getByRole('button', { name: 'Search' }).click();
});

test('User should open locations', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Locations' }).click();
  await expect(page.getByRole('heading', { name: 'Employee Locations' })).toBeVisible();
});

test.skip('User should import files - locations', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Locations' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: ' Import' }).click();
});

test.skip('User should export files - locations', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Locations' }).click();
  await page.getByRole('button', { name: '' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: ' Export' }).click();
  const page1 = await page1Promise;
});

test.skip('User should export details files - locations', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Locations' }).click();
  await page.getByRole('button', { name: '' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: ' Export Details' }).click();
  const page1 = await page1Promise;
});

test('User should able to click more options or 3 dots - locations', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Locations' }).click();
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByRole('button', { name: ' Export' })).toBeVisible();
  await expect(page.getByRole('button', { name: ' Export Details' })).toBeVisible();
  await expect(page.getByRole('button', { name: ' Import' })).toBeVisible();
});

test('Record per page should able to change - locations', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Locations' }).click();
  await page.getByRole('combobox').locator('div').first().click();
  await page.getByText('5', { exact: true }).click();
  await expect(page.locator('div').filter({ hasText: /^5$/ }).locator('span')).toBeVisible();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
  await page.getByRole('combobox').locator('div').first().click();
  await page.getByRole('option', { name: '10', exact: true }).locator('span').first().click();
  await expect(page.locator('div').filter({ hasText: /^10$/ }).locator('span')).toBeVisible();
  await expect(page.locator('.bg-white.border > .p-4')).toBeVisible();
});

test('Search button should able to be functional - locations', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Locations' }).click();
  await page.getByRole('textbox', { name: 'Search...' }).click();
  await page.getByRole('textbox', { name: 'Search...' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Search...' }).fill('D');
  await page.getByRole('textbox', { name: 'Search...' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Search...' }).fill('Dominador');
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByRole('textbox', { name: 'Search...' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Cueva, Dominador' })).toBeVisible();
});

test('Filter button should able to be functional - locations', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Locations' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('combobox').filter({ hasText: 'ALLEMP0355 - Andrews,' }).locator('div').nth(1).click();
  await page.getByRole('option', { name: 'EMP0355 - Andrews, David' }).locator('span').first().click();
  await page.locator('#headlessui-dialog-panel-v-0-4 div').filter({ hasText: 'StatusActiveALLActiveInactiveNothing matched your searchList is empty.Payroll' }).nth(1).click();
  await page.getByRole('button', { name: 'Search' }).click();
});

test('User able to edit actions', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Locations' }).click();
  await page.getByRole('cell', { name: 'Andrews, David' }).click();
  await page.getByRole('row', { name: 'Main 2020-11-06', exact: true }).getByRole('button').first().click();
  await page.getByRole('combobox').filter({ hasText: 'MainMainNothing matched your' }).locator('div').first().click();
  await page.getByRole('option', { name: 'Main Press enter to select' }).locator('span').first().click();
  await page.getByRole('button', { name: 'Update' }).click();
});