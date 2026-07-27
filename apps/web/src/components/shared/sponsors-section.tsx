import Image from "next/image";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { SPONSORS } from "@/site.config";

export function SponsorsSection() {
	return (
		<div className="grid min-h-[32rem] grid-cols-5 grid-rows-[auto_minmax(0,1fr)] border-2 border-acm-darker-blue/50">
			<div className="relative col-span-5 flex h-full flex-col items-center justify-center p-10">
				<h1 className="text-center font-calsans text-8xl max-sm:text-7xl font-bold leading-none tracking-wide text-acm-darker-blue">
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
					className={`flex h-full min-h-[12rem] flex-col items-center justify-center border-t-2 border-acm-darker-blue/50 p-10 transition-all hover:bg-acm-darker-blue/5 ${
						index > 0 ? "border-l-2" : ""
					}`}
				>
					<Image
						src={sponsor.logo}
						alt={`${sponsor.name} Logo`}
						width={150}
						height={150}
						className="object-contain"
					/>
				</Link>
			))}
			<Link
				href="/sponsorship"
				className="flex h-full min-h-[12rem] flex-col items-center justify-center border-l-2 border-t-2 border-acm-darker-blue/50 p-10 transition-all hover:bg-acm-darker-blue/10"
			>
				<div className="flex flex-col items-center justify-center gap-4">
					<HeartHandshake className="text-acm-darker-blue" size={75} />
					<span className="text-center font-calsans text-xl font-bold text-acm-darker-blue">
						Become a Sponsor
					</span>
				</div>
			</Link>
		</div>
	);
}
