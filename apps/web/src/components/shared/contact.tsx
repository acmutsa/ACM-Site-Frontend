"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Contact({
	linkStyles,
}: {
	linkStyles: string;
}) {
	const pathname = usePathname();

	if (pathname === "/donate" || pathname === "/feedback" || pathname === "/team") {
		return null;
	}

	const isCustomColor =
		linkStyles.startsWith("rgb") ||
		linkStyles.startsWith("#") ||
		linkStyles.startsWith("hsl");

	return (
		<Link
			href="#contact_footer"
			className={`text-md font-semibold hover:underline lg:text-lg ${
				isCustomColor ? "" : linkStyles
			}`}
			style={isCustomColor ? { color: linkStyles } : undefined}
		>
			Contact
		</Link>
	);
}