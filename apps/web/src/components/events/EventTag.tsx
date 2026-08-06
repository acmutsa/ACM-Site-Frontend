import React from "react";
import Link from "next/link";

interface EventTagProps {
	text: string;
	icon?: string;
	color?: string;
	href?: string;
}

export default function EventTag({
	text,
	icon,
	color = "#266BE8",
	href,
}: EventTagProps) {
	const content = (
		<span
			className="flex items-center rounded-full px-3 py-1 text-sm font-bold text-white"
			style={{ backgroundColor: color }}
		>
			{icon && (
				<img
					src={icon}
					alt={text}
					style={{ filter: "brightness(0) invert(1)" }}
					className="mr-1.5 h-4 w-4 object-contain"
				/>
			)}
			<span>{text}</span>
		</span>
	);
	return href ? (
		<Link href={href} className="inline-flex shrink-0 whitespace-nowrap">
			{content}
		</Link>
	) : (
		<div className="inline-flex shrink-0 whitespace-nowrap">{content}</div>
	);
}
