import { test, expect } from '@playwright/test';

// Reusable credentials and login helper for this spec file
const credentials = {
  email: 'heyitsnicoboy@gmail.com',
  password: 'CDNC19960308.nico',
};

async function loginpayroll(page) {
  await page.goto('https://theabbapayroll.com/login?redirectFrom=/');
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill(credentials.email);
  await page.getByRole('textbox', { name: 'Email Address' }).press('Tab');
  // Enter password (kept simple — avoid toggling CapsLock programmatically)
  await page.getByRole('textbox', { name: 'Password' }).fill(credentials.password);
  await page.getByRole('button', { name: 'Sign In' }).click();
}

// Ensure every test starts logged in
test.beforeEach(async ({ page }) => {
  await loginpayroll(page);
});

test('User should open Schedules', async ({ page }) => {
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Schedules' }).click();
});

test('User should able to change Date from and Date to', async ({ page }) => {
  // login handled in test.beforeEach
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Schedules' }).click();
  await page.locator('div').filter({ hasText: /^Date From$/ }).getByLabel('Calendar icon').click();
  await page.locator('[data-test-id="dp-2025-10-01"]').getByText('1').click();
  await page.locator('div').filter({ hasText: /^Date To$/ }).getByLabel('Calendar icon').click();
  await page.locator('[data-test-id="dp-2025-10-31"]').getByText('31').click();
});

test('User should able to clear selection date', async ({ page }) => {
  // login handled in test.beforeEach
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Schedules' }).click();
  await page.locator('div').filter({ hasText: /^Date From$/ }).getByLabel('Calendar icon').click();
  await page.locator('[data-test-id="dp-input"]').first().click();
  await page.locator('[data-test-id="dp-input"]').first().fill('/2025');
  await page.locator('[data-test-id="dp-input"]').first().press('ArrowRight');
  await page.locator('[data-test-id="dp-input"]').first().press('ArrowRight');
  await page.locator('[data-test-id="dp-input"]').first().press('ArrowRight');
  await page.locator('[data-test-id="dp-input"]').first().fill('');
  await page.locator('div').filter({ hasText: /^Date To$/ }).locator('[data-test-id="dp-input"]').click();
  await page.locator('[data-test-id="dp-input"]').nth(1).fill('/2025');
  await page.locator('[data-test-id="dp-input"]').nth(1).press('ArrowRight');
  await page.locator('[data-test-id="dp-input"]').nth(1).press('ArrowRight');
  await page.locator('[data-test-id="dp-input"]').nth(1).press('ArrowRight');
  await page.locator('[data-test-id="dp-input"]').nth(1).fill('');
});

test('User should able to populate schedules', async ({ page }) => {
  // login handled in test.beforeEach
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Schedules' }).click();
  await page.locator('div').filter({ hasText: /^Date To$/ }).locator('[data-test-id="dp-input"]').click();
  await page.locator('[data-test-id="dp-input"]').nth(1).fill('11/01/2025');
});

test.skip('User should import files', async ({ page }) => {
  // login handled in test.beforeEach
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Schedules' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: ' Import' }).click();
});

test.skip('User should export files', async ({ page }) => {
  // login handled in test.beforeEach
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Schedules' }).click();
  await page.getByRole('button', { name: '' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: ' Export' }).click();
  const page1 = await page1Promise;
});

test('User should able to click more options or 3 dots', async ({ page }) => {
  // login handled in test.beforeEach
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Schedules' }).click();
  await page.getByRole('button', { name: '' }).click();
});

test('Search button should able to be functional', async ({ page }) => {
  // login handled in test.beforeEach
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('textbox', { name: 'Search...' }).click();
  await page.getByRole('textbox', { name: 'Search...' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Search...' }).fill('D');
  await page.getByRole('textbox', { name: 'Search...' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Search...' }).fill('Dominador');
  await page.getByRole('textbox', { name: 'Search...' }).press('Enter');
  await expect(page.getByRole('cell', { name: 'Cueva, Dominador' })).toBeVisible();
});

test('Filter button should able to be functional', async ({ page }) => {
  // login handled in test.beforeEach
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Schedules' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('combobox').filter({ hasText: 'ALLEMP0355 - Andrews,' }).locator('div').nth(1).click();
  await page.getByText('EMP0355 - Andrews, David').click();
  await page.locator('#headlessui-dialog-panel-v-1-4 div').filter({ hasText: 'StatusActiveALLActiveInactiveNothing matched your searchList is empty.Payroll' }).nth(1).click();
  await page.getByRole('button', { name: 'Search' }).click();
});

test('Record per page should able to change', async ({ page }) => {
  // login handled in test.beforeEach
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Schedules' }).click();
  await page.getByRole('combobox').filter({ hasText: '1051020501005001000Nothing' }).locator('div').first().click();
  await page.getByRole('option', { name: '5', exact: true }).locator('span').first().click();
  await page.getByRole('combobox').filter({ hasText: '551020501005001000Nothing' }).locator('div').first().click();
  await page.getByRole('option', { name: '10', exact: true }).locator('span').first().click();
});

test('User should able to navigate back and forward arrow page', async ({ page }) => {
  // login handled in test.beforeEach
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Schedules' }).click();
  await page.getByRole('link', { name: ' Next' }).click();
  await page.getByRole('link', { name: ' Previous' }).click();
});

test('Total Records numbers should accurate to the list', async ({ page }) => {
  // login handled in test.beforeEach
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Schedules' }).click();
  await page.getByRole('combobox').filter({ hasText: '1051020501005001000Nothing' }).locator('div').first().click();
  await page.getByRole('option', { name: '5', exact: true }).locator('span').first().click();
  await expect(page.getByText('Total Records:')).toBeVisible();
});

test('User should able to change schedule of the employee', async ({ page }) => {
  // login handled in test.beforeEach
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Schedules' }).click();
  await page.locator('.multiselect__select').first().click();
});

test('User should navigate slider', async ({ page }) => {
  // login handled in test.beforeEach
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Schedules' }).click();
});

test('User should open "Employement types"', async ({ page }) => {
  // login handled in test.beforeEach
  await page.getByRole('link', { name: ' Employees' }).click();
  await page.getByRole('link', { name: ' Employment' }).click();
});