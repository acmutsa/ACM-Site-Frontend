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
      <SponsorHero />
    </div>
  );
}