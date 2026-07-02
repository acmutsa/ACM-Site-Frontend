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
	const { name, shortDesc, logoUrl, colors, leadingSentence, discordLink, aboutUs_One, aboutUs_Two, missionHead, missionHead2, missionHead3, mPhrase1, mPhrase2, mPhrase3, suborgemail } = suborg;

	return (
		<>
			<div
				className="mx-auto grid max-w-screen-xl grid-cols-5 border-2 border-acm-darker-blue/50"
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
					<h1 className="text-center font-chillax text-9xl font-black text-white">
						{name.toLowerCase()}
					</h1>
					<h2 className="text-center font-calsans text-2xl font-bold leading-tight tracking-wide text-white">
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
						className="text-left font-calsans text-5xl font-bold leading-tight tracking-wide"
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
					<Image src={logoUrl.includes("icpc") ? "/img/logos/suborgs/icpc-green.png" : logoUrl} alt={name} width={300} height={300} />
				</div>
				<div className="col-span-5 flex flex-col items-center justify-center border  p-5"
					style={{
						borderColor: modifyColor(colors.poppy, 0.5),
					}}></div>
				<div
					className={`col-span-5 flex-col items-center justify-center border p-10`}
					style={{
						borderColor: modifyColor(colors.poppy, 0.5),
					}}
				>


					<h1 className="text-center font-chillax text-9xl font-black "
						style={{
							borderColor: modifyColor(colors.poppy, 0.5),
							color: colors.poppy,
						}}>
						{"About Us"}
					</h1>
				</div>

				<div className={`border col-span-5 flex-col items-center justify-center p-10`}
					style={{
						borderColor: modifyColor(colors.poppy, 0.5),
					}}>

					<h1
						className="text-center font-calsans text-5xl font-bold leading-tight tracking-wide"
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
						><span className="font-bold text-3xl ">{name}</span>
						</Pill> {aboutUs_One}
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
						><span className="font-bold text-3xl ">{name}</span>
						</Pill> {aboutUs_Two}
					</h1>
				</div>


				<div className={`border col-span-5 flex-col items-center justify-center p-5`}
					style={{
						borderColor: modifyColor(colors.poppy, 0.5),
					}}>
				</div>


				<div
					className={`col-span-5 flex-col items-center justify-center border p-10`}
					style={{
						backgroundColor: "white",
						borderColor: modifyColor(colors.poppy, 0.5),
					}}>


					<h1 className="text-center font-chillax text-9xl font-black "
						style={{
							color: colors.poppy,
							borderColor: modifyColor(colors.poppy, 0.5),
						}}>
						{"Mission"}
					</h1>
				</div>

				<div className="col-span-5 grid grid-cols-3 gap-4 border text-center font-chillax text-2xl font-bold "
					style={{
						color: colors.poppy,
						borderColor: modifyColor(colors.poppy, 0.5),
					}}>
					<div className="border-r p-10"
						style={{
							borderColor: modifyColor(colors.poppy, 0.5),
						}}>
						<h1 className="text-center font-chillax text-5xl font-bold p-5">
							{missionHead}
						</h1>
						<p>{mPhrase1}</p>
					</div>
					<div className="border-r p-10"
						style={{
							borderColor: modifyColor(colors.poppy, 0.5),
						}}>
						<h1 className="text-center font-chillax text-5xl font-bold p-5">
							{missionHead2}
						</h1>
						<p>{mPhrase2}</p>
					</div>
					<div className="p-10"
						style={{
							borderColor: modifyColor(colors.poppy, 0.5),
						}}>

						<h1 className="text-center font-chillax text-5xl font-bold p-5">
							{missionHead3}
						</h1>
						<p>{mPhrase3}</p>
					</div>
				</div>
			</div>

			<div className="p-5"></div>

			<div
				className="mx-auto bg-[url('/img/landing/noise.png')] grid max-w-screen-xl grid-cols-5 border-2 border-acm-darker-blue/50 p-10"
				style={{
					borderColor: modifyColor(colors.poppy, 0.5),
					background: colors.poppy,
				}}
			>
				<div
					className={`col-span-5 flex-col items-center justify-center text-white text-center font-chillax text-8xl font-black`}
				>
					<h1 >
						<span className="underline">Join</span> {name}
					</h1>
				</div>
				<div
					className=" relative col-span-3 flex flex-col items-start justify-center p-5"
				>
					<Image className="opacity-90 max-h-[450px] max-w-full object-contain" src={logoUrl.includes("icpc") ? "/img/logos/suborgs/icpc-white.png" : logoUrl} alt={name} width={logoUrl.includes("icpc") ? 400 : 500} height={0} />
				</div>

				<div
					className="relative col-span-2 flex flex-col items-start justify-center"
				>
					<a href="https://portal.acmutsa.org/" target="_blank"
						className="hover:underline cursor-pointer absolute bottom-0 right-0 font-calsans text-8xl font-bold tracking-wide text-white"
					>
						{"Become a Member >"}
					</a>
				</div>
			</div>

			<div className="p-5"></div>

			<div className="mx-auto grid max-w-screen-xl text-8xl justify-center border-[5px] border-dashed font-bold font-chillax p-5"
				style={{
					color: colors.poppy,
					borderColor: modifyColor(colors.poppy, 0.5),
				}}>
				Want to Know More?
			</div>

			<div className="p-5"></div>

			<div
				className="mx-auto grid max-w-screen-xl grid-cols-5"
			>

				<div className="col-span-5 grid grid-cols-2 gap-4 border text-center font-chillax text-2xl font-bold "
					style={{
						borderColor: modifyColor(colors.poppy, 0.5),
						background: colors.poppy,

					}}>

					<div className="relative border-r border-white p-20 text-white text-7xl">
						<a href={discordLink} target="_blank" className="hover:underline">
							{"Join Our Discord >"}</a>
						<Image className="absolute top-12 left-15" src="/img/other/Discord Logo.png" alt="Discord Logo" width={75} height={57} />
					</div>

					<div className=" p-20 text-7xl text-white">
						<a href = "/events" target = "_blank" className="hover:underline cursor-pointer">
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
}: {
	icon: React.ReactNode;
	children: React.ReactNode;
	bgColor?: string;
}) {
	return (
		<span
			className="inline-flex h-10 items-center rounded-full px-4"
			style={{
				backgroundColor: bgColor,
			}}
		>
			{cloneElement(icon as React.ReactElement<any>, { size: 20 })}
			<span className="ml-2">{children}</span>
		</span>
	);
}

