import { SUBORGS } from "@/site.config";
import SuborgHero from "./suborg-hero";
import { notFound } from "next/navigation";
import { useColorSlider } from "react-aria";
import { UploadPartCopyOutput$ } from "@aws-sdk/client-s3";

export default function Page({ params }: { params: { slug: string } }) {
	const suborg = SUBORGS[params.slug];

	if (!suborg) {
		return notFound();
	}

	return (
		<>
			<div className="h-36 w-full"></div>
			<SuborgHero
				name={suborg.name}
				shortDesc={suborg.shortDesc}
				leadingSentence={suborg.leadingSentence}
				slug={params.slug}
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
