import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://theabbapayroll.com/login');
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('carldominiccueva@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password' }).fill('CDNC19960308.');
  await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password' }).fill('CDNC19960308.nico');
  await page.getByRole('button', { name: 'Sign In' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByText('Timesheet CorrectionsSep 1 - Oct 1400').click();
  const page1 = await page1Promise;
  await page1.goto('https://theabbapayroll.com/approvals/timesheet');
});