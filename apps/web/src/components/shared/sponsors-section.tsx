import Image from "next/image";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { SPONSORS } from "@/site.config";

export function SponsorsSection() {
	return (
		<div className="grid grid-cols-1 border-2 border-acm-darker-blue/50 sm:min-h-[32rem] sm:grid-cols-5 sm:grid-rows-[auto_minmax(0,1fr)]">
			<div className="relative flex h-full flex-col items-center justify-center p-6 sm:col-span-5 sm:p-10">
				<h1 className="text-center font-calsans text-3xl font-bold leading-none tracking-wide text-acm-darker-blue min-[420px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
					Sponsors
				</h1>
				<h2 className="text-md max-w-[600px] text-balance pt-10 text-center font-mono font-semibold text-acm-darker-blue">
					We are able to operate at no cost to our members through the
					generous support of our sponsors
				</h2>
			</div>
			{SPONSORS.map((sponsor, index) => (
				<Link
					key={sponsor.name}
					href={sponsor.link}
					target="_blank"
					rel="noopener noreferrer"
					className={`flex h-full min-h-[8rem] flex-col items-center justify-center border-t-2 border-acm-darker-blue/50 p-6 transition-all hover:bg-acm-darker-blue/5 sm:min-h-[12rem] sm:p-3 lg:p-6 ${index > 0 ? "sm:border-l-2" : ""}`}
				>
					<Image
						src={sponsor.logo}
						alt={`${sponsor.name} Logo`}
						width={150}
						height={150}
						className="h-auto max-h-14 w-auto max-w-full object-contain sm:max-h-16 lg:max-h-20"
					/>
				</Link>
			))}
			<Link
				href="/sponsor"
				className="flex h-full min-h-[8rem] flex-col items-center justify-center border-t-2 border-acm-darker-blue/50 p-6 transition-all hover:bg-acm-darker-blue/10 sm:min-h-[12rem] sm:border-l-2 sm:p-3 lg:p-6"
			>
				<div className="flex flex-col items-center justify-center gap-4">
					<HeartHandshake
						className="text-acm-darker-blue"
						size={50}
					/>
					<span className="text-center font-calsans text-base font-bold text-acm-darker-blue md:text-xl">
						Become a Sponsor
					</span>
				</div>
			</Link>
		</div>
	);
}
