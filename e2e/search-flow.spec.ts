import { test, expect } from '@playwright/test';

test.describe('Search Hero E2E Flow', () => {
	test('User can search for a hero and navigate to details', async ({ page }) => {
		// 1. Visit Homepage
		await page.goto('/');

		// Validate Homepage loads
		await expect(page.getByRole('heading', { name: /Explore the Multiverse/i })).toBeVisible();

		// 2. Type into Search
		const searchInput = page.getByRole('searchbox', { name: /Search Marvel Characters/i });
		await searchInput.fill('Spider-Man');

		// 3. Wait for debounce and search results
		const resultCard = page.getByRole('link', { name: /View details for Spider-Man/i });
		await expect(resultCard).toBeVisible({ timeout: 10000 });

		// 4. Click result and verify navigation
		await resultCard.click();
		await expect(page).toHaveURL(/\/hero\/\d+/);

		// 5. Verify Hero details page renders Name
		await expect(page.getByText('Spider-Man', { exact: true })).toBeVisible({ timeout: 10000 });
	});

	test('User sees empty state for unknown heroes', async ({ page }) => {
		// 1. Visit Homepage
		await page.goto('/');

		// 2. Search for non-existent hero
		const searchInput = page.getByRole('searchbox', { name: /Search Marvel Characters/i });
		await searchInput.fill('UnknownHero12345XYZ');

		// 3. Validate empty state message
		await expect(page.getByText(/No entities found matching "UnknownHero12345XYZ"/i)).toBeVisible({ timeout: 10000 });
	});
});
