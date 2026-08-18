"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { EventType } from "@/components/events/types";

// 5 rows always starts on the week of the 1st, so a month can only ever spill 1-2 days, and those land as dimmed cells at the top of the next month
const ROWS = 5;
const DAYS_IN_VIEW = ROWS * 7;

// every cell reserves this many pill rows no matter what's in it, so an empty month is exactly as tall as a busy one and card stops resizing
const PILL_SLOTS = 2;

interface EventCalendarProps {
	allEvents: EventType[];
	onEventClick: (event: EventType) => void;
	currentDate: Date;
	setCurrentDate: (date: Date) => void;
}

// cell
interface CalendarCellData {
	day: number;
	dateObj: Date;
	isToday: boolean;
	isCurrentMonth: boolean;
	isPast: boolean;
	events: EventType[];
}

// date helpers, all local time and normalized to midnight
const addDays = (date: Date, amount: number) =>
	new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);

const startOfDay = (date: Date) =>
	new Date(date.getFullYear(), date.getMonth(), date.getDate());

const dayKey = (date: Date) =>
	`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

// date-only strings parse as utc midnight and land a day early here, so parse those as local
function parseEventDate(value: string | number | Date): Date | null {
	if (value instanceof Date) {
		return Number.isNaN(value.getTime()) ? null : value;
	}

	if (typeof value === "string") {
		const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
		if (dateOnly) {
			return new Date(
				Number(dateOnly[1]),
				Number(dateOnly[2]) - 1,
				Number(dateOnly[3]),
			);
		}
	}

	const parsed = new Date(value);
	return Number.isNaN(parsed.getTime()) ? null : parsed;
}

// main calendar
export default function EventCalendar({
	allEvents,
	onEventClick,
	currentDate,
	setCurrentDate,
}: EventCalendarProps) {
	const [isMounted, setIsMounted] = useState(false);

	const [popupCell, setPopupCell] = useState<CalendarCellData | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [displayCell, setDisplayCell] = useState<CalendarCellData | null>(
		null,
	);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (popupCell) {
			setDisplayCell(popupCell);
			const openTimer = setTimeout(() => setIsPopupOpen(true), 10);
			return () => clearTimeout(openTimer);
		}

		setIsPopupOpen(false);
		const clearTimer = setTimeout(() => setDisplayCell(null), 150);
		return () => clearTimeout(clearTimer);
	}, [popupCell]);

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const firstDayOfMonth = new Date(year, month, 1);

	// bucket events once instead of scanning allEvents inside every cell
	const eventsByDay = useMemo(() => {
		const map = new Map<string, EventType[]>();

		for (const event of allEvents) {
			if (!event.date) continue;

			const eventDate = parseEventDate(event.date);
			if (!eventDate) continue;

			const key = dayKey(eventDate);
			const bucket = map.get(key);
			if (bucket) bucket.push(event);
			else map.set(key, [event]);
		}

		return map;
	}, [allEvents]);

	// back up to the sunday of the week holding the 1st
	const startOfView = useMemo(
		() => new Date(year, month, 1 - new Date(year, month, 1).getDay()),
		[year, month],
	);

	const calendarCells = useMemo<CalendarCellData[]>(() => {
		const actualToday = startOfDay(new Date());

		return Array.from({ length: DAYS_IN_VIEW }, (_, index) => {
			const cellDate = addDays(startOfView, index);

			return {
				day: cellDate.getDate(),
				dateObj: cellDate,
				isToday: cellDate.getTime() === actualToday.getTime(),
				isCurrentMonth: cellDate.getMonth() === month,
				// calculate if event has already past
				isPast: cellDate.getTime() < actualToday.getTime(),
				events: eventsByDay.get(dayKey(cellDate)) ?? [],
			};
		});
	}, [startOfView, month, eventsByDay]);

	if (!isMounted) {
		return (
			<div className="h-full min-h-[360px] w-full rounded-2xl bg-acm-darker-blue"></div>
		);
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
								aria-label="Close"
							>
								<X size={20} strokeWidth={2.5} />
							</button>
						</div>

						{/* popup events */}
						<div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4 no-scrollbar">
							{displayCell.events.map((event) => (
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
											displayCell.isPast ||
											event.status === "past"
										}
									/>
								</button>
							))}
						</div>
					</div>
				</div>
			)}

			{/* calendar months header */}
			<div className="relative mb-6 flex shrink-0 items-center justify-between px-2 text-white">
				<div className="relative z-10 flex items-center gap-3 sm:gap-4">
					<button
						onClick={handlePrev}
						className="flex cursor-pointer items-center justify-center transition-opacity hover:opacity-70"
						aria-label="Previous month"
					>
						<ChevronLeft strokeWidth={2.5} size={28} />
					</button>
				</div>

				<h2 className="pointer-events-none absolute inset-x-0 text-center font-calsans text-2xl font-bold sm:text-3xl">
					{monthName} {year}
				</h2>

				<button
					onClick={handleNext}
					className="relative z-10 flex cursor-pointer items-center justify-center transition-opacity hover:opacity-70"
					aria-label="Next month"
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
				{calendarCells.map((cell) => (
					<CalendarCell
						key={dayKey(cell.dateObj)}
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
	cell: CalendarCellData;
	onEventClick: (e: EventType) => void;
	onOpenPopup: () => void;
}) {
	const showExpandPill = cell.events.length > PILL_SLOTS;
	const visibleEvents = showExpandPill
		? cell.events.slice(0, PILL_SLOTS - 1)
		: cell.events;

	// pad out whatever the events didn't use so the row height never changes
	const emptySlots =
		PILL_SLOTS - visibleEvents.length - (showExpandPill ? 1 : 0);

	return (
		<div
			className={`flex h-full min-h-0 w-full flex-col items-start justify-start overflow-hidden rounded-lg font-bold shadow-sm
                ${cell.isCurrentMonth ? "bg-white" : "bg-white/60"}
                ${cell.isToday ? "ring-2 ring-acm-darker-blue/30" : ""}
            `}
		>
			<div className="flex w-full shrink-0 justify-start p-1 pb-0 sm:p-1.5 sm:pb-0">
				<span
					className={`flex h-6 w-6 items-center justify-center rounded text-xs sm:h-7 sm:w-7 sm:text-sm ${
						cell.isToday
							? "bg-acm-darker-blue text-white"
							: cell.isCurrentMonth
								? "text-acm-darker-blue"
								: "text-acm-darker-blue/50"
					}`}
				>
					{cell.day}
				</span>
			</div>

			<div className="flex w-full flex-1 flex-col gap-1 overflow-hidden px-1.5 pb-1.5 pt-0.5 sm:px-2 sm:pb-2">
				{visibleEvents.map((event) => (
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
							isPast={cell.isPast || event.status === "past"}
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
						{/* count off what's actually hidden instead of hardcoding length - 1 */}
						+{cell.events.length - visibleEvents.length} more
					</button>
				)}

				{Array.from({ length: emptySlots }, (_, index) => (
					<div
						key={`slot-${index}`}
						aria-hidden
						className="invisible w-full shrink-0"
					>
						<CalendarEventPill title="placeholder" isPast={false} />
					</div>
				))}
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
