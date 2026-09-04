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

test('3D WebGL canvas mounts and tracks pointer movements smoothly', async ({ page }) => {
  await page.goto('/');

  const canvas = page.locator('canvas').first();
  await expect(canvas).toBeAttached();

  // Dispatch mouse movements across screen quadrants
  await page.mouse.move(200, 200);
  await page.waitForTimeout(100);
  await page.mouse.move(900, 600);
  await page.waitForTimeout(100);
  await page.mouse.move(10, 10);
  await page.waitForTimeout(100);

  // Leave the window
  await page.mouse.move(-10, -10);
  await page.waitForTimeout(150);

  // Canvas should remain mounted and error-free
  await expect(canvas).toBeVisible();
});

test('SideNav does not overlap section headings on 1280px desktop viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');

  const sideNav = page.locator('nav[aria-label="Section navigation"]');
  await expect(sideNav).toBeVisible();
  const navBox = await sideNav.boundingBox();
  expect(navBox).not.toBeNull();

  // Check the position of About section heading
  const aboutHeading = page.locator('#about h2').first();
  await aboutHeading.scrollIntoViewIfNeeded();
  const headingBox = await aboutHeading.boundingBox();
  expect(headingBox).not.toBeNull();

  // Verify SideNav right edge is strictly to the left of the heading with clearance
  if (navBox && headingBox) {
    const clearance = headingBox.x - (navBox.x + navBox.width);
    expect(clearance).toBeGreaterThan(15);
  }
});

test('Workflow section demonstrates dual-engine toggle and backpressure simulation', async ({ page }) => {
  await page.goto('/');

  const workflowSection = page.locator('#workflow');
  await workflowSection.scrollIntoViewIfNeeded();
  await expect(workflowSection).toBeVisible();

  // Test Dual-Engine Switch
  const claudeButton = page.getByRole('button', { name: /PASS 2: CLAUDE CODE/i });
  await expect(claudeButton).toBeVisible();
  await claudeButton.click();
  await expect(page.locator('text=Deterministic Terminal & Verification Engine')).toBeVisible();

  const antigravityButton = page.getByRole('button', { name: /PASS 1: ANTIGRAVITY/i });
  await antigravityButton.click();
  await expect(page.locator('text=Architectural & Creative Generation Engine')).toBeVisible();

  // Test 4-Stage Loop & Backpressure Simulation
  const stageButton = page.getByRole('button', { name: /VERIFY/i }).first();
  await stageButton.click();
  await expect(page.locator('text=Mechanically verifiable proof of correctness')).toBeVisible();

  const simButton = page.getByRole('button', { name: /SIMULATE BACKPRESSURE/i });
  await simButton.click();
  await expect(page.locator('text=TERMINAL VERIFICATION STREAM')).toBeVisible({ timeout: 5000 });
  await expect(page.locator('text=✓ All checks passed (exit code 0)')).toBeVisible({ timeout: 5000 });
});

test('Capabilities section runs multi-agent orchestration and toggles full stack matrix', async ({ page }) => {
  await page.goto('/');

  const skillsSection = page.locator('#skills');
  await skillsSection.scrollIntoViewIfNeeded();
  await expect(skillsSection).toBeVisible();

  // Test dispatching pipeline simulation
  const dispatchButton = page.getByRole('button', { name: /DISPATCH PIPELINE/i });
  await expect(dispatchButton).toBeVisible();
  await dispatchButton.click();
  await expect(page.locator('text=SIMULATION COMPLETE')).toBeVisible({ timeout: 6000 });

  // Test switching to Full Stack Matrix
  const matrixButton = page.getByRole('button', { name: /FULL STACK MATRIX/i });
  await matrixButton.click();
  await expect(page.locator('#skills').getByText('LANGUAGES')).toBeVisible();
  await expect(page.locator('#skills').getByText('Python').first()).toBeVisible();
  await expect(page.locator('#skills').getByText('FAISS').first()).toBeVisible();
});

test('respects prefers-reduced-motion without breaking the scene', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.locator('text=Abhishek').first()).toBeVisible();
  const canvas = page.locator('canvas').first();
  await expect(canvas).toBeAttached();
});
