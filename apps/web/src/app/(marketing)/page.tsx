import Globe from "@/components/landing/globe";
import Image from "next/image";
import { SponsorsSection } from "@/components/shared/sponsors-section";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/shared/footer";
// import { getNextEvent, getUpcomingEvents } from "@/lib/queries/events";
import { EventType } from "@/lib/types/events";

export default function Page() {
	return (
		<>
			<main className="bg-fit relative flex h-full min-h-[calc(100vh-100px)] w-full flex-col items-center justify-center overflow-hidden bg-acm-darker-blue bg-[url('/img/landing/noise.png')] bg-center text-white">
				<div className="flex h-full w-full flex-col items-center justify-start">
					<h1 className="text-center font-chillax text-9xl font-black max-sm:text-4xl">
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
					<div className="grid grid-cols-1 border border-acm-darker-blue/50 sm:grid-cols-4">
						<div className="flex flex-col border border-acm-darker-blue/50 p-6 sm:col-span-2 sm:row-span-2 sm:p-10">
							<h1 className="text-left font-calsans text-3xl font-bold leading-tight tracking-wide text-acm-darker-blue md:text-4xl lg:text-5xl">
								We are the Association for Computing Machinery
								at{" "}
								<span className="rounded-md bg-[#0C2340] pl-3 pr-4 font-inter font-bold tracking-[-0.1em] text-[#F15A22] lg:leading-[60px]">
									UTSA
								</span>
							</h1>
							<div className="mt-6 flex items-end justify-start sm:mt-auto">
								<Image
									src="/img/logos/acm-blue.png"
									alt="ACM Blue Logo"
									width={50}
									height={50}
								/>
								<p className="ml-auto whitespace-nowrap font-mono text-xs text-acm-darker-blue">
									Fig. 1
								</p>
							</div>
						</div>
						<div className="grid grid-cols-1 border border-acm-darker-blue/50 sm:col-span-2 sm:row-span-2 sm:grid-cols-2 sm:grid-rows-2">
							<Suspense
								fallback={
									<div className="h-full min-h-[300px] w-full animate-pulse bg-acm-darker-blue/10" />
								}
							>
								<WeArePhotoGrid />
							</Suspense>
						</div>
					</div>
					<div className="h-10 w-full border border-x-2 border-acm-darker-blue/50" />
					<div className="grid grid-cols-1 border border-acm-darker-blue/50 sm:grid-cols-5">
						<div className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2 border border-acm-darker-blue/50 p-6 sm:flex-col sm:p-10">
							<BracesIcon
								className="text-acm-darker-blue"
								size={50}
							/>
							<PlusIcon
								className="text-acm-darker-blue"
								size={25}
							/>
							<UsersIcon
								className="text-acm-darker-blue"
								size={50}
							/>
							<EqualIcon
								className="text-acm-darker-blue"
								size={25}
							/>
							<div className="h-[50px] w-[50px] shrink-0">
								<Image
									src="/img/logos/acm-blue.png"
									alt="ACM Blue Logo"
									width={75}
									height={75}
									className="h-full w-full object-contain"
								/>
							</div>
						</div>
						<div className="flex flex-col gap-y-5 border border-acm-darker-blue/50 p-6 sm:col-span-4 sm:p-10">
							<h2 className="text-left font-calsans text-5xl font-bold leading-tight tracking-wide text-acm-darker-blue max-sm:text-2xl">
								Mission
							</h2>
							<p className="text-balance text-left font-calsans text-lg font-bold leading-loose tracking-wide text-acm-darker-blue">
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
					<div className="grid grid-cols-1 border border-acm-darker-blue/50 sm:grid-cols-3">
						<div className="relative flex aspect-[2/1] flex-col items-center justify-center overflow-hidden border border-acm-darker-blue/50 p-4 font-calsans text-acm-darker-blue sm:aspect-square lg:p-10">
							<h3 className="text-4xl font-bold md:text-5xl lg:text-7xl">
								1000+
							</h3>
							<h4 className="text-center text-lg font-bold md:text-xl">
								Members
							</h4>
							<p className="absolute bottom-3 right-4 whitespace-nowrap font-mono text-xs lg:bottom-6 lg:right-6">
								Fig. 3
							</p>
						</div>
						<div className="relative flex aspect-[2/1] flex-col items-center justify-center overflow-hidden border border-acm-darker-blue/50 p-4 font-calsans text-acm-darker-blue sm:aspect-square lg:p-10">
							<h3 className="text-4xl font-bold md:text-5xl lg:text-7xl">
								4
							</h3>
							<h4 className="text-center text-lg font-bold md:text-xl">
								Sub-orgs
							</h4>
							<p className="absolute bottom-3 right-4 whitespace-nowrap font-mono text-xs lg:bottom-6 lg:right-6">
								Fig. 4
							</p>
						</div>
						<div className="relative flex aspect-[2/1] flex-col items-center justify-center overflow-hidden border border-acm-darker-blue/50 p-4 font-calsans text-acm-darker-blue sm:aspect-square lg:p-10">
							<h3 className="text-4xl font-bold md:text-5xl lg:text-7xl">
								3
							</h3>
							<h4 className="text-center text-lg font-bold md:text-xl">
								Annual Hackathons
							</h4>
							<p className="absolute bottom-3 right-4 whitespace-nowrap font-mono text-xs lg:bottom-6 lg:right-6">
								Fig. 5
							</p>
						</div>
					</div>
					<div className="h-10 w-full border-t border-acm-darker-blue/50" />
					<div className="flex min-h-[24rem] flex-col bg-acm-darker-blue p-10 text-white sm:h-96">
						<h1 className="pb-5 font-calsans text-8xl font-black max-sm:text-4xl">
							acm is for{" "}
							<span className="underline">everyone.</span>
						</h1>
						<h2 className="text-md pt-2 text-start font-mono font-semibold">
							{"Membership is 100% free, and always will be :)"}
						</h2>
						<div className="mt-auto flex flex-col-reverse gap-y-4 sm:flex-row sm:items-end sm:justify-between">
							<p className="self-end whitespace-nowrap font-mono text-xs sm:self-auto">
								Fig. 6
							</p>
							<Link
								className="font-calsans text-4xl transition-all hover:underline max-sm:text-2xl"
								href={"https://portal.acmutsa.org/"}
								target="_blank"
							>
								Become a Member {">"}
							</Link>
						</div>
					</div>
					<div className="h-10 w-full border-t border-acm-darker-blue/50" />
					<div className="flex h-10 w-full items-center justify-center rounded border-2 border-dashed border-acm-darker-blue">
						<p className="text-center font-mono text-sm font-semibold text-acm-darker-blue">
							Not sure yet or just want to learn more? Read more
							below!
						</p>
					</div>
					<div className="h-10 w-full border-acm-darker-blue/50" />
					<div className="grid min-h-[32rem] grid-cols-1 border-2 border-acm-darker-blue/50 sm:grid-cols-4 sm:grid-rows-[auto_minmax(0,1fr)]">
						<div className="relative flex h-full flex-col justify-center p-6 sm:col-span-4 sm:p-10">
							<h1 className="text-left font-calsans text-3xl font-bold leading-none tracking-wide text-acm-darker-blue min-[420px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
								Suborgs
							</h1>
							<h2 className="text-md text-balance pt-10 text-start font-mono font-semibold text-acm-darker-blue">
								Along with core ACM Events, we are home to
								numerous sub-organizations which focus on
								specific areas of interest and communities.
							</h2>
						</div>
						<Link
							href="/suborgs/acmw"
							rel="noopener noreferrer"
							className="flex h-full min-h-[8rem] flex-col items-center justify-center border-t-2 border-acm-darker-blue/50 p-6 transition-all hover:bg-acm-darker-blue/5 sm:min-h-[12rem] sm:p-10"
						>
							<Image
								src="/img/logos/suborgs/acmw-blue.png"
								alt="ACM Logo"
								width={150}
								height={150}
								className="h-auto max-h-16 w-auto max-w-[90px] object-contain sm:max-h-24 sm:max-w-[150px]"
							/>
						</Link>
						<Link
							href="/suborgs/codingincolor"
							rel="noopener noreferrer"
							className="flex h-full min-h-[8rem] flex-col items-center justify-center border-t-2 border-acm-darker-blue/50 p-6 transition-all hover:bg-acm-darker-blue/5 sm:min-h-[12rem] sm:border-l-2 sm:p-10"
						>
							<Image
								src="/img/logos/suborgs/cnc-blue.png"
								alt="ACM Logo"
								width={175}
								height={175}
								className="h-auto max-h-16 w-auto max-w-[90px] object-contain sm:max-h-24 sm:max-w-[150px]"
							/>
						</Link>
						<Link
							href="/suborgs/acmicpc"
							rel="noopener noreferrer"
							className="flex h-full min-h-[8rem] flex-col items-center justify-center border-t-2 border-acm-darker-blue/50 p-6 transition-all hover:bg-acm-darker-blue/5 sm:min-h-[12rem] sm:border-l-2 sm:p-10"
						>
							<Image
								src="/img/logos/suborgs/icpc-blue.png"
								alt="ACM Logo"
								width={175}
								height={175}
								className="h-auto max-h-16 w-auto max-w-[90px] object-contain sm:max-h-24 sm:max-w-[150px]"
							/>
						</Link>
						<Link
							href="/suborgs/rowdycreators"
							rel="noopener noreferrer"
							className="flex h-full min-h-[8rem] flex-col items-center justify-center border-t-2 border-acm-darker-blue/50 p-6 transition-all hover:bg-acm-darker-blue/5 sm:min-h-[12rem] sm:border-l-2 sm:p-10"
						>
							<Image
								src="/img/logos/suborgs/rc-blue.png"
								alt="ACM Logo"
								width={175}
								height={175}
								className="h-auto max-h-16 w-auto max-w-[90px] object-contain sm:max-h-24 sm:max-w-[150px]"
							/>
						</Link>
					</div>
					<div className="h-10 w-full border-x-2 border-acm-darker-blue/50" />
					<div className="grid min-h-[32rem] grid-cols-1 border-2 border-acm-darker-blue/50 sm:grid-cols-4 sm:grid-rows-[auto_minmax(0,1fr)]">
						<div className="relative flex h-full flex-col items-end justify-center p-6 sm:col-span-4 sm:p-10">
							<h1 className="text-right font-calsans text-3xl font-bold leading-none tracking-wide text-acm-darker-blue min-[420px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
								Hackathons
							</h1>
							<h2 className="text-md text-balance pt-10 text-right font-mono font-semibold text-acm-darker-blue">
								ACM hosts 3 annual hackathons, welcoming
								students of all skill levels from across the
								country to innovate and build.
							</h2>
						</div>
						<Link
							href="/suborgs/rowdyhacks"
							rel="noopener noreferrer"
							className="flex h-full min-h-[8rem] flex-col items-center justify-center border-t-2 border-acm-darker-blue/50 p-6 transition-all hover:bg-acm-darker-blue/5 sm:min-h-[12rem] sm:p-10"
						>
							<Image
								src="/img/logos/hackathons/rh-blue.png"
								alt="RowdyHacks Logo"
								width={150}
								height={150}
								className="h-auto max-h-16 w-auto max-w-[90px] object-contain sm:max-h-24 sm:max-w-[150px]"
							/>
						</Link>
						<Link
							href="https://cqhacks.org/"
							rel="noopener noreferrer"
							target="_blank"
							className="flex h-full min-h-[8rem] flex-col items-center justify-center border-t-2 border-acm-darker-blue/50 p-6 transition-all hover:bg-acm-darker-blue/5 sm:min-h-[12rem] sm:border-l-2 sm:p-10"
						>
							<Image
								src="/img/logos/hackathons/cq-blue.png"
								alt="ACM Logo"
								width={150}
								height={150}
								className="h-auto max-h-16 w-auto max-w-[90px] object-contain sm:max-h-24 sm:max-w-[150px]"
							/>
						</Link>
						<div className="flex h-full min-h-[8rem] flex-col items-center justify-center border-t-2 border-acm-darker-blue/50 p-6 sm:min-h-[12rem] sm:border-l-2 sm:p-10">
							<Image
								src="/img/logos/hackathons/rd-blue.png"
								alt="ACM Logo"
								width={150}
								height={150}
								className="h-auto max-h-16 w-auto max-w-[90px] object-contain sm:max-h-24 sm:max-w-[150px]"
							/>
						</div>
						<Link
							href="https://www.rowdycybercon.org/"
							rel="noopener noreferrer"
							target="_blank"
							className="flex h-full min-h-[8rem] flex-col items-center justify-center border-t-2 border-acm-darker-blue/50 p-6 transition-all hover:bg-acm-darker-blue/5 sm:min-h-[12rem] sm:border-l-2 sm:p-10"
						>
							<Image
								src="/img/logos/hackathons/rcc-blue.png"
								alt="ACM Logo"
								width={200}
								height={200}
								className="h-auto max-h-16 w-auto max-w-[90px] object-contain sm:max-h-24 sm:max-w-[150px]"
							/>
						</Link>
					</div>
					<div className="h-10 w-full border-0 border-acm-darker-blue/50" />
					<Suspense>
						<UpcomingEvents />
					</Suspense>
					<div className="h-10 w-full border-0 border-acm-darker-blue/50" />
					<SponsorsSection />
				</div>
			</section>
			<Footer orgName="ACM UTSA" />
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
		<div className="flex min-h-[24rem] flex-col items-start justify-center bg-acm-darker-blue text-white sm:h-96 sm:flex-row">
			<div className="flex h-full w-full max-w-full flex-col items-start justify-center border-b-2 border-dashed border-white p-6 sm:w-[min(100%,32rem)] sm:max-w-[32rem] sm:border-b-0 sm:border-r-2 sm:p-10">
				<h1 className="max-w-full break-words text-left font-calsans text-5xl font-bold leading-none tracking-wide text-white md:text-6xl">
					{event.type === "future" ? "Up Next" : "Recently"}
					<br />@ ACM
				</h1>
			</div>
			<div className="flex h-full w-full flex-col items-start justify-center p-6 sm:p-10">
				<h1 className="pb-2 font-calsans text-2xl font-bold sm:text-4xl">
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
				<div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-10">
					<Link href={`/events/${event.event.id}`}>
						<Button variant={"styleized-white-blue-text"}>
							View Event
						</Button>
					</Link>
					<Link href={`/events`}>
						<Button className="px-0 text-white" variant={"link"}>
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
			<span className="inline-flex h-10 items-center whitespace-nowrap rounded-full bg-acm-darker-blue/10 px-4 text-acm-darker-blue">
				{cloneElement(icon as React.ReactElement<any>, { size: 20 })}
				<span className="ml-2">{children}</span>
			</span>{" "}
		</Fragment>
	);
}
