import Footer from "@/components/shared/footer";
import { SponsorsSection } from "@/components/shared/sponsors-section";
import { Button } from "@/components/ui/button";

export default function SponsorHero() {
	return (
		<>
			<div className="w-full bg-acm-darker-blue bg-[url('/img/landing/noise.png')] bg-center p-8 sm:p-16 lg:p-24">
				<div className="mx-auto grid min-h-[70vh] w-full max-w-screen-xl grid-cols-1 py-12">
					<div className="col-span-1 flex w-full flex-col items-stretch justify-center">
						<h1 className="text-center font-chillax text-4xl md:text-7xl font-black text-white">
							sponsor acm utsa today!
						</h1>
						<div className="p-8"></div>
						<div
							className={`w-full flex-col items-center justify-center border p-10`}
						>
							<h1 className="text-left font-chillax text-3xl md:text-5xl font-black">
								Why Sponsor?
							</h1>
						</div>
						<div className="text-sm grid w-full grid-cols-1 md:grid-cols-3 gap-4 border text-center font-chillax font-bold sm:text-lg md:text-xl lg:text-2xl ">
							<div className="border-b md:border-b-0 md:border-r p-10">
								<p>
									Support a large and growing community of
									future innovators through activation events
									and workshops
								</p>
							</div>
							<div className="border-b md:border-b-0 md:border-r p-10">
								<p>
									Participate in our annual events such as
									RowdyHacks, CodeQuantum and more
								</p>
							</div>
							<div className="p-10">
								<p>
									Easily recruit from a large base of talented
									individuals across multiple sectors in tech
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full bg-white p-8 sm:p-16 lg:p-24 ">
				<div className="mx-auto grid max-w-screen-xl grid-cols-3">
					<div className="col-span-3 flex w-full flex-col items-stretch justify-center">
						<div className="w-full items-center justify-center border border-acm-darker-blue p-10">
							<h1 className="text-right font-chillax text-3xl md:text-5xl font-black text-acm-darker-blue">
								Interested?
							</h1>
						</div>
						<div className="relative col-span-3 border border-acm-darker-blue p-10">
							<h1 className="text-right font-chillax text-2xl md:text-3xl font-black text-black">
								Check out our<br></br>
								<a
									className="text-xl md:text-4xl text-acm-darker-blue hover:underline"
									href="/img/other/sponsorship-packet.pdf"
									target="_blank"
									rel="noopener noreferrer"
								>
									{"Sponsorship Packet >"}
								</a>
							</h1>
							<div className="p-10"></div>
							<a
								href="mailto:publicrelations@acmutsa.org?subject=Sponsorship%20Inquiry"
								className="absolute bottom-5 right-10 p-3 font-chillax"
							>
								<Button variant="styleized-blue-white-text">
									Contact Us
								</Button>
							</a>
						</div>
					</div>
				</div>
			</div>
			<SponsorsSection />
			<div className="p-10"></div>
			<Footer orgName="ACMUTSA" />
		</>
	);
}
