"use client";

import React, { useEffect, useRef, useState } from "react";
import EventCard from "@/components/events/EventCard";
import type { EventType } from "@/components/events/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EventGridProps {
	events: EventType[];
	onEventClick: (event: EventType) => void;
}

export default function EventGridClient({
	events,
	onEventClick,
}: EventGridProps) {
	const [currentPage, setCurrentPage] = useState(0);

	// 4 per page (2x2) below lg, 6 per page (3x2) at lg and up
	const [eventsPerPage, setEventsPerPage] = useState(4);

	const carouselRef = useRef<HTMLDivElement>(null);

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

	// jump back to the first page whenever the passed-in events change
	useEffect(() => {
		setCurrentPage(0);
		carouselRef.current?.scrollTo({ left: 0, behavior: "auto" });
	}, [events]);

	const pages: EventType[][] = [];

	for (let index = 0; index < events.length; index += eventsPerPage) {
		pages.push(events.slice(index, index + eventsPerPage));
	}

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
			{events.length === 0 ? (
				<div className="relative flex w-full flex-1 flex-col">
					{/* The visible empty state UI */}
					<div className="absolute inset-0 z-10 flex w-full items-center justify-center rounded-2xl border-2 border-dashed border-acm-darker-blue/30 px-4 text-center font-mono text-2xl font-semibold text-acm-darker-blue">
						No events found.
					</div>

					{/* The invisible skeleton forcing the dynamic height to stay stable */}
					<div
						className="pointer-events-none flex min-h-0 w-full flex-1 select-none flex-col items-center overflow-hidden opacity-0"
						aria-hidden="true"
					>
						<div className="relative flex min-h-0 w-full shrink-0 items-start">
							{/* CHANGED: Removed max-w-sm, mx-auto, and justify-items-center so it scales perfectly with the calendar */}
							<div className="grid w-full grid-cols-2 content-start gap-4 lg:grid-cols-3 lg:gap-6">
								{Array.from({ length: eventsPerPage }).map(
									(_, index) => (
										<div
											key={index}
											className="flex w-full min-w-0 flex-col"
										>
											<div className="flex w-full flex-col gap-1">
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
									{/* CHANGED: Removed max-w-sm, mx-auto, and justify-items-center so it scales perfectly with the calendar */}
									<div className="grid w-full grid-cols-2 content-start gap-4 lg:grid-cols-3 lg:gap-6">
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
					<div className="flex w-full shrink-0 items-end justify-center gap-4 pb-2 pt-8">
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
