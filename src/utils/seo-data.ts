import seoData from '../data/seo-data.json';

export interface Trade {
	slug: string;
	name: string;
	plural: string;
	title: string;
	description: string;
	keywords: string[];
}

export interface Location {
	slug: string;
	name: string;
	title: string;
	description: string;
	keywords: string[];
	relatedSearches?: string[];
	localContent?: string;
}

export interface SEOData {
	trades: Trade[];
	locations: Location[];
}

const data = seoData as SEOData;

export function getTrades(): Trade[] {
	return data.trades;
}

export function getLocations(): Location[] {
	return data.locations;
}

export function getTradeBySlug(slug: string): Trade | undefined {
	return data.trades.find((trade) => trade.slug === slug);
}

export function getLocationBySlug(slug: string): Location | undefined {
	return data.locations.find((location) => location.slug === slug);
}

export function getAllCombinations(): Array<{ trade: Trade; location: Location }> {
	const combinations: Array<{ trade: Trade; location: Location }> = [];
	for (const trade of data.trades) {
		for (const location of data.locations) {
			combinations.push({ trade, location });
		}
	}
	return combinations;
}

export function generateCombinationSlug(tradeSlug: string, locationSlug: string): string {
	return `${tradeSlug}-website-builders-in-${locationSlug}`;
}

export function parseCombinationSlug(slug: string): { tradeSlug: string; locationSlug: string } | null {
	const match = slug.match(/^(.+)-website-builders-in-(.+)$/);
	if (!match) {
		return null;
	}
	return {
		tradeSlug: match[1],
		locationSlug: match[2],
	};
}

export function getTradeUrl(tradeSlug: string): string {
	return `/trades/${tradeSlug}`;
}

export function getLocationUrl(locationSlug: string): string {
	return `/locations/${locationSlug}`;
}

export function getCombinationUrl(tradeSlug: string, locationSlug: string): string {
	return `/${generateCombinationSlug(tradeSlug, locationSlug)}`;
}




