import process from 'node:process';

interface Config {
	readonly site: string;
	readonly base: string;
	readonly port: number;
	readonly blinkPath: string;
	readonly geckoPath: string;
	readonly webkitPath: string;
}

export interface ConfigObject extends Config {
	fullSite: (trailingSlash?: boolean) => string;
}

const DefaultConfig: Config = {
	site: 'http://localhost',
	port: 8080,
	base: '',
	blinkPath: '/usr/bin/chromium',
	geckoPath: '/usr/bin/firefox',
	webkitPath: '/usr/bin/chromium' // TODO: Determine good Webkit default
};

function generateConfig(): ConfigObject {
	const { SITE_URL, SITE_BASE, EXEC_PATH_BLINK, EXEC_PATH_GECKO, EXEC_PATH_WEBKIT } = process.env;
	const SPLIT_REGEX = new RegExp(':(?!\\/)');
	const splitSiteUrl = SITE_URL?.split(SPLIT_REGEX);
	return {
		site: (splitSiteUrl ?? [DefaultConfig.site])[0],
		port: splitSiteUrl?.length > 1 ? Number.parseInt(splitSiteUrl[1]) : DefaultConfig.port,
		base: SITE_BASE ?? DefaultConfig.base,
		blinkPath: EXEC_PATH_BLINK ?? DefaultConfig.blinkPath,
		geckoPath: EXEC_PATH_GECKO ?? DefaultConfig.geckoPath,
		webkitPath: EXEC_PATH_WEBKIT ?? DefaultConfig.webkitPath,
		fullSite(trailingSlash?: boolean) {
			return `${this.site}:${this.port}/${this.base}${trailingSlash ? '/' : ''}`;
		}
	};
}

export default generateConfig();