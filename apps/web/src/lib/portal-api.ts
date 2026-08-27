import type { PortalEvent } from "@/components/events/types";

const API_URLS = [
	"https://api.portal.acmutsa.org",
	"http://localhost:4000",
	"https://newportalapi-production.up.railway.app",
];

export async function getPortalEvents(): Promise<PortalEvent[]> {
	let lastError: unknown;

	for (const baseUrl of API_URLS) {
		try {
			const response = await fetch(`${baseUrl}/api/events`, {
				method: "GET",
				headers: {
					Accept: "application/json",
				},
				cache: "no-store",
			});

			if (!response.ok) {
				throw new Error(
					`${baseUrl} returned ${response.status} ${response.statusText}`,
				);
			}

			const data: unknown = await response.json();

			if (!Array.isArray(data)) {
				throw new Error(
					`${baseUrl}/api/events did not return an array`,
				);
			}

			return data as PortalEvent[];
		} catch (error) {
			console.warn(`Could not load events from ${baseUrl}:`, error);
			lastError = error;
		}
	}

	throw new Error(
		`Could not load events from the deployed or local NewPortal API: ${String(
			lastError,
		)}`,
	);
}