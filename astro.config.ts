import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pwa from '@vite-pwa/astro';

import PROJECT_CONFIG from './project.config.ts';

// https://astro.build/config
export default defineConfig({
	site: `${PROJECT_CONFIG.site}:${PROJECT_CONFIG.port}`,
	base: PROJECT_CONFIG.base,
	integrations: [mdx(), sitemap(), pwa()],
	server: {
		port: PROJECT_CONFIG.port,
		host: true,
	},
	vite: {
		server: {
			watch: {
				usePolling: true,
				interval: 10000
			}
		}
	}
});
