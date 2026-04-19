import { test, expect } from '@playwright/test';

test.describe('Search Hero E2E Flow', () => {
	test.beforeEach(async ({ page }) => {
		// Intercept network requests to the Marvel API to prevent flakiness
		await page.route('**/v1/public/characters*', async (route) => {
			const url = route.request().url();
			if (url.includes('Spider-Man')) {
				await route.fulfill({
					status: 200,
					contentType: 'application/json',
					body: JSON.stringify({
						data: {
							results: [
								{
									id: 1009610,
									name: 'Spider-Man',
									thumbnail: { path: 'http://example.com/spider-man', extension: 'jpg' },
									description: 'Bitten by a radioactive spider.',
								},
							],
						},
					}),
				});
			} else if (url.includes('NonExistentHero123')) {
				await route.fulfill({
					status: 200,
					contentType: 'application/json',
					body: JSON.stringify({ data: { results: [] } }),
				});
			} else {
				await route.continue();
			}
		});
	});

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
		await searchInput.fill('NonExistentHero123');

		// 3. Validate empty state message
		await expect(page.getByText(/No entities found matching "NonExistentHero123"/i)).toBeVisible({ timeout: 10000 });
	});
});
