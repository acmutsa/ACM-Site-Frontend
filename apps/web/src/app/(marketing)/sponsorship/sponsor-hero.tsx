import { SPONSORS } from "@/site.config";
import Image from "next/image";
import { HeartHandshake } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
export default function SponsorHero() {

    return (
        <>
            <div className="w-full bg-acm-darker-blue bg-[url('/img/landing/noise.png')] bg-center p-8 sm:p-16 lg:p-24">
                <div className="mx-auto grid max-w-screen-xl min-h-[70vh] grid-cols-1 w-full py-12">
                    <div className="col-span-1 flex flex-col w-full items-stretch justify-center">
                        <h1 className="text-center font-chillax text-7xl font-black text-white">
                            sponsor acm utsa today!
                        </h1>
                        <div className="p-8"></div>
                        <div className={`w-full flex-col items-center justify-center border p-10`}>
                            <h1 className="text-left font-chillax text-5xl font-black">
                                Why Sponsor?
                            </h1>
                        </div>
                        <div className="w-full grid grid-cols-3 gap-4 border text-center font-chillax text-2xl font-bold ">
                            <div className="border-r p-10">
                                <p>Support a large and growing community of future innovators through activation events and workshops</p>
                            </div>
                            <div className="border-r p-10">
                                <p>Participate in our annual events such as RowdyHacks, CodeQuantum and more</p>
                            </div>
                            <div className="p-10">
                                <p>Easily recruit from a large base of talented individuals across multiple sectors in tech</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white p-24 ">
                <div className="mx-auto grid max-w-screen-xl grid-cols-3">
                    <div className="col-span-3 flex flex-col w-full items-stretch justify-center">
                        <div className="w-full items-center justify-center border border-acm-darker-blue p-10">
                            <h1 className="text-acm-darker-blue text-right font-chillax text-5xl font-black">
                                Interested?
                            </h1>
                        </div>
                        <div className="relative col-span-3 border border-acm-darker-blue p-10">
                            <h1 className="text-black text-right font-chillax text-3xl font-black">Check out our<br></br>
                                <a className="text-acm-darker-blue hover:underline text-4xl" href="/img/other/sponsorship-packet.pdf" target="_blank" rel="noopener noreferrer">
                                    {"Sponsorship Packet >"}
                                </a>
                            </h1>
                            <div className="p-10"></div>
                            <a href="mailto:team@acmutsa.org?subject=Sponsorship%20Inquiry" className="absolute bottom-5 right-10 p-3 font-chillax">
                                <Button variant="styleized-blue-white-text">
                                    Contact Us
                                </Button></a>
                        </div>
                    </div>
                </div>
            </div>
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
                        className={`flex aspect-square flex-col items-center justify-center border-t-2 border-acm-darker-blue/50 p-10 transition-all hover:bg-acm-darker-blue/5 ${index > 0 ? "border-l-2" : ""
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
                    href="/sponsor-us"
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
            <div className="p-10"></div>
            <Footer />
        </>
    );
}