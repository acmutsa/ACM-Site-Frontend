import Globe from "@/components/landing/globe";
import { HeroNav } from "@/components/shared/navbar";
import Image from "next/image";
import { WeArePhotoGrid } from "./client";
import { Suspense, cloneElement, Fragment } from "react";
import {
	Code as CodeIcon,
	Plus as PlusIcon,
	Users as UsersIcon,
	Equal as EqualIcon,
	Braces as BracesIcon,
	Zap as ZapIcon,
	Code2 as Code2Icon,
	Users2 as Users2Icon,
	Lightbulb as LightbulbIcon,
	Share2 as Share2Icon,
	Scaling as ScalingIcon,
	Laptop as LaptopIcon,
	Network as NetworkIcon,
	Building as BuildingIcon,
	Map as MapIcon,
	MapPin,
	Calendar,
	HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/shared/footer";
// import { getNextEvent, getUpcomingEvents } from "@/lib/queries/events";
import { SPONSORS } from "@/site.config";
import { EventType } from "@/lib/types/events";

export default function Page() {
	return (
		<>
			<main className="bg-fit relative flex h-full min-h-[calc(100vh-100px)] w-full flex-col items-center justify-center overflow-hidden bg-acm-darker-blue bg-[url('/img/landing/noise.png')] bg-center text-white">
				<HeroNav />
				<div className="flex h-full w-full flex-col items-center justify-start">
					<h1 className="text-center font-chillax text-9xl font-black">
						acm utsa
					</h1>
					<h2 className="text-md max-w-[600px] text-center font-mono font-semibold">
						The premiere organization for students interested in
						computer science and technology at UTSA
					</h2>
				</div>

				<div className="absolute bottom-0 left-0 right-0 flex translate-y-[60%] scale-100 items-center justify-center ">
					<Globe />
				</div>
			</main>
			<section className="min-h-screen w-full bg-background pb-36">
				<div className="mx-auto flex max-w-screen-xl flex-col px-10 pt-36">
					<div className=" grid grid-cols-4 border border-acm-darker-blue/50">
						<div className="col-span-2 row-span-2 flex flex-col border border-acm-darker-blue/50 p-10">
							<h1 className="text-left font-calsans text-5xl font-bold leading-tight tracking-wide text-acm-darker-blue">
								We are the Association for Computing Machinery
								at{" "}
								<span className="rounded-md bg-[#0C2340] pl-3 pr-4 font-inter font-bold leading-[60px] tracking-[-0.1em] text-[#F15A22]">
									UTSA
								</span>
							</h1>
							<div className="mt-auto flex items-end justify-start justify-self-end">
								<Image
									src="/img/logos/acm-blue.png"
									alt="ACM Blue Logo"
									width={50}
									height={50}
								/>
								<p className="ml-auto justify-self-end  font-mono text-xs text-acm-darker-blue">
									Fig. 1
								</p>
							</div>
						</div>
						<Suspense fallback={<div>Loading...</div>}>
							<WeArePhotoGrid />
						</Suspense>
					</div>
					<div className="h-10 w-full border border-x-2 border-acm-darker-blue/50" />
					<div className=" grid grid-cols-5 border border-acm-darker-blue/50">
						<div className="flex flex-col items-center justify-center gap-y-2 border border-acm-darker-blue/50 p-10">
							<BracesIcon
								className="text-acm-darker-blue"
								size={75}
							/>
							<PlusIcon
								className="text-acm-darker-blue"
								size={25}
							/>
							<UsersIcon
								className="text-acm-darker-blue"
								size={75}
							/>
							<EqualIcon
								className="text-acm-darker-blue"
								size={25}
							/>
							<Image
								src="/img/logos/acm-blue.png"
								alt="ACM Blue Logo"
								width={75}
								height={75}
							/>
						</div>
						<div className="col-span-4 flex flex-col gap-y-5 border border-acm-darker-blue/50 p-10">
							<h2 className="text-left font-calsans text-5xl font-bold leading-tight tracking-wide text-acm-darker-blue">
								Mission
							</h2>
							<p className="text-balance text-left font-calsans text-2xl font-bold leading-loose tracking-wide text-acm-darker-blue">
								At
								<Pill
									icon={
										<Image
											src="/img/logos/acm-blue.png"
											alt="ACM Logo"
											width={20}
											height={20}
										/>
									}
								>
									ACM
								</Pill>
								, our mission is to empower students passionate
								about technology and
								<Pill icon={<BracesIcon />}>
									computer science
								</Pill>
								by fostering a vibrant
								<Pill icon={<UsersIcon />}>community</Pill>
								that supports innovation, collaboration, and
								growth.
							</p>
							<p className="ml-auto mt-auto justify-self-end pt-5 font-mono text-xs text-acm-darker-blue">
								Fig. 2
							</p>
						</div>
					</div>
					<div className="h-10 w-full border border-x-2 border-acm-darker-blue/50" />
					<div className=" grid grid-cols-3 border border-acm-darker-blue/50">
						<div className="relative flex aspect-square flex-col items-center justify-center border border-acm-darker-blue/50 p-10 font-calsans text-acm-darker-blue">
							<h3 className="text-7xl font-bold">1000+</h3>
							<h4 className="text-xl font-bold">Members</h4>
							<p className="absolute bottom-10 right-10 font-mono text-xs">
								Fig. 3
							</p>
						</div>
						<div className="relative flex aspect-square flex-col items-center justify-center border border-acm-darker-blue/50 p-10 font-calsans text-acm-darker-blue">
							<h3 className="text-7xl font-bold">4</h3>
							<h4 className="text-xl font-bold">
								Sub-organizations
							</h4>
							<p className="absolute bottom-10 right-10 font-mono text-xs">
								Fig. 4
							</p>
						</div>
						<div className="relative flex aspect-square flex-col items-center justify-center border border-acm-darker-blue/50 p-10 font-calsans text-acm-darker-blue">
							<h3 className="text-7xl font-bold">3</h3>
							<h4 className="text-xl font-bold">
								Annual Hackathons
							</h4>
							<p className="absolute bottom-10 right-10 font-mono text-xs">
								Fig. 5
							</p>
						</div>
					</div>
					<div className="h-10 w-full border-t border-acm-darker-blue/50" />
					<div className="flex h-96 flex-col bg-acm-darker-blue p-10 text-white">
						<h1 className="pb-5 font-calsans text-8xl font-black">
							acm is for{" "}
							<span className="underline">everyone.</span>
						</h1>
						<h2 className="text-md pt-2 text-start font-mono font-semibold">
							{"Membership is 100% free, and always will be :)"}
						</h2>
						<div className="mt-auto flex items-end justify-between justify-self-end">
							<p className="font-mono text-xs">Fig. 6</p>
							<Link
								className="font-calsans text-4xl transition-all hover:underline"
								href={"https://portal.acmutsa.org/"}
								target="_blank"
							>
								Become a Member {">"}
							</Link>
						</div>
					</div>
					<div className="h-10 w-full border-t border-acm-darker-blue/50" />
					<div className="flex h-10 w-full items-center justify-center rounded border-2 border-dashed border-acm-darker-blue">
						<p className="text-start font-mono text-sm font-semibold text-acm-darker-blue">
							Not sure yet or just want to learn more? Read more
							below!
						</p>
					</div>
					<div className="h-10 w-full border-acm-darker-blue/50" />
					<div className="grid grid-cols-4 grid-rows-2 border-2 border-acm-darker-blue/50">
						<div className="relative col-span-4 flex flex-col justify-center p-10">
							<h1 className="text-left font-calsans text-8xl font-bold leading-none tracking-wide text-acm-darker-blue">
								Suborgs
							</h1>
							<h2 className="text-md text-balance pt-10 text-start font-mono font-semibold text-acm-darker-blue">
								Along with core ACM Events, we are home to
								numerous sub-organizations which focus on
								specific areas of interest and communities.
							</h2>
						</div>
						<Link href="/suborgs/acmw" rel="noopener noreferrer" className="flex aspect-square flex-col items-center justify-center border-t-2 border-acm-darker-blue/50 p-10 transition-all hover:bg-acm-darker-blue/5">
							<Image
								src="/img/logos/suborgs/acmw-blue.png"
								alt="ACM Logo"
								width={150}
								height={150}
							/>
						</Link>
						<Link href="/suborgs/codingincolor" rel="noopener noreferrer" className="flex aspect-square flex-col items-center justify-center border-t-2 border-l-2 border-acm-darker-blue/50 p-10 transition-all hover:bg-acm-darker-blue/5">
							<Image
								src="/img/logos/suborgs/cnc-blue.png"
								alt="ACM Logo"
								width={175}
								height={175}
							/>
						</Link>
						<Link href="/suborgs/acmicpc" rel="noopener noreferrer" className="flex aspect-square flex-col items-center justify-center border-t-2 border-l-2 border-acm-darker-blue/50 p-10 transition-all hover:bg-acm-darker-blue/5">
							<Image
								src="/img/logos/suborgs/icpc-blue.png"
								alt="ACM Logo"
								width={175}
								height={175}
							/>
						</Link>
						<Link href="/suborgs/rowdycreators" rel="noopener noreferrer" className="flex aspect-square flex-col items-center justify-center border-t-2 border-l-2 border-acm-darker-blue/50 p-10 transition-all hover:bg-acm-darker-blue/5">
							<Image
								src="/img/logos/suborgs/rc-blue.png"
								alt="ACM Logo"
								width={175}
								height={175}
							/>
						</Link>
					</div>
					<div className="h-10 w-full border-x-2 border-acm-darker-blue/50" />
					<div className="grid grid-cols-4 grid-rows-2 border-2 border-acm-darker-blue/50">
						<div className="relative col-span-4 flex flex-col items-end justify-center p-10">
							<h1 className="text-right font-calsans text-8xl font-bold leading-none tracking-wide text-acm-darker-blue">
								Hackathons
							</h1>
							<h2 className="text-md text-balance pt-10 text-right font-mono font-semibold text-acm-darker-blue">
								ACM hosts 3 annual hackathons, welcoming
								students of all skill levels from across the
								country to innovate and build.
							</h2>
						</div>
						<Link href="/suborgs/rowdyhacks" rel="noopener noreferrer" className="flex aspect-square flex-col items-center justify-center border-t-2 border-acm-darker-blue/50 p-10 transition-all hover:bg-acm-darker-blue/5">
							<Image
								src="/img/logos/hackathons/rh-blue.png"
								alt="ACM Logo"
								width={150}
								height={150}
							/>
						</Link>
						<Link href="https://cqhacks.org/" rel="noopener noreferrer" className="flex aspect-square flex-col items-center justify-center border-t-2 border-l-2 border-acm-darker-blue/50 p-10 transition-all hover:bg-acm-darker-blue/5">
							<Image
								src="/img/logos/hackathons/cq-blue.png"
								alt="ACM Logo"
								width={150}
								height={150}
							/>
						</Link>
						<div className="flex aspect-square flex-col items-center justify-center border-l-2 border-t-2 border-acm-darker-blue/50 p-10">
							<Image
								src="/img/logos/hackathons/rd-blue.png"
								alt="ACM Logo"
								width={150}
								height={150}
							/>
						</div>
						<Link href="https://www.rowdycybercon.org/" rel="noopener noreferrer" className="flex aspect-square flex-col items-center justify-center border-l-2 border-t-2 border-acm-darker-blue/50 p-10 transition-all hover:bg-acm-darker-blue/5">
							<Image
								src="/img/logos/hackathons/rcc-blue.png"
								alt="ACM Logo"
								width={200}
								height={200}
							/>
						</Link>
					</div>
					<div className="h-10 w-full border-0 border-acm-darker-blue/50" />
					<Suspense>
						<UpcomingEvents />
					</Suspense>
					<div className="h-10 w-full border-0 border-acm-darker-blue/50" />
					<div className="grid grid-cols-4 grid-rows-2 border-2 border-acm-darker-blue/50">
						<div className="relative col-span-4 flex flex-col items-center justify-center p-10">
							<h1 className="text-center font-calsans text-8xl font-bold leading-none tracking-wide text-acm-darker-blue">
								Sponsors
							</h1>
							<h2 className="text-md max-w-[600px] text-balance pt-10 text-center font-mono font-semibold text-acm-darker-blue">
								We are able to operate at no cost to our members
								through the generous support of our sponsors
							</h2>
						</div>
						{SPONSORS.map((sponsor, index) => (
							<Link
								key={sponsor.name}
								href={sponsor.link}
								target="_blank"
								rel="noopener noreferrer"
								className={`flex aspect-square flex-col items-center justify-center border-t-2 border-acm-darker-blue/50 p-10 transition-all hover:bg-acm-darker-blue/5 ${
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
							className="flex aspect-square flex-col items-center justify-center border-l-2 border-t-2 border-acm-darker-blue/50 p-10 transition-all hover:bg-acm-darker-blue/10"
						>
							<div className="flex flex-col items-center justify-center gap-4">
								<HeartHandshake
									className="text-acm-darker-blue"
									size={75}
								/>
								<span className="text-center font-calsans text-xl font-bold text-acm-darker-blue">
									Become a Sponsor
								</span>
							</div>
						</Link>
					</div>
				</div>
			</section>
			<Footer orgName="" email=""/>
			{/* Those parameters are temporary and need to be removed and fixed */}
		</>
	);
}

async function UpcomingEvents() {
	// const event = await getNextEvent(true);
	const event: { type: string; event: EventType } = {
		type: "future",
		event: {
			id: "1",
			name: "ACM Spring Kickoff",
			description:
				"Join us for our first meeting of the Spring 2025 semester! We'll be discussing our upcoming events, workshops, and hackathons. Come meet the team and learn how you can get involved.",
			thumbnailUrl:
				"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
			start: new Date("2025-01-22T18:00:00"),
			end: new Date("2025-01-22T19:00:00"),
			checkinStart: new Date("2025-01-22T17:45:00"),
			checkinEnd: new Date("2025-01-22T19:15:00"),
			location: "NPB 1.202",
			isUserCheckinable: true,
			isHidden: false,
			points: 10,
			createdAt: new Date(),
			updatedAt: new Date(),
			semesterID: 1,
		},
	};
	const timezone = "America/Chicago";

	if (!event) {
		return (
			<div className="flex h-96 items-start justify-center bg-acm-darker-blue text-white">
				<h1>There Was An Error Fetching Events</h1>
			</div>
		);
	}

	return (
		<div className="flex h-96 items-start justify-center bg-acm-darker-blue text-white">
			<div className="flex h-full min-w-[min(100vw,550px)] flex-col items-start justify-center border-r-2 border-dashed border-white p-10">
				<h1 className="p-5 text-left font-calsans text-8xl font-bold leading-none tracking-wide text-white">
					{event.type === "future" ? "Up Next" : "Recently"}
					<br />@ ACM
				</h1>
			</div>
			<div className="flex h-full w-full flex-col items-start justify-center p-10">
				<div className="flex h-[45px] w-[45px] items-center justify-center pb-5">
					<Image
						src={event.event.thumbnailUrl}
						alt={event.event.name}
						width={45}
						height={45}
						className="rounded-lg"
					/>
				</div>
				<h1 className="pb-2 font-calsans text-4xl font-bold">
					{event.event.name}
				</h1>
				<div>
					<p className="flex items-center gap-x-1 font-calsans text-sm text-white">
						<Calendar strokeWidth={2.5} size={15} />
						{`${event.event.start.toLocaleString("en-US", {
							timeZone: timezone,
							month: "short",
							day: "numeric",
							hour: "numeric",
							minute: "numeric",
						})} CT`}
					</p>
					<p className="flex items-center gap-x-1 font-calsans text-sm text-white">
						<MapPin strokeWidth={2.5} size={15} />
						{event.event.location}
					</p>
				</div>
				<div className="flex items-center gap-x-1 pt-10">
					<Link href={`/events/${event.event.id}`}>
						<Button variant={"styleized-white-blue-text"}>
							View Event
						</Button>
					</Link>
					<Link href={`/events`}>
						<Button className="text-white" variant={"link"}>
							Explore Other Events {">"}
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

function Pill({
	icon,
	children,
}: {
	icon: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<Fragment>
			{" "}
			<span className="inline-flex h-10 items-center rounded-full bg-acm-darker-blue/10 px-4 text-acm-darker-blue">
				{cloneElement(icon as React.ReactElement<any>, { size: 20 })}
				<span className="ml-2">{children}</span>
			</span>{" "}
		</Fragment>
	);
}
