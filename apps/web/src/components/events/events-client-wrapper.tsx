"use client";

import { useState } from "react";
import { EventType } from "@/components/events/types";
import EventPopup from "@/components/events/event-card-popup";
import EventGridClient from "@/components/events/event-grid-client";
import EventCalendar from "@/components/events/EventCalendar";

interface Props {
	allEvents: EventType[];
}

export default function EventsClientWrapper({ allEvents }: Props) {
	const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

	// naviagtion for popup
	const handleNext = () => {
		if (!selectedEvent) return;
		const currentIndex = allEvents.findIndex(
			(e) => e.id === selectedEvent.id,
		);
		if (currentIndex < allEvents.length - 1) {
			setSelectedEvent(allEvents[currentIndex + 1]);
		}
	};

	const handlePrev = () => {
		if (!selectedEvent) return;
		const currentIndex = allEvents.findIndex(
			(e) => e.id === selectedEvent.id,
		);
		if (currentIndex > 0) {
			setSelectedEvent(allEvents[currentIndex - 1]);
		}
	};

	const currentIndex = selectedEvent
		? allEvents.findIndex((e) => e.id === selectedEvent.id)
		: -1;
	const hasNext = currentIndex !== -1 && currentIndex < allEvents.length - 1;
	const hasPrev = currentIndex > 0;

	return (
		<>
			<div className="mx-auto mt-12 flex w-full max-w-screen-xl flex-col gap-8 pb-24 lg:flex-row lg:items-stretch">
				{/* calendar */}
				<div className="flex w-full flex-col lg:w-1/2">
					<div className="mb-8 hidden h-10 w-full shrink-0 lg:block" />

					<div className="flex w-full flex-1">
						<EventCalendar
							allEvents={allEvents}
							onEventClick={setSelectedEvent}
						/>
					</div>
				</div>

				{/* events grid */}
				<div className="w-full lg:w-1/2">
					<EventGridClient
						allEvents={allEvents}
						onEventClick={setSelectedEvent}
					/>
				</div>
			</div>

			{/* event popup */}
			<EventPopup
				event={selectedEvent}
				onClose={() => setSelectedEvent(null)}
				onNext={handleNext}
				onPrev={handlePrev}
				hasNext={hasNext}
				hasPrev={hasPrev}
			/>
		</>
	);
}
