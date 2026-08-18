import React, { useEffect, useRef, useState } from "react";
import { EventType } from "@/components/events/types";
import { Calendar, MapPin, Play, X } from "lucide-react";

// FIXME: cic, rowdy hacks links not working
// import EventTag from "@/components/events/EventTag";
// const SUBORG_LINKS: Record<string, string> = {
//     "ACM W": "/suborgs/acmw",
//     "Rowdy Creators": "/suborgs/rowdycreators",
//     "Coding In Color": "/suborgs/codingincolor",
//     "ICPC": "/suborgs/acmicpc",
//     "Rowdy Hacks": "/suborgs/rowdyhacks",
// };

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

			if (vertScrollRef.current) vertScrollRef.current.scrollTop = 0;

			handleVertScroll();

			window.addEventListener("resize", handleVertScroll);
		} else {
			document.body.style.overflow = "unset";

			setCanScrollTop(false);
			setCanScrollBottom(true);
		}

		return () => {
			document.body.style.overflow = "unset";

			// for cleanup
			window.removeEventListener("resize", handleVertScroll);
		};
	}, [displayEvent]);

	if (!displayEvent) return null;

	const isPastEvent = displayEvent.status === "past";
	const streamTooltip = displayEvent.streamUrl
		? `Watch ${isPastEvent ? "VOD" : "Stream"}`
		: `No ${isPastEvent ? "VOD" : "stream"} available for this event.`;

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm transition-opacity duration-200 ease-in-out ${
				isOpen ? "opacity-100" : "opacity-0"
			}`}
			onClick={onClose}
		>
			<div
				className={`relative grid h-[85vh] max-h-[85vh] w-[95vw] max-w-5xl grid-cols-1 grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 ease-in-out md:h-[600px] md:grid-cols-2 md:grid-rows-1 ${
					isOpen
						? "translate-y-0 opacity-100"
						: "translate-y-8 opacity-0"
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					className="absolute right-4 top-2 z-10 font-calsans text-2xl font-bold text-acm-darker-blue/50 transition-colors hover:text-acm-darker-blue"
					aria-label="Close"
				>
					<X strokeWidth={3} size={28} />
				</button>

				<div className="flex aspect-[64/75] max-h-[50vh] w-full items-center justify-center overflow-hidden bg-gray-400 md:aspect-auto md:h-full md:max-h-none">
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

				<div className="flex h-full min-h-0 flex-col overflow-hidden p-6 md:p-12">
					<div className="relative flex min-h-0 flex-1 flex-col">
						<div
							ref={vertScrollRef}
							onScroll={handleVertScroll}
							className="min-h-0 flex-1 overflow-y-auto pb-6 no-scrollbar"
						>
							{/* event title */}
							<h2 className="mb-2 break-words font-calsans text-2xl font-bold text-acm-darker-blue md:text-4xl">
								{displayEvent.title}
							</h2>

							{/* date */}
							<div className="mb-4 space-y-2 font-calsans text-lg font-bold text-acm-darker-blue md:text-xl">
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

							{/* event description */}
							<h2 className="mb-2 font-calsans text-lg font-bold text-acm-darker-blue md:text-xl">
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
							<div className="group relative flex shrink-0">
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
												2000,
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
									className={`pointer-events-none absolute bottom-full left-0 mb-3 w-max rounded-md bg-acm-darker-blue px-3 py-2 text-xs font-bold text-white shadow-lg transition-all duration-200 ease-out group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 ${
										showNoMediaMsg
											? "translate-y-0 opacity-100"
											: "translate-y-2 opacity-0"
									}`}
								>
									{streamTooltip}
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
							<button className="flex-1 rounded-md bg-acm-darker-blue px-2 py-2 font-bold text-white transition-all hover:brightness-75 sm:px-6">
								Check In
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
