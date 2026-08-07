"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { EventType } from "@/components/events/types";

// TODO: button to go back to current day?
// TODO: idk if i want the blur and blue behind the popup - ask

interface EventCalendarProps {
	allEvents: EventType[];
	onEventClick: (event: EventType) => void;
}

// main calendar
export default function EventCalendar({
	allEvents,
	onEventClick,
}: EventCalendarProps) {
	const [isMounted, setIsMounted] = useState(false);
	const [currentDate, setCurrentDate] = useState(new Date());

	const [popupCell, setPopupCell] = useState<any | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [displayCell, setDisplayCell] = useState<any | null>(null);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (popupCell) {
			setDisplayCell(popupCell);
			setTimeout(() => setIsPopupOpen(true), 10);
		} else {
			setIsPopupOpen(false);
			const timer = setTimeout(() => setDisplayCell(null), 150);
			return () => clearTimeout(timer);
		}
	}, [popupCell]);

	if (!isMounted) {
		return (
			<div className="h-full min-h-[300px] w-full rounded-2xl bg-acm-darker-blue"></div>
		);
	}

	const actualToday = new Date();
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const firstDayOfMonth = new Date(year, month, 1);

	const startOfView = new Date(
		firstDayOfMonth.getFullYear(),
		firstDayOfMonth.getMonth(),
		firstDayOfMonth.getDate() - firstDayOfMonth.getDay(),
	);

	const calendarCells = [];
	for (let i = 0; i < 28; i++) {
		const cellDate = new Date(
			startOfView.getFullYear(),
			startOfView.getMonth(),
			startOfView.getDate() + i,
		);

		const isToday =
			cellDate.getDate() === actualToday.getDate() &&
			cellDate.getMonth() === actualToday.getMonth() &&
			cellDate.getFullYear() === actualToday.getFullYear();

		const isCurrentMonth = cellDate.getMonth() === month;

		const eventsOnThisDay = allEvents.filter((event) => {
			if (!event.date) return false;
			const eventDate = new Date(event.date);
			return (
				eventDate.getFullYear() === cellDate.getFullYear() &&
				eventDate.getMonth() === cellDate.getMonth() &&
				eventDate.getDate() === cellDate.getDate()
			);
		});

		calendarCells.push({
			day: cellDate.getDate(),
			dateObj: cellDate,
			isToday: isToday,
			isCurrentMonth: isCurrentMonth,
			events: eventsOnThisDay,
		});
	}

	const handlePrev = () => {
		setCurrentDate(new Date(year, month - 1, 1));
		setPopupCell(null);
	};

	const handleNext = () => {
		setCurrentDate(new Date(year, month + 1, 1));
		setPopupCell(null);
	};

	const monthName = firstDayOfMonth.toLocaleString("default", {
		month: "long",
	});
	const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

	return (
		<div className="relative flex h-full min-h-0 w-full flex-col rounded-2xl bg-acm-darker-blue bg-[url('/img/landing/noise.png')] bg-center p-4 sm:p-6">
			{/* more events popup */}
			{displayCell && (
				<div
					className={`absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-acm-darker-blue/30 p-4 backdrop-blur-sm transition-opacity duration-150 ease-in-out sm:p-6 ${
						isPopupOpen ? "opacity-100" : "opacity-0"
					}`}
					onClick={() => setPopupCell(null)}
				>
					<div
						className={`flex max-h-full w-full max-w-sm flex-col overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-150 ease-in-out ${
							isPopupOpen
								? "translate-y-0 opacity-100"
								: "translate-y-4 opacity-0"
						}`}
						onClick={(e) => e.stopPropagation()}
					>
						{/* popup header */}
						<div className="relative flex items-center px-4 pb-0 pt-3">
							<h3 className="pr-8 font-calsans text-lg font-bold text-acm-darker-blue">
								{displayCell.dateObj.toLocaleDateString(
									"en-US",
									{
										month: "short",
										day: "numeric",
									},
								)}
							</h3>
							<button
								onClick={() => setPopupCell(null)}
								className="absolute right-3 top-3 text-acm-darker-blue/50 transition-colors hover:text-acm-darker-blue"
							>
								<X size={20} strokeWidth={2.5} />
							</button>
						</div>

						{/* popup events */}
						<div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4 no-scrollbar">
							{displayCell.events.map((event: any) => {
								// calculate if event has already past
								const today = new Date();
								today.setHours(0, 0, 0, 0);
								const isCellInPast =
									displayCell.dateObj < today;

								return (
									<button
										key={event.id}
										onClick={() => {
											setPopupCell(null);
											onEventClick(event);
										}}
										className="w-full text-left"
									>
										<CalendarEventPill
											title={event.title}
											isPast={
												isCellInPast ||
												event.status === "past"
											}
										/>
									</button>
								);
							})}
						</div>
					</div>
				</div>
			)}

			{/* calendar months header */}
			<div className="mb-6 flex shrink-0 items-center justify-between px-2 text-white">
				<button
					onClick={handlePrev}
					className="flex cursor-pointer items-center justify-center transition-opacity hover:opacity-70"
				>
					<ChevronLeft strokeWidth={2.5} size={28} />
				</button>
				<h2 className="font-calsans text-2xl font-bold sm:text-3xl">
					{monthName} {year}
				</h2>
				<button
					onClick={handleNext}
					className="flex cursor-pointer items-center justify-center transition-opacity hover:opacity-70"
				>
					<ChevronRight strokeWidth={2.5} size={28} />
				</button>
			</div>

			{/* days of the week row */}
			<div className="mb-2 grid shrink-0 grid-cols-7 text-white">
				{daysOfWeek.map((day) => (
					<div
						key={day}
						className="text-center font-calsans text-xs font-bold uppercase tracking-wider sm:text-sm"
					>
						{day}
					</div>
				))}
			</div>

			{/* days grid */}
			<div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-7 gap-1.5 sm:gap-2">
				{calendarCells.map((cell, index) => (
					<CalendarCell
						key={index}
						cell={cell}
						onEventClick={onEventClick}
						onOpenPopup={() => setPopupCell(cell)}
					/>
				))}
			</div>
		</div>
	);
}

// calendar cells
function CalendarCell({
	cell,
	onEventClick,
	onOpenPopup,
}: {
	cell: any;
	onEventClick: (e: EventType) => void;
	onOpenPopup: () => void;
}) {
	const showExpandPill = cell.events.length > 2;
	const visibleEvents = showExpandPill
		? cell.events.slice(0, 1)
		: cell.events;

	// calculate if event has already past
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const isCellInPast = cell.dateObj < today;

	return (
		<div
			className={`flex h-full min-h-0 w-full flex-col items-start justify-start overflow-hidden rounded-lg font-bold shadow-sm
                ${cell.isCurrentMonth ? "bg-white" : "bg-white/60"}
                ${cell.isToday ? "ring-2 ring-acm-darker-blue/30" : ""}
            `}
		>
			<div className="flex w-full shrink-0 justify-start p-1 pb-0 sm:p-1.5 sm:pb-0">
				<span
					className={`flex items-center justify-center rounded text-sm sm:text-base ${
						cell.isToday
							? "h-7 w-7 bg-acm-darker-blue text-white sm:h-8 sm:w-8"
							: cell.isCurrentMonth
								? "h-7 w-7 text-acm-darker-blue sm:h-8 sm:w-8"
								: "h-7 w-7 text-acm-darker-blue/50 sm:h-8 sm:w-8"
					}`}
				>
					{cell.day}
				</span>
			</div>

			<div className="flex w-full flex-1 flex-col gap-1 overflow-hidden px-1.5 pb-1.5 pt-0.5 sm:px-2 sm:pb-2">
				{visibleEvents.map((event: any) => (
					<button
						key={event.id}
						onClick={(e) => {
							e.stopPropagation();
							onEventClick(event);
						}}
						className="w-full shrink-0 text-left"
					>
						<CalendarEventPill
							title={event.title}
							isPast={isCellInPast || event.status === "past"}
						/>
					</button>
				))}

				{showExpandPill && (
					<button
						onClick={(e) => {
							e.stopPropagation();
							onOpenPopup();
						}}
						className="w-full shrink-0 truncate rounded bg-acm-darker-blue/10 px-1.5 py-0.5 text-center text-[10px] font-bold text-acm-darker-blue/60 transition-colors hover:bg-acm-darker-blue/20 sm:text-xs"
					>
						+{cell.events.length - 1} more
					</button>
				)}
			</div>
		</div>
	);
}

// event pill
interface CalendarEventPillProps {
	title: string;
	isPast: boolean;
}

function CalendarEventPill({ title, isPast }: CalendarEventPillProps) {
	return (
		<div
			className={`w-full truncate rounded px-1.5 py-0.5 text-[10px] font-bold sm:text-xs 
                ${
					isPast
						? "bg-acm-darker-blue/10 text-acm-darker-blue/40 line-through"
						: "bg-acm-darker-blue/20 text-acm-darker-blue"
				}
            `}
			title={title}
		>
			{title}
		</div>
	);
}
