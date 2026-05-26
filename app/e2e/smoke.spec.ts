import { test, expect } from '@playwright/test';

test.describe('EduPlus E2E Smoke Tests', () => {
  const pageErrors: Error[] = [];

  test.beforeEach(({ page }) => {
    pageErrors.length = 0;
    // Catch uncaught exceptions on the page
    page.on('pageerror', (exception) => {
      // Ignore WebKit cancelled/aborted fetch/CORS errors during navigation/unload
      if (exception.message && exception.message.includes('Fetch API cannot load') && exception.message.includes('due to access control checks')) {
        return;
      }
      pageErrors.push(exception);
    });
  });

  test.afterEach(() => {
    // Assert no uncaught JS errors occurred
    expect(pageErrors).toEqual([]);
  });

  test('Navigate to Home page and verify main elements', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation presence
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Check main branding/title
    await expect(page).toHaveTitle(/EduPlus/i);
  });

  test('Verify navigation to public pages', async ({ page }) => {
    const routes = [
      { path: '/about', expectedHeading: /About|Team|Advisory|Pedagogy|Who|We Are/i },
      { path: '/programs', expectedHeading: /Program|Discipline|Course/i },
      { path: '/council', expectedHeading: /Council|Advisory/i },
      { path: '/resources', expectedHeading: /Resource|Library|Insights|Knowledge/i },
      { path: '/connect', expectedHeading: /Connect|Contact|Consult/i },
      { path: '/pricing', expectedHeading: /Pricing|Plan|Investment/i },
      { path: '/login', expectedHeading: /Sign In|Login|Auth/i }
    ];

    for (const route of routes) {
      await page.goto(route.path);
      // Wait for layout and lazy-loaded content to fully render
      await page.waitForLoadState('networkidle');
      
      // Basic validation that we loaded the page and the container is visible
      const container = page.locator('#main-scroll-container');
      await expect(container).toBeVisible();

      // Verify expected heading is present inside the main content area
      const heading = container.locator('h1, h2, h3').first();
      await expect(heading).toContainText(route.expectedHeading, { timeout: 10000 });
    }
  });

  test('Pricing page interaction - plan type toggle', async ({ page }) => {
    await page.goto('/pricing');
    await page.waitForLoadState('domcontentloaded');

    // Find the toggle buttons
    const studentBtn = page.getByRole('button', { name: 'Student / Individual', exact: true });
    const instituteBtn = page.getByRole('button', { name: 'Institute / School', exact: true });

    await expect(studentBtn).toBeVisible();
    await expect(instituteBtn).toBeVisible();

    // Verify default state shows student plans
    await expect(page.getByText('₹999', { exact: true })).toBeVisible(); // Scholar student price
    await expect(page.getByText('₹24,999', { exact: true })).toHaveCount(0); // Professional institute price

    // Toggle to Institute plan
    await instituteBtn.click();

    // Verify state changes to show institute plans
    await expect(page.getByText('₹24,999', { exact: true })).toBeVisible();
    await expect(page.getByText('₹999', { exact: true })).toHaveCount(0);
  });

  test('Connect page interaction - basic scheduler load', async ({ page }) => {
    await page.goto('/connect');
    await page.waitForLoadState('domcontentloaded');

    // Click "Book Slot Now" to trigger modal scheduler
    const bookSlotBtn = page.getByRole('button', { name: /Book Slot Now/i }).first();
    await expect(bookSlotBtn).toBeVisible();
    await bookSlotBtn.click();

    // Verify dialog popup opens
    const dialogTitle = page.getByText(/Advisory Scheduler/i);
    await expect(dialogTitle).toBeVisible();

    // Verify steps are visible
    await expect(page.getByText(/Step 1: Select Advisor/i)).toBeVisible();
    await expect(page.getByText(/Step 2: Choose Date & Time/i)).toBeVisible();
  });
});
