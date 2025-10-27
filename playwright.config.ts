import { defineConfig, devices } from '@playwright/test';
import process from 'node:process';

import PROJECT_CONFIG from './project.config.ts';

export default defineConfig({
	testDir: 'test',
	fullyParallel: true,
	use: {
		baseURL: PROJECT_CONFIG.fullSite(true),
	},
	projects: [
		{
			name: 'chrome',
			use: {
				...devices['Desktop Chrome'],
				launchOptions: {
					executablePath: PROJECT_CONFIG.blinkPath
				}
			}
		},
		{
			name: 'safari',
			use: { ...devices['Desktop Safari'] }
		}
	],
	webServer: {
		command: 'yarn run preview',
		url: `${PROJECT_CONFIG.fullSite(true)}`,
		timeout: 120 * 1000,
		reuseExistingServer: !process.env.CI
	}
});