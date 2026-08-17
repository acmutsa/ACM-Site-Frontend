"use client";

import React, { useEffect, useRef, useState } from "react";
import EventCard from "@/components/events/EventCard";
import type { EventType } from "@/components/events/types";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";

interface EventGridProps {
	allEvents: EventType[];
	onEventClick: (event: EventType) => void;
}

export default function EventGridClient({
	allEvents,
	onEventClick,
}: EventGridProps) {
	const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
	const [currentPage, setCurrentPage] = useState(0);

	// 4 per page (2x2) below lg, 6 per page (3x2) at lg and up - maybe add md later?
	const [eventsPerPage, setEventsPerPage] = useState(4);

	const carouselRef = useRef<HTMLDivElement>(null);

	// Search state
	const [isSearchExpanded, setIsSearchExpanded] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const searchInputRef = useRef<HTMLInputElement>(null);

	// flip the page size at the lg breakpoint and snap back to the first page when it changes
	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 1024px)");

		const handleMediaChange = (
			event: MediaQueryList | MediaQueryListEvent,
		) => {
			setEventsPerPage(event.matches ? 6 : 4);
			setCurrentPage(0);
			carouselRef.current?.scrollTo({ left: 0, behavior: "auto" });
		};

		handleMediaChange(mediaQuery);
		mediaQuery.addEventListener("change", handleMediaChange);

		return () =>
			mediaQuery.removeEventListener("change", handleMediaChange);
	}, []);

	const filteredEvents = allEvents.filter((event) => {
		// Only show events matching the selected upcoming/past tab.
		if (event.status !== activeTab) {
			return false;
		}

		// Search by event title.
		if (
			searchQuery &&
			!event.title.toLowerCase().includes(searchQuery.toLowerCase())
		) {
			return false;
		}

		return true;
	});

	const pages: EventType[][] = [];

	for (let index = 0; index < filteredEvents.length; index += eventsPerPage) {
		pages.push(filteredEvents.slice(index, index + eventsPerPage));
	}

	const handleTabSwitch = (tab: "upcoming" | "past") => {
		setActiveTab(tab);
		setCurrentPage(0);

		carouselRef.current?.scrollTo({
			left: 0,
			behavior: "auto",
		});
	};

	const handleSearchChange = (value: string) => {
		setSearchQuery(value);
		setCurrentPage(0);

		carouselRef.current?.scrollTo({
			left: 0,
			behavior: "auto",
		});
	};

	const handleScroll = () => {
		if (!carouselRef.current) {
			return;
		}

		const { scrollLeft, clientWidth } = carouselRef.current;

		if (clientWidth === 0) {
			return;
		}

		const newPageIndex = Math.round(scrollLeft / clientWidth);

		if (newPageIndex !== currentPage) {
			setCurrentPage(newPageIndex);
		}
	};

	const scrollToPage = (index: number) => {
		if (!carouselRef.current) {
			return;
		}

		if (index < 0 || index >= pages.length) {
			return;
		}

		carouselRef.current.scrollTo({
			left: index * carouselRef.current.clientWidth,
			behavior: "smooth",
		});
	};

	return (
		<div className="flex h-full w-full flex-col">
			<div className="mb-8 flex shrink-0 flex-row items-stretch justify-end gap-2">
				{/* Search */}
				<div
					className={`relative flex items-center overflow-hidden rounded-md bg-acm-darker-blue transition-all duration-300 ease-in-out ${
						isSearchExpanded ? "w-full" : "w-[38px]"
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
							}
						}}
						className="flex aspect-square h-full w-[38px] shrink-0 items-center justify-center p-2 text-white"
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
							handleSearchChange(event.target.value)
						}
						className="h-full w-full bg-transparent py-0 pr-2 font-calsans text-sm leading-normal text-white placeholder-white/70 outline-none"
					/>

					{isSearchExpanded && (
						<button
							type="button"
							onClick={() => {
								setIsSearchExpanded(false);
								handleSearchChange("");
							}}
							className="flex shrink-0 items-center justify-center pr-2 text-white/70 hover:text-white"
							aria-label="Close event search"
						>
							<X size={16} strokeWidth={2.5} />
						</button>
					)}
				</div>

				{/* Upcoming/past tabs */}
				<div className="flex shrink-0 overflow-hidden rounded-md border-2 border-acm-darker-blue font-calsans text-sm font-bold">
					<button
						type="button"
						onClick={() => handleTabSwitch("upcoming")}
						className={`px-6 py-2 transition-colors ${
							activeTab === "upcoming"
								? "bg-acm-darker-blue text-white"
								: "bg-white text-acm-darker-blue hover:bg-acm-darker-blue/10"
						}`}
					>
						Upcoming
					</button>

					<button
						type="button"
						onClick={() => handleTabSwitch("past")}
						className={`px-6 py-2 transition-colors ${
							activeTab === "past"
								? "bg-acm-darker-blue text-white"
								: "bg-white text-acm-darker-blue hover:bg-acm-darker-blue/10"
						}`}
					>
						Past
					</button>
				</div>
			</div>

			{filteredEvents.length === 0 ? (
				<div className="relative flex w-full flex-1 flex-col">
					{/* The visible empty state UI */}
					<div className="absolute inset-0 z-10 flex w-full items-center justify-center rounded-2xl border-2 border-dashed border-acm-darker-blue/30 px-4 text-center font-mono text-2xl font-semibold text-acm-darker-blue">
						{searchQuery
							? `No ${activeTab} events match "${searchQuery}".`
							: `No ${activeTab} events found.`}
					</div>

					{/* The invisible skeleton forcing the dynamic height to stay stable */}
					<div
						className="pointer-events-none flex min-h-0 w-full flex-1 select-none flex-col items-center overflow-hidden opacity-0"
						aria-hidden="true"
					>
						<div className="relative flex min-h-0 w-full shrink-0 items-start">
							<div className="mx-auto grid w-full max-w-sm grid-cols-2 content-start justify-items-center gap-4 lg:max-w-none lg:grid-cols-3 lg:gap-6">
								{Array.from({ length: eventsPerPage }).map(
									(_, index) => (
										<div
											key={index}
											className="flex w-full min-w-0 flex-col"
										>
											<div className="mx-auto flex w-full flex-col gap-1">
												<div className="relative aspect-square w-full rounded-2xl" />
												<div className="flex flex-col">
													<h2 className="truncate font-calsans font-bold">
														&nbsp;
													</h2>
													<p className="font-calsans text-sm">
														&nbsp;
													</p>
													<p className="font-calsans text-sm">
														&nbsp;
													</p>
												</div>
											</div>
										</div>
									),
								)}
							</div>
						</div>
						{/* Invisible pagination space to keep the bottom gap identical */}
						<div className="flex w-full shrink-0 items-end justify-center gap-4 pb-2 pt-8">
							<div className="h-5 w-5" />
						</div>
					</div>
				</div>
			) : (
				<div className="flex min-h-0 w-full flex-1 flex-col items-center overflow-hidden">
					<div className="relative flex min-h-0 w-full shrink-0 items-start">
						{/* Event carousel */}
						<div
							ref={carouselRef}
							onScroll={handleScroll}
							className="flex w-full flex-1 snap-x snap-mandatory gap-6 overflow-x-auto no-scrollbar"
						>
							{pages.map((pageEvents, pageIndex) => (
								<div
									key={pageIndex}
									className="w-full shrink-0 snap-center"
								>
									<div className="mx-auto grid w-full max-w-sm grid-cols-2 content-start justify-items-center gap-4 lg:max-w-none lg:grid-cols-3 lg:gap-6">
										{pageEvents.map((event) => (
											<EventCard
												key={event.id}
												event={event}
												onClick={() =>
													onEventClick(event)
												}
											/>
										))}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Carousel navigation */}
					<div className="flex w-full shrink-0 items-end justify-center gap-4">
						{pages.length > 1 && (
							<>
								<button
									type="button"
									onClick={() =>
										scrollToPage(currentPage - 1)
									}
									disabled={currentPage === 0}
									className="flex cursor-pointer items-center justify-center text-acm-darker-blue transition-opacity duration-300 hover:opacity-70 disabled:pointer-events-none disabled:opacity-0"
									aria-label="Previous page of events"
								>
									<ChevronLeft strokeWidth={3} size={20} />
								</button>

								<div className="flex h-4 items-center justify-center">
									{pages.map((_, pageIndex) => {
										let dotClasses =
											"w-1.5 mx-1 opacity-100 scale-100";

										if (pages.length > 5) {
											if (currentPage <= 2) {
												if (pageIndex > 4) {
													dotClasses =
														"w-0 mx-0 opacity-0 scale-0 pointer-events-none";
												} else if (pageIndex === 4) {
													dotClasses =
														"w-1.5 mx-1 opacity-100 scale-[0.6]";
												}
											} else if (
												currentPage >=
												pages.length - 3
											) {
												if (
													pageIndex <
													pages.length - 5
												) {
													dotClasses =
														"w-0 mx-0 opacity-0 scale-0 pointer-events-none";
												} else if (
													pageIndex ===
													pages.length - 5
												) {
													dotClasses =
														"w-1.5 mx-1 opacity-100 scale-[0.6]";
												}
											} else {
												const distanceFromCurrentPage =
													Math.abs(
														pageIndex - currentPage,
													);

												if (
													distanceFromCurrentPage > 2
												) {
													dotClasses =
														"w-0 mx-0 opacity-0 scale-0 pointer-events-none";
												} else if (
													distanceFromCurrentPage ===
													2
												) {
													dotClasses =
														"w-1.5 mx-1 opacity-100 scale-[0.6]";
												}
											}
										}

										return (
											<button
												type="button"
												key={pageIndex}
												onClick={() =>
													scrollToPage(pageIndex)
												}
												className={`h-1.5 rounded-full transition-all duration-300 ease-out ${dotClasses} ${
													currentPage === pageIndex
														? "bg-acm-darker-blue"
														: "bg-acm-darker-blue/30 hover:bg-acm-darker-blue/60"
												}`}
												aria-label={`Go to event page ${
													pageIndex + 1
												}`}
											/>
										);
									})}
								</div>

								<button
									type="button"
									onClick={() =>
										scrollToPage(currentPage + 1)
									}
									disabled={currentPage === pages.length - 1}
									className="flex cursor-pointer items-center justify-center text-acm-darker-blue transition-opacity duration-300 hover:opacity-70 disabled:pointer-events-none disabled:opacity-0"
									aria-label="Next page of events"
								>
									<ChevronRight strokeWidth={3} size={20} />
								</button>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
