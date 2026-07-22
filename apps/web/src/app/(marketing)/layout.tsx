import type { Metadata } from "next";
import { HeroNav } from "@/components/shared/navbar";

export const metadata: Metadata = {
	title: "ACM UTSA",
	description:
		"The premiere organization for students interested in computer science and technology at UTSA",
};

export default function MarketingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<HeroNav navVariant="blueForeground" />
			<div className="h-36 w-full" />
			{children}
		</>
	);
}