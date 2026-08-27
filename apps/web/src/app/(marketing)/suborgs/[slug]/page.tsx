import { SUBORGS } from "@/site.config";
import SuborgHero from "./suborg-hero";
import { notFound } from "next/navigation";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const suborg = SUBORGS[slug];
	if (!suborg) {
		return notFound();
	}

	return (
		<>
			<SuborgHero
				name={suborg.name}
				shortDesc={suborg.shortDesc}
				leadingSentence={suborg.leadingSentence}
				slug={slug}
				logoUrl={suborg.logoUrl}
				colors={suborg.colors}
				discordLink={suborg.discordLink}
				aboutUs_One={suborg.aboutUs_One}
				aboutUs_Two={suborg.aboutUs_Two}
				missionHead={suborg.missionHead}
				missionHead2={suborg.missionHead2}
				missionHead3={suborg.missionHead3}
				mPhrase1={suborg.mPhrase1}
				mPhrase2={suborg.mPhrase2}
				mPhrase3={suborg.mPhrase3}
				suborgemail={suborg.suborgemail}
			/>
		</>
	);
}
