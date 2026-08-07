import React, { useEffect, useRef, useState } from "react";
import { EventType } from "@/components/events/types";
import EventTag from "@/components/events/EventTag";
import {
	Calendar,
	MapPin,
	Play,
	X,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

// FIXME: cic, rowdy hacks links not working
const SUBORG_LINKS: Record<string, string> = {
    "ACM W": "/suborgs/acmw",
    "Rowdy Creators": "/suborgs/rowdycreators",
    "Coding In Color": "/suborgs/codingincolor",
    "ICPC": "/suborgs/acmicpc",
    "Rowdy Hacks": "/suborgs/rowdyhacks",
};

interface EventPopupProps {
	event: EventType | null;
	onClose: () => void;
	onNext: () => void;
	onPrev: () => void;
	hasNext: boolean;
	hasPrev: boolean;
}

// TODO: be able to drag to next page too - swiper.js?
export default function EventPopup({
	event,
	onClose,
	onNext,
	onPrev,
	hasNext,
	hasPrev,
}: EventPopupProps) {
	// for animation
	const [isOpen, setIsOpen] = useState(false);
	const [displayEvent, setDisplayEvent] = useState<EventType | null>(null);
	const [showNoMediaMsg, setShowNoMediaMsg] = useState(false);

	useEffect(() => {
		if (event) {
			setDisplayEvent(event);
			setShowNoMediaMsg(false);
			setTimeout(() => setIsOpen(true), 10);
		} else {
			setIsOpen(false);
			const timer = setTimeout(() => setDisplayEvent(null), 200);
			return () => clearTimeout(timer);
		}
	}, [event]);

	// keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isOpen) return;
			if (e.key === "ArrowRight" && hasNext) onNext();
			if (e.key === "ArrowLeft" && hasPrev) onPrev();
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, hasNext, hasPrev, onNext, onPrev, onClose]);

	// horizontal scrolling
	const horiScrollRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const handleHoriScroll = () => {
		if (horiScrollRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } =
				horiScrollRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(
				Math.ceil(scrollLeft + clientWidth) < scrollWidth,
			);
		}
	};

	// vertical scrolling
	const vertScrollRef = useRef<HTMLDivElement>(null);
	const [canScrollTop, setCanScrollTop] = useState(false);
	const [canScrollBottom, setCanScrollBottom] = useState(true);

	const handleVertScroll = () => {
		if (vertScrollRef.current) {
			const { scrollTop, scrollHeight, clientHeight } =
				vertScrollRef.current;
			setCanScrollTop(scrollTop > 0);
			setCanScrollBottom(
				Math.ceil(scrollTop + clientHeight) < scrollHeight,
			);
		}
	};

	// prevent background scrolling when popup is open
	useEffect(() => {
		// background stays locked during the exit animation
		if (displayEvent) {
			document.body.style.overflow = "hidden";

			if (horiScrollRef.current) horiScrollRef.current.scrollLeft = 0;
			if (vertScrollRef.current) vertScrollRef.current.scrollTop = 0;

			handleHoriScroll();
			handleVertScroll();

			window.addEventListener("resize", handleHoriScroll);
			window.addEventListener("resize", handleVertScroll);
		} else {
			document.body.style.overflow = "unset";

			setCanScrollTop(false);
			setCanScrollBottom(true);
			setCanScrollLeft(false);
			setCanScrollRight(true);
		}

		return () => {
			document.body.style.overflow = "unset";

			// for cleanup
			window.removeEventListener("resize", handleHoriScroll);
			window.removeEventListener("resize", handleVertScroll);
		};
	}, [displayEvent]);

	if (!displayEvent) return null;

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm transition-opacity duration-200 ease-in-out ${
				isOpen ? "opacity-100" : "opacity-0"
			}`}
			onClick={onClose}
		>
			<div
				className={`relative grid max-h-[85vh] w-[95vw] max-w-5xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 ease-in-out md:h-[600px] md:grid-cols-2 ${
					isOpen
						? "translate-y-0 opacity-100"
						: "translate-y-8 opacity-0"
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					className="absolute right-4 top-2 z-10 font-calsans text-2xl font-bold text-acm-darker-blue/50 transition-colors hover:text-acm-darker-blue"
				>
					<X strokeWidth={3} size={28} />
				</button>

				<div className="flex h-full w-full items-center justify-center overflow-hidden bg-gray-400">
					{displayEvent.imageUrl ? (
						<img
							src={displayEvent.imageUrl}
							alt={displayEvent.title}
							className="h-full w-full object-cover"
						/>
					) : (
						<div className="px-6 text-center font-mono font-bold text-gray-600">
							No Image Provided
						</div>
					)}
				</div>

				<div className="flex h-full flex-col overflow-hidden p-12">
					<div className="relative flex min-h-0 flex-1 flex-col">
						<div
							ref={vertScrollRef}
							onScroll={handleVertScroll}
							className="flex-1 overflow-y-auto pb-6 no-scrollbar"
						>
							{/* event title */}
							<h2 className="mb-2 break-words font-calsans text-4xl font-bold text-acm-darker-blue">
								{displayEvent.title}
							</h2>

							{/* date */}
							<div className="mb-4 space-y-2 font-calsans text-xl font-bold text-acm-darker-blue">
								{/* event date */}
								<h2 className="flex items-center gap-x-2">
									<Calendar
										strokeWidth={2.5}
										size={24}
										className="shrink-0"
									/>
									{displayEvent.date
										? new Date(displayEvent.date)
												.toLocaleString("en-US", {
													timeZone: "America/Chicago",
													month: "short",
													day: "numeric",
													hour: "numeric",
													minute: "numeric",
												})
												.replace(", ", " @ ")
										: "TBD"}
								</h2>

								{/* event location */}
								<h2 className="flex items-center gap-x-2">
									<MapPin
										strokeWidth={2.5}
										size={24}
										className="shrink-0"
									/>
									{displayEvent.location || "TBD"}
								</h2>
							</div>
							{/* events tags */}
							<div className="relative mb-6 font-calsans">
								<div
									ref={horiScrollRef}
									onScroll={handleHoriScroll}
									className="flex flex-nowrap gap-2 overflow-x-auto pb-2 pr-12 no-scrollbar"
								>
									{displayEvent.tags?.map((tag, index) => (
										<EventTag
											key={index}
											text={tag.label}
											color={tag.color}
											icon={tag.icon}
											href={SUBORG_LINKS[tag.label]}
										/>
									))}
								</div>

								{/* left fade */}
								<div
									className={`pointer-events-none absolute bottom-0 left-0 top-0 w-10 bg-gradient-to-r from-white to-transparent transition-opacity duration-150 ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
								/>
								{/* right fade */}
								<div
									className={`pointer-events-none absolute bottom-0 right-0 top-0 w-10 bg-gradient-to-l from-white to-transparent transition-opacity duration-150 ${canScrollRight ? "opacity-100" : "opacity-0"}`}
								/>
							</div>

							{/* event description */}
							<h2 className="mb-2 font-calsans text-xl font-bold text-acm-darker-blue">
								Description
							</h2>
							<p className="whitespace-pre-wrap font-mono text-sm">
								{displayEvent.description ||
									"No description provided for this event."}
							</p>
						</div>

						{/* top fade */}
						<div
							className={`pointer-events-none absolute left-0 top-0 h-6 w-full bg-gradient-to-b from-white to-transparent transition-opacity duration-300 ${canScrollTop ? "opacity-100" : "opacity-0"}`}
						/>
						{/* bot fade */}
						<div
							className={`pointer-events-none absolute bottom-0 left-0 h-6 w-full bg-gradient-to-t from-white to-transparent transition-opacity duration-300 ${canScrollBottom ? "opacity-100" : "opacity-0"}`}
						/>
					</div>

					<div className="mt-4 flex w-full shrink-0 flex-wrap gap-4 sm:flex-nowrap">
						<div className="flex w-full flex-1 gap-4">
							{/* stream button */}
							<div className="relative flex shrink-0">
								{displayEvent.streamUrl ? (
									<a
										href={displayEvent.streamUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="flex h-12 w-14 shrink-0 items-center justify-center rounded-md bg-acm-darker-blue text-white transition-all hover:brightness-75"
										aria-label="Watch Event Stream or VOD"
									>
										<Play
											strokeWidth={2.5}
											size={20}
											className="shrink-0"
										/>
									</a>
								) : (
									<button
										onClick={() => {
											setShowNoMediaMsg(true);
											setTimeout(
												() => setShowNoMediaMsg(false),
												3000,
											);
										}}
										className="flex h-12 w-14 shrink-0 items-center justify-center rounded-md bg-acm-darker-blue/50 text-white transition-all hover:bg-acm-darker-blue/70"
									>
										<Play
											strokeWidth={2.5}
											size={20}
											className="shrink-0 opacity-60"
										/>
									</button>
								)}

								{/* tooltip popup */}
								<div
									className={`pointer-events-none absolute bottom-full left-0 mb-3 w-max rounded-md bg-acm-darker-blue px-3 py-2 text-xs font-bold text-white shadow-lg transition-all duration-200 ease-out ${
										showNoMediaMsg
											? "translate-y-0 opacity-100"
											: "translate-y-2 opacity-0"
									}`}
								>
									No{" "}
									{displayEvent.status === "past"
										? "VOD"
										: "stream"}{" "}
									available for this event.
									<div className="absolute left-6 top-full -mt-0.5 border-4 border-transparent border-t-acm-darker-blue" />
								</div>
							</div>

							{/* remind button */}
							{/* TODO: link to event in membership portal? or add to google calendar? ask later */}
							<button className="flex-1 rounded-md bg-acm-darker-blue px-2 py-2 font-bold text-white transition-all hover:brightness-75 sm:px-6">
								Remind Me
							</button>

							{/* check in button */}
							{/* TODO: link to event in membership portal */}
							<button className="flex-1 rounded-md border-2 border-acm-darker-blue px-2 py-2 font-bold text-acm-darker-blue transition-colors hover:bg-acm-darker-blue/10 sm:px-6">
								Check In
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
