import Image from "next/image";
import type { RGBColor, Suborg } from "@/site.config";
import { Suspense, cloneElement, Fragment } from "react";
import { _Object$ } from "@aws-sdk/client-s3";
import Footer from "@/components/shared/footer";

function modifyColor(color: RGBColor, alpha: number): string {
	const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
	if (!match) return color;

	const [, r, g, b] = match;
	return `rgb(${r} ${g} ${b} / ${alpha})`;
}

export default function SuborgHero(suborg: Suborg) {
	const {
		name,
		shortDesc,
		logoUrl,
		colors,
		leadingSentence,
		discordLink,
		aboutUs_One,
		aboutUs_Two,
		missionHead,
		missionHead2,
		missionHead3,
		mPhrase1,
		mPhrase2,
		mPhrase3,
		suborgemail,
	} = suborg;

	return (
		<>
			<div
				className="mx-auto grid w-[90%] max-w-screen-xl grid-cols-5 border-2 border-acm-darker-blue/50"
				style={{
					borderColor: modifyColor(colors.poppy, 0.5),
				}}
			>
				<div
					className={`col-span-5 flex h-[40vh] w-full flex-col items-center justify-center ${name.toLowerCase().includes("y") ? "gap-y-6" : "gap-y-2"} bg-[url('/img/landing/noise.png')] bg-center`}
					style={{
						backgroundColor: colors.poppy,
					}}
				>
					<h1 className="text-center font-chillax text-6xl font-black text-white sm:text-6xl md:text-7xl lg:text-9xl">
						{name.toLowerCase()}
					</h1>
					<h2 className="text-center font-calsans text-lg font-bold leading-tight tracking-wide text-white md:text-xl lg:text-2xl">
						{shortDesc}
					</h2>
				</div>
				<div
					className="col-span-3 flex min-h-[350px] flex-col border p-10"
					style={{
						borderColor: modifyColor(colors.poppy, 0.5),
					}}
				>
					<h1
						className="text-left font-calsans text-2xl font-bold leading-tight tracking-wide sm:text-3xl md:text-4xl lg:text-5xl"
						style={{
							color: colors.poppy,
						}}
					>
						{leadingSentence}
					</h1>
					<div className="mt-auto flex items-end justify-start justify-self-end">
						<p
							className="ml-auto justify-self-end  font-mono text-xs "
							style={{
								color: colors.poppy,
							}}
						>
							Fig. 1
						</p>
					</div>
				</div>
				<div
					className="col-span-2 flex flex-col items-center justify-center border p-10"
					style={{
						borderColor: modifyColor(colors.poppy, 0.5),
					}}
				>
					<Image
						src={
							logoUrl.includes("icpc")
								? "/img/logos/suborgs/icpc-green.png"
								: logoUrl
						}
						alt={name}
						width={300}
						height={300}
					/>
				</div>
				<div
					className="col-span-5 flex flex-col items-center justify-center border  p-5"
					style={{
						borderColor: modifyColor(colors.poppy, 0.5),
					}}
				></div>
				<div
					className={`col-span-5 flex-col items-center justify-center border p-10`}
					style={{
						borderColor: modifyColor(colors.poppy, 0.5),
					}}
				>
					<h1
						className="text-center font-chillax text-4xl font-black sm:text-5xl md:text-7xl lg:text-9xl "
						style={{
							borderColor: modifyColor(colors.poppy, 0.5),
							color: colors.poppy,
						}}
					>
						{"About Us"}
					</h1>
				</div>

				<div
					className={`col-span-5 flex-col items-center justify-center border p-10`}
					style={{
						borderColor: modifyColor(colors.poppy, 0.5),
					}}
				>
					<h1
						className="text-center font-calsans text-xl font-bold leading-tight tracking-wide sm:text-2xl md:text-3xl lg:text-5xl"
						style={{
							color: colors.poppy,
						}}
					>
						<Pill
							icon={
								<Image
									src={logoUrl}
									alt={name + "Logo"}
									width={30}
									height={30}
								/>
							}
							bgColor={modifyColor(colors.poppy, 0.25)}
						>
							<span className="font-bold sm:text-lg md:text-xl lg:text-3xl ">
								{name}
							</span>
						</Pill>{" "}
						{aboutUs_One}
						<Pill
							icon={
								<Image
									src={logoUrl}
									alt={name + "Logo"}
									width={30}
									height={30}
								/>
							}
							bgColor={modifyColor(colors.poppy, 0.25)}
						>
							<span className="font-bold sm:text-lg md:text-xl lg:text-3xl ">
								{name}
							</span>
						</Pill>{" "}
						{aboutUs_Two}
					</h1>
				</div>

				<div
					className={`col-span-5 flex-col items-center justify-center border p-5`}
					style={{
						borderColor: modifyColor(colors.poppy, 0.5),
					}}
				></div>

				<div
					className={`col-span-5 flex-col items-center justify-center border p-10`}
					style={{
						backgroundColor: "white",
						borderColor: modifyColor(colors.poppy, 0.5),
					}}
				>
					<h1
						className="text-center font-chillax text-4xl font-black sm:text-5xl md:text-7xl lg:text-9xl "
						style={{
							color: colors.poppy,
							borderColor: modifyColor(colors.poppy, 0.5),
						}}
					>
						{"Mission"}
					</h1>
				</div>

				<div
					className="col-span-5 grid grid-cols-1 md:grid-cols-3 border text-center font-chillax font-bold text-base sm:text-lg md:text-xl lg:text-2xl" style={{
						color: colors.poppy,
						borderColor: modifyColor(colors.poppy, 0.5),
					}}
				>
					<div
						className="border-b md:border-b-0 md:border-r p-6 lg:p-10 "
						style={{
							borderColor: modifyColor(colors.poppy, 0.5),
						}}
					>
						<h1 className="p-5 text-center font-chillax text-lg font-bold sm:text-xl md:text-3xl lg:text-4xl">
							{missionHead}
						</h1>
						<p>{mPhrase1}</p>
					</div>
					<div
						className="border-b md:border-b-0 md:border-r p-6 lg:p-10 "
						style={{
							borderColor: modifyColor(colors.poppy, 0.5),
						}}
					>
						<h1 className="p-5 text-center font-chillax text-lg font-bold sm:text-xl md:text-3xl lg:text-4xl">
							{missionHead2}
						</h1>
						<p>{mPhrase2}</p>
					</div>
					<div
						className=" p-6 lg:p-10 "
						style={{
							borderColor: modifyColor(colors.poppy, 0.5),
						}}
					>
						<h1 className="p-5 text-center font-chillax text-lg font-bold sm:text-xl md:text-3xl lg:text-4xl">
							{missionHead3}
						</h1>
						<p>{mPhrase3}</p>
					</div>
				</div>
			</div>

			<div className="p-5"></div>

			<div
				className="mx-auto grid w-[90%] max-w-screen-xl grid-cols-5 border-2 border-acm-darker-blue/50 bg-[url('/img/landing/noise.png')] p-10"
				style={{
					borderColor: modifyColor(colors.poppy, 0.5),
					background: colors.poppy,
				}}
			>
				<div
					className={`col-span-5 flex-col items-center justify-center text-center font-chillax text-4xl font-black text-white sm:text-5xl md:text-5xl lg:text-8xl`}
				>
					<h1>
						<span className="underline">Join</span> {name}
					</h1>
				</div>
				<div className=" relative col-span-3 flex flex-col items-start justify-center py-5 pl-0">
					<Image
						className="h-auto w-[75px] object-contain opacity-90 sm:w-[180px] md:w-[220px] lg:w-[280px] "
						src={
							logoUrl.includes("icpc")
								? "/img/logos/suborgs/icpc-white.png"
								: logoUrl
						}
						alt={name}
						width={logoUrl.includes("icpc") ? 400 : 500}
						height={0}
					/>
				</div>
				<div className="relative col-span-2 flex flex-col items-start justify-center">
					<a
						href="https://portal.acmutsa.org/"
						target="_blank"
						className="absolute bottom-0 right-0 cursor-pointer whitespace-nowrap font-calsans text-2xl font-bold tracking-wide text-white hover:underline sm:text-3xl md:text-4xl lg:text-6xl"
					>
						{"Become a Member >"}
					</a>
				</div>
			</div>

			<div className="p-5"></div>

			<div
				className="mx-auto grid w-[90%] max-w-screen-xl justify-center border-[5px] border-dashed p-5 font-chillax text-3xl font-bold sm:text-3xl md:text-6xl lg:text-8xl"
				style={{
					color: colors.poppy,
					borderColor: modifyColor(colors.poppy, 0.5),
				}}
			>
				Want to Know More?
			</div>

			<div className="p-5"></div>

			<div className="mx-auto grid w-[90%] max-w-screen-xl grid-cols-5">
				<div
					className="col-span-5 grid grid-cols-2 gap-4 border text-center font-chillax text-2xl font-bold "
					style={{
						borderColor: modifyColor(colors.poppy, 0.5),
						background: colors.poppy,
					}}
				>
					<div className="relative border-r border-white py-20 px-5 text-2xl text-white sm:text-3xl md:text-5xl lg:text-7xl">
						<a
							href={discordLink}
							target="_blank"
							className="hover:underline"
						>
							{"Join Our Discord >"}
						</a>
						<Image
							className="lg:left-15 lg:w-18 absolute left-12 top-10 h-8 w-10 sm:left-9 sm:top-9  
						sm:h-10 sm:w-12 md:left-12 md:top-9 md:h-12 md:w-16 lg:top-12 lg:h-14"
							src="/img/other/Discord Logo.png"
							alt="Discord Logo"
							width={75}
							height={57}
						/>
					</div>

					<div className=" py-20 text-2xl text-white sm:text-3xl md:text-5xl lg:text-7xl">
						<a
							href="/events"
							target="_blank"
							className="cursor-pointer hover:underline"
						>
							{"Check Out Our Events >"}
						</a>
					</div>
				</div>
			</div>
			<div className="p-5"></div>

			<div
				style={{ "--footer-bg": colors.poppy } as React.CSSProperties}
				className="[&_footer]:bg-[var(--footer-bg)]"
			>
				<Footer orgName={name} email={suborgemail} />
			</div>
		</>
	);
}

function Pill({
	icon,
	children,
	bgColor,
	className,
}: {
	icon: React.ReactNode;
	children: React.ReactNode;
	bgColor?: string;
	className?: string;
}) {
	return (
		<span
			className={`inline-flex h-6 items-center rounded-full px-2 md:h-8 lg:h-10 lg:px-3`}
			style={{
				backgroundColor: bgColor,
			}}
		>
			{cloneElement(icon as React.ReactElement<any>, {
				size: 20,
				className: "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7",
			})}
			<span className="ml-2">{children}</span>
		</span>
	);
}
