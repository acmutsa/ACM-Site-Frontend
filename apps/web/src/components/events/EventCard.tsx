import React from "react";
import { EventType } from "@/components/events/types";
import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
	event: EventType;
	onClick: () => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
	const { title, date, location, imageUrl } = event;

	return (
		<div onClick={onClick} className="group flex cursor-pointer flex-col w-full min-w-0">
			<div className="mx-auto flex w-full flex-col gap-1 hover:underline hover:underline-offset-2 hover:decoration-2 hover:decoration-acm-darker-blue/50">
				{/* image */}
				<div className="relative aspect-square w-full overflow-hidden rounded-2xl">
					{imageUrl ? (
						<img
							src={imageUrl}
							alt={title}
							className="aspect-square h-full w-full object-cover"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center px-4 text-center font-mono text-xs font-bold bg-gray-400 text-gray-600">
							No Image Provided
						</div>
					)}
					<div className="pointer-events-none absolute inset-0 bg-acm-darker-blue opacity-0 transition-opacity group-hover:opacity-10" />
				</div>

				{/* info */}
				<div className="flex flex-col">
					<h2 className="truncate font-calsans font-bold text-acm-darker-blue">
						{title}
					</h2>
					<p className="flex items-center gap-x-1 font-calsans text-sm text-acm-darker-blue">
						<Calendar
							strokeWidth={2.5}
							size={15}
							className="shrink-0"
						/>
						{date
							? new Date(date).toLocaleString("en-US", {
									timeZone: "America/Chicago",
									month: "short",
									day: "numeric",
									hour: "numeric",
									minute: "numeric",
								}).replace(", ", " @ ")
							: "TBD"}
					</p>
					<p className="flex items-center gap-x-1 font-calsans text-sm text-acm-darker-blue">
						<MapPin strokeWidth={2.5} size={15} />
						{location || "TBD"}
					</p>
				</div>
			</div>
		</div>
	);
}
