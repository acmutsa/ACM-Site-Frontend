"use client";

import { useState, useRef } from "react";
import { Search, X, Calendar } from "lucide-react";
import { EventType } from "@/components/events/types";
import EventPopup from "@/components/events/event-card-popup";
import EventGridClient from "@/components/events/event-grid-client";
import EventCalendar from "@/components/events/EventCalendar";

interface Props {
	allEvents: EventType[];
}

export default function EventsClientWrapper({ allEvents }: Props) {
	const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

	const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
	const [searchQuery, setSearchQuery] = useState("");

	const [isSearchExpanded, setIsSearchExpanded] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);

	const [currentDate, setCurrentDate] = useState(new Date());

	const filteredEvents = allEvents.filter((event) => {
		// Filter by tab
		if (event.status !== activeTab) {
			return false;
		}

		// Filter by search query
		if (
			searchQuery &&
			!event.title.toLowerCase().includes(searchQuery.toLowerCase())
		) {
			return false;
		}

		return true;
	});

	// navigation for popup
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
			<div className="mx-auto mt-12 flex w-full max-w-screen-xl flex-col pb-24">
				{/* Unified Responsive Header */}
				{/* CHANGED: Flex row on mobile, 2-column Grid on desktop to match the layout below */}
				<div className="mb-8 flex w-full flex-row items-center justify-between gap-2 sm:gap-4 lg:grid lg:grid-cols-2 lg:gap-8">
					{/* Left: Search */}
					{/* flex-1 on mobile allows it to push against the tabs, lg:flex-none prevents that on desktop */}
					<div className="flex h-11 min-w-0 flex-1 items-center justify-start lg:flex-none">
						<div
							className={`relative flex h-full w-full items-center overflow-hidden rounded-lg bg-acm-darker-blue transition-[max-width] duration-300 ease-in-out ${
								isSearchExpanded
									? "max-w-[1000px]"
									: "max-w-[44px]"
							}`}
						>
							<button
								type="button"
								onClick={() => {
									if (!isSearchExpanded) {
										setIsSearchExpanded(true);

										setTimeout(() => {
											searchInputRef.current?.focus();
										}, 100);
									} else {
										setIsSearchExpanded(false);
										setSearchQuery("");
									}
								}}
								className="flex aspect-square h-full shrink-0 items-center justify-center p-2 text-white"
								aria-label="Search events"
							>
								<Search strokeWidth={2.5} size={20} />
							</button>

							<input
								ref={searchInputRef}
								type="text"
								placeholder="Search events..."
								value={searchQuery}
								onChange={(event) =>
									setSearchQuery(event.target.value)
								}
								className="h-full w-full bg-transparent py-0 pr-2 font-calsans text-sm leading-normal text-white placeholder-white/70 outline-none"
							/>

							{isSearchExpanded && (
								<button
									type="button"
									onClick={() => {
										setIsSearchExpanded(false);
										setSearchQuery("");
									}}
									className="flex shrink-0 items-center justify-center pr-3 text-white/70 hover:text-white"
									aria-label="Close event search"
								>
									<X size={16} strokeWidth={2.5} />
								</button>
							)}
						</div>
					</div>

					{/* Right: Tabs & Today Button */}
					<div className="flex h-11 shrink-0 items-center justify-end gap-2 sm:gap-4">
						{/* Upcoming/Past Tabs */}
						<div className="flex h-full shrink-0 overflow-hidden rounded-lg border-2 border-acm-darker-blue font-calsans text-sm font-bold">
							<button
								type="button"
								onClick={() => setActiveTab("upcoming")}
								className={`flex h-full items-center px-4 transition-colors sm:px-6 ${
									activeTab === "upcoming"
										? "bg-acm-darker-blue text-white"
										: "bg-white text-acm-darker-blue hover:bg-acm-darker-blue/10"
								}`}
							>
								Upcoming
							</button>

							<button
								type="button"
								onClick={() => setActiveTab("past")}
								className={`flex h-full items-center px-4 transition-colors sm:px-6 ${
									activeTab === "past"
										? "bg-acm-darker-blue text-white"
										: "bg-white text-acm-darker-blue hover:bg-acm-darker-blue/10"
								}`}
							>
								Past
							</button>
						</div>

						{/* Today Button */}
						<div className="group relative flex h-full shrink-0">
							<button
								type="button"
								onClick={() => setCurrentDate(new Date())}
								className="flex aspect-square h-full items-center justify-center rounded-lg bg-acm-darker-blue text-white transition-opacity hover:opacity-80"
								aria-label="Go to today"
							>
								<Calendar strokeWidth={2.5} size={20} />
							</button>
							{/* Tooltip */}
							<div className="pointer-events-none absolute -top-10 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
								<span className="whitespace-nowrap rounded-md bg-acm-darker-blue px-2.5 py-1 font-calsans text-xs text-white shadow-sm">
									Go to today
								</span>
								<div className="h-1.5 w-1.5 -translate-y-0.5 rotate-45 bg-acm-darker-blue" />
							</div>
						</div>
					</div>
				</div>

				{/* 2-Column Content Grid */}
				<div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
					{/* Calendar */}
					<div className="flex w-full min-w-0 flex-col">
						<div className="flex min-h-0 w-full flex-1">
							<EventCalendar
								allEvents={allEvents}
								onEventClick={setSelectedEvent}
								currentDate={currentDate}
								setCurrentDate={setCurrentDate}
							/>
						</div>
					</div>

					{/* Events Grid */}
					<div className="flex w-full min-w-0 flex-col">
						<div className="flex min-h-0 w-full flex-1">
							<EventGridClient
								events={filteredEvents}
								onEventClick={setSelectedEvent}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Event Popup */}
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
