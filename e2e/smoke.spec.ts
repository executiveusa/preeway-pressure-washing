import { test, expect } from '@playwright/test';

test.describe('Preeway — Smoke Tests', () => {
  test('homepage loads with hero headline visible', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Preeway/i);
    const hero = page.locator('h1').first();
    await expect(hero).toBeVisible();
    await expect(hero).toContainText(/graffiti removal/i);
  });

  test('navigation links are present', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    const links = await page.locator('nav a').count();
    expect(links).toBeGreaterThan(0);
  });

  test('quote form renders all required fields', async ({ page }) => {
    await page.goto('/#quote');
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('/api/health returns ok', async ({ request }) => {
    const res = await request.get('/api/health');
    expect(res.ok()).toBeTruthy();
    const body = await res.json() as { status: string };
    expect(body.status).toBe('ok');
  });

  test('Spanish route /es loads', async ({ page }) => {
    await page.goto('/es');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('public AI files are accessible', async ({ request }) => {
    const llms = await request.get('/llms.txt');
    expect(llms.ok()).toBeTruthy();
    const profile = await request.get('/service-profile.json');
    expect(profile.ok()).toBeTruthy();
  });
});
