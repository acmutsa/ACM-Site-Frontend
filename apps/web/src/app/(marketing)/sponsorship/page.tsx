// page.tsx
import { SUBORGS } from "@/site.config";
import { HeroNav } from "@/components/shared/navbar";
import { notFound } from "next/navigation";
import { useColorSlider } from "react-aria";
import { UploadPartCopyOutput$ } from "@aws-sdk/client-s3";
import SponsorHero from "./sponsor-hero";

export default function Page() {

  return (
    <div className="w-full flex flex-col items-center text-white">
      <div className="bg-fit relative flex w-full flex-col items-center justify-center overflow-hidden bg-acm-darker-blue bg-[url('/img/landing/noise.png')] bg-center p-12">
        <HeroNav />
      </div>
      <SponsorHero />
    </div>
  );
}
