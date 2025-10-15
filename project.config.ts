import process from 'node:process';

interface Config {
	readonly site: string;
	readonly base: string;
	readonly port: number;
}

export interface ConfigObject extends Config {
	fullSite: (trailingSlash?: boolean) => string;
}

const DefaultConfig: Config = {
	site: 'http://localhost',
	port: 8080,
	base: ''
};

function generateConfig(): ConfigObject {
	const { SITE_URL, SITE_BASE } = process.env;
	const SPLIT_REGEX = new RegExp(':(?!\\/)');
	const splitSiteUrl = SITE_URL?.split(SPLIT_REGEX);
	return {
		site: (splitSiteUrl ?? [DefaultConfig.site])[0],
		port: splitSiteUrl?.length > 1 ? Number.parseInt(splitSiteUrl[1]) : DefaultConfig.port,
		base: SITE_BASE ?? DefaultConfig.base,
		fullSite(trailingSlash?: boolean) {
			return `${this.site}:${this.port}/${this.base}${trailingSlash ? '/' : ''}`;
		}
	};
}

export default generateConfig();