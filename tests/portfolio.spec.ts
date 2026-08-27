import { test, expect } from '@playwright/test';

test('homepage loads and displays hero text without errors', async ({ page }) => {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (
        text.includes('Hydration') ||
        text.includes('hydration') ||
        text.includes('WebGL') ||
        text.includes('Minified React error')
      ) {
        errors.push(text);
      }
    }
  });

  page.on('pageerror', (err) => {
    const text = err.message;
    if (
      text.includes('Hydration') ||
      text.includes('hydration') ||
      text.includes('WebGL') ||
      text.includes('Minified React error')
    ) {
      errors.push(text);
    }
  });

  await page.goto('/');

  // Verify the homepage loads and the "Abhishek" hero text is visible.
  await expect(page.locator('text=Abhishek').first()).toBeVisible({ timeout: 10000 });

  // Verify that the Next.js app does not throw WebGL or hydration errors on mount.
  expect(errors).toEqual([]);
});
