import { HeroNav } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import EventsClientWrapper from "@/components/events/events-client-wrapper";
import { getPortalEvents } from "@/lib/portal-api";
import { portalEventToEventType } from "@/lib/adapters/portal-event";

export default async function EventsPage() {
	const portalEvents = await getPortalEvents();
	const events = portalEvents.map(portalEventToEventType);

	return (
		<>
			<HeroNav navVariant="blueForeground" />

			<div className="mx-auto w-full max-w-screen-xl px-10 pb-24">
				<h1 className="font-chillax text-6xl font-black tracking-tight text-acm-darker-blue md:text-8xl">
					see what's happening.
				</h1>

				<p className="mt-4 max-w-[850px] font-mono text-sm font-semibold text-acm-darker-blue/70">
					Discover ways to meet, collaborate, and grow through our
					community-driven events.
				</p>

				<EventsClientWrapper allEvents={events} />
			</div>

			<Footer orgName="ACM UTSA" />
		</>
	);
}