import type { EventType, PortalEvent } from "@/components/events/types";

/**
 * Supports timestamps supplied in either seconds or milliseconds.
 */
function normalizeTimestamp(timestamp: number): number {
	return timestamp < 10_000_000_000 ? timestamp * 1000 : timestamp;
}

export function portalEventToEventType(event: PortalEvent): EventType {
	const startTimestamp = normalizeTimestamp(event.start);
	const endTimestamp = normalizeTimestamp(event.end);

	return {
		id: event.id,
		title: event.name,
		date: new Date(startTimestamp).toISOString(),
		location: event.location ?? undefined,
		status: endTimestamp < Date.now() ? "past" : "upcoming",
		description: event.description ?? undefined,
		imageUrl: event.thumbnailUrl ?? undefined,
	};
}
