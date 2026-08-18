import Image from "next/image";
import Link from "next/link";
import { Button, variantItems } from "@/components/ui/button";

import c from "config";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type NavbarProps = {
	siteRegion?: string;
	showBorder?: boolean;
};

export default async function Navbar({ siteRegion, showBorder }: NavbarProps) {
	return (
		<div
			className={
				"z-20 grid h-16 w-full grid-cols-2 px-5" +
				(showBorder ? " border-b" : "")
			}
		>
			<div className="flex items-center gap-x-4">
				<Link href="/">
					<Image
						src={c.icon.svg}
						alt={c.clubName + " Logo"}
						width={32}
						height={32}
					/>
				</Link>

				{siteRegion && (
					<>
						<div className="h-[45%] w-[2px] rotate-[25deg] bg-muted-foreground" />
						<h2 className="font-bold tracking-tight">{siteRegion}</h2>
					</>
				)}
			</div>

			{/* Large screen navbar */}
			<div className="my-2 hidden items-center justify-end gap-x-2 md:flex">
				<PortalButton navVariant="default" customColor="" />
			</div>

			{/* Small screen navbar */}
			<div className="flex items-center justify-end gap-2 md:hidden">
				<Sheet>
					<SheetTrigger asChild>
						<button type="button" aria-label="Open menu">
							<Menu color="#266BE8" strokeWidth={2.5} />
						</button>
					</SheetTrigger>
					<SheetContent className="flex max-w-[40%] flex-col-reverse items-center justify-center gap-y-1">
						<PortalButton navVariant="default" customColor="" />
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
}

interface HeroVariant {
	wrapper: string;
	buttonVariant: keyof typeof variantItems;
	link: string;
	dashButton: string;
}

const variant = {
	default: {
		wrapper: "",
		buttonVariant: "styleized-white-blue-text",
		link: "text-white",
		dashButton: "text-white",
	},
	blueForeground: {
		wrapper: "bg-white",
		buttonVariant: "styleized-blue-darker",
		link: "text-acm-darker-blue",
		dashButton: "hover:text-acm-darker-blue",
	},
} as const;

export function HeroNav({
	navVariant = "default",
	customColor,
}: {
	navVariant?: keyof typeof variant;
	customColor?: string;
}) {
	const linkStyles = customColor || variant[navVariant].link;

	return (
		<div
			className={`absolute left-1/2 top-0 z-50 grid h-24 w-full max-w-screen-xl -translate-x-1/2 grid-cols-4 rounded-lg px-10 py-4 transition-all duration-300 ${variant[navVariant].wrapper}`}
		>
			<Link href="/"className="relative top-4">
					<Image
						src="/img/logos/acm.svg"
						alt="ACM UTSA"
						width={40}
						height={40}
						className="mr-5"
					/>
				</Link>
			<div className="col-span-3 flex items-center gap-x-5">
				<div className=""></div>
				<div className="hidden items-center gap-x-5 md:flex">
					<NavLink linkStyles={linkStyles} href="/events">
						Events
					</NavLink>

					<NavLink linkStyles={linkStyles} href="/team">
						Team
					</NavLink>

					{/* Sub-orgs dropdown */}
					<SuborgsDropdown linkStyles={linkStyles} navVariant={navVariant} />

					<NavLink linkStyles={linkStyles} href="/sponsor">
						Sponsor
					</NavLink>

					<NavLink linkStyles={linkStyles} href="/donate">
						Donate
					</NavLink>

					<NavLink linkStyles={linkStyles} href="#contact_footer">
						Contact
					</NavLink>

					<ResourcesDropdown linkStyles={linkStyles} navVariant={navVariant} />
				</div>

				<div className="flex items-center justify-end gap-x-3">
					<PortalButton navVariant={navVariant} customColor={customColor} />
				</div>

				<div className="flex items-center justify-end gap-2 md:hidden">
					<Sheet>
						<SheetTrigger asChild>
							<button type="button" aria-label="Open menu">
								<Menu color="#266BE8" strokeWidth={2.5} />
							</button>
						</SheetTrigger>
						<SheetContent className="h-[100dvh] w-[90%] max-w-sm overflow-y-auto">
							<div className="mt-8 flex flex-col items-start gap-y-4 pr-2">							<SheetTitle className="sr-only">NavBar</SheetTitle>
							<NavLink linkStyles="text-acm-darker-blue" href="/events">
								Events
							</NavLink>
							<NavLink linkStyles="text-acm-darker-blue" href="/team">
								Team
							</NavLink>
							<SuborgsDropdown linkStyles="text-acm-darker-blue" navVariant={navVariant} />
							<NavLink linkStyles="text-acm-darker-blue" href="/sponsorship">
								Sponsor
							</NavLink>
							<NavLink linkStyles="text-acm-darker-blue" href="/donate">
								Donate
							</NavLink>
							<NavLink linkStyles="text-acm-darker-blue" href="#contact_footer">
								Contact
							</NavLink>
							<ResourcesDropdown linkStyles="text-acm-darker-blue" navVariant={navVariant} />
							</div>
						</SheetContent>
					</Sheet>
				</div>

			</div>
		</div>
	);
}

async function PortalButton({
	navVariant,
	customColor,
}: {
	navVariant: keyof typeof variant;
	customColor?: string;
}) {
	return (
		<Link href={process.env.PORTAL_URL || "https://portal.acmutsa.org"}>
			<Button
				className="text-md"
				variant={variant[navVariant].buttonVariant}
				style={customColor ? { backgroundColor: customColor } : undefined}
			>
				Membership Portal
			</Button>
		</Link>
	);
}

function NavLink({
	href,
	children,
	linkStyles,
}: {
	href: string;
	children: React.ReactNode;
	linkStyles: string;
}) {
	const isCustomColor =
		linkStyles.startsWith("rgb") ||
		linkStyles.startsWith("#") ||
		linkStyles.startsWith("hsl");

	return (
		<Link
			href={href}
			className={`text-md lg:text-lg font-semibold hover:underline ${isCustomColor ? "" : linkStyles
				}`}
			style={isCustomColor ? { color: linkStyles } : undefined}
		>
			{children}
		</Link>
	);
}

function ResourcesDropdown({
	linkStyles,
	navVariant,
}: {
	linkStyles: string;
	navVariant: keyof typeof variant;
}) {
	const isCustomColor =
		linkStyles.startsWith("rgb") ||
		linkStyles.startsWith("#") ||
		linkStyles.startsWith("hsl");

	const triggerClass = `text-md lg:text-lg whitespace-nowrap font-semibold hover:underline ${isCustomColor ? "" : linkStyles
		}`;

	const resources = [
		{ name: "Feedback", href: "/feedback" },
		{ name: "Elections", href: "https://wiki.acmutsa.org/ACM-2026-ACM-Officer-Election-335c7f3b3742802d93abff81c5a1002f", isExternal: true }
	];

	const panelClass =
		navVariant === "default"
			? "border-white/10 bg-white text-acm-darker-blue"
			: "border bg-white text-acm-darker-blue";

	const itemHoverClass =
		navVariant === "default" ? "hover:bg-muted/70" : "hover:bg-muted";

	return (
		<div className="relative group">
			<button
				type="button"
				className={triggerClass}
				style={isCustomColor ? { color: linkStyles } : undefined}
			>
				Resources <span aria-hidden>▾</span>
			</button>

			<div
				className={`
					invisible opacity-0 translate-y-1
					group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
					group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0
					absolute left-0 top-full z-50 mt-3 w-40
					rounded-xl p-2 shadow-lg
					transition-all duration-150
					${panelClass}
				`}
				role="menu"
				aria-label="Resources"
			>
				{resources.map((r) => 
					r.isExternal ? (
						<a
							key={r.name}
							href={r.href}
							target="_blank"
							rel="noopener noreferrer"
							className={`block rounded-lg px-3 py-2 text-sm ${itemHoverClass}`}
							style={isCustomColor ? { color: linkStyles } : undefined}
						>
							{r.name}
						</a>
					) : (
						<Link
							key={r.name}
							href={r.href}
							className={`block rounded-lg px-3 py-2 text-sm ${itemHoverClass}`}
							style={isCustomColor ? { color: linkStyles } : undefined}
						>
							{r.name}
						</Link>
					)
				)}
			</div>
		</div>
	)
}

function SuborgsDropdown({
	linkStyles,
	navVariant,
}: {
	linkStyles: string;
	navVariant: keyof typeof variant;
}) {
	const isCustomColor =
		linkStyles.startsWith("rgb") ||
		linkStyles.startsWith("#") ||
		linkStyles.startsWith("hsl");

	const triggerClass = `text-md lg:text-lg whitespace-nowrap font-semibold hover:underline ${isCustomColor ? "" : linkStyles
		}`;

	// Only slugs matter since routes are /suborgs/[suborg]
	const suborgs: Array<{ name: string; slug: string }> = [
		{ name: "ACM W", slug: "acmw" },
		{ name: "Rowdy Creators", slug: "rowdycreators" },
		{ name: "Coding In Color", slug: "codingincolor" },
		{ name: "ICPC", slug: "acmicpc" },
		{ name: "Rowdy Hacks", slug: "rowdyhacks" },
	];

	const panelClass =
		navVariant === "default"
			? "border-white/10 bg-white text-acm-darker-blue"
			: "border bg-white text-acm-darker-blue";

	const itemHoverClass =
		navVariant === "default" ? "hover:bg-muted/70" : "hover:bg-muted";

	return (
		<div className="relative group">
			<button
				type="button"
				className={triggerClass}
				style={isCustomColor ? { color: linkStyles } : undefined}
			>
				Sub-orgs <span aria-hidden>▾</span>
			</button>

			<div
				className={`
					invisible opacity-0 translate-y-1
					group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
					group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0
					absolute left-0 top-full z-50 mt-3 w-56
					rounded-xl p-2 shadow-lg
					transition-all duration-150
					${panelClass}
				`}
				role="menu"
				aria-label="Sub-orgs"
			>
				{suborgs.map((s) => (
					<Link
						key={s.slug}
						href={`/suborgs/${s.slug}`}
						className={`block rounded-lg px-3 py-2 text-sm ${itemHoverClass}`}
						style={isCustomColor ? { color: linkStyles } : undefined}

					>
						{s.name}
					</Link>
				))}
			</div>
		</div>
	);
}
