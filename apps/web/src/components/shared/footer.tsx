import Image from "next/image";
import Link from "next/link";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

// props
type FooterProps = {
	email?: string; // now optional
	orgName: string;
};

export default function Footer({ email, orgName }: FooterProps) {
	return (
		<div className="p-10 pt-0">
			<footer className="grid min-h-[50vh] grid-cols-[auto_1fr] gap-10 rounded-xl bg-acm-darker-blue bg-[url('/img/landing/noise.png')] bg-center p-10">
				<div className="flex flex-col items-start justify-start">
					<h1 className="text-balance text-left font-calsans text-2xl font-black leading-none tracking-wide text-white sm:text-3xl md:text-3xl lg:text-4xl">
						The Association
						<br />
						for Computing
						<br />
						Machinery
						<br />
						at UTSA
					</h1>

					<Image
						src="/img/logos/acm.svg"
						alt="ACM Logo"
						width={50}
						height={50}
						className="mt-auto justify-self-end"
					/>
				</div>

				<div className="hidden md:grid md:grid-cols-4 md:gap-10">
					{/* Contacts */}
					<div className="flex flex-col items-start justify-start">
						<h3
							id="contact_footer"
							className="pb-3 font-mono text-base font-bold text-white sm:text-lg md:text-lg lg:text-xl"
						>
							Contacts
						</h3>
						<br />

						<p className="p-0 text-left font-calsans text-sm text-white sm:text-sm md:text-base lg:text-base">
							ACM UTSA Email:
						</p>
						<FooterLink
							text="team@acmutsa.org"
							href={`mailto:team@acmutsa.org?subject=Inquiry about ACM UTSA`}
						/>

						{/* optional suborg email */}
						{email && (
							<>
								<p className="mt-4 p-0 text-left font-calsans text-sm text-white sm:text-sm md:text-base lg:text-base">
									{orgName} Email:
								</p>
								<FooterLink
									text={email}
									href={`mailto:${email}?subject=Inquiry about ${orgName}`}
								/>
							</>
						)}
					</div>

					{/* Resources */}
					<div className="flex flex-col items-start justify-start">
						<h3 className="pb-3 font-mono text-base font-bold text-white sm:text-lg md:text-lg lg:text-xl">
							Resources &<br />
							Important Links
						</h3>

						<FooterLink
							text="Discord"
							href="https://go.acmutsa.org/discord"
							target="_blank"
						/>
						<FooterLink
							text="Wiki"
							href="https://wiki.acmutsa.org/"
							target="_blank"
						/>
						<FooterLink
							text="Constitution"
							href="https://file.notion.so/f/f/70f8f5fc-b58a-46f6-9e2b-d7bf203e13ab/6096233e-217f-4599-b131-48738b2bc7af/THE_ASSOCIATION_OF_COMPUTING_MACHINERY_AT_THE_UNIVERSITY_OF_TEXAS_AT_SAN_ANTONIO_CONSTITUTION_-_Updated_Spring_2025.pdf?table=block&id=328c7f3b-3742-807a-b8d0-e8853a31efed&spaceId=70f8f5fc-b58a-46f6-9e2b-d7bf203e13ab&expirationTimestamp=1774051200000&signature=P5WSQulpp21LNG0JUMAa64ZL9BDZhnwjwrkIK17I9PY&downloadName=THE+ASSOCIATION+OF+COMPUTING+MACHINERY+AT+THE+UNIVERSITY+OF+TEXAS+AT+SAN+ANTONIO+CONSTITUTION+-+Updated+Spring+2025.pdf"
							target="_blank"
						/>
					</div>

					{/* Suborgs */}
					<div className="flex flex-col items-start justify-start">
						<h3 className="pb-3 font-mono text-base font-bold text-white sm:text-lg md:text-lg lg:text-xl">
							Suborgs &<br />
							Hackathons
						</h3>

						<FooterLink text="ACM-W" href="/suborgs/acmw" />
						<FooterLink
							text="Coding in Color"
							href="/suborgs/codingincolor"
						/>
						<FooterLink text="ICPC" href="/suborgs/acmicpc" />
						<FooterLink
							text="Rowdy Creators"
							href="/suborgs/rowdycreators"
						/>
						<FooterLink
							text="RowdyHacks"
							href="/suborgs/rowdyhacks"
						/>
						<FooterLink
							text="Code Quantum"
							href="https://cqhacks.org"
						/>
						<FooterLink
							text="Rowdy Datathon"
							href="https://rowdydatathon.org"
						/>
					</div>

					{/* Social */}
					<div className="flex flex-col items-start justify-start">
						<h3 className="pb-3 font-mono text-base font-bold text-white sm:text-lg md:text-lg lg:text-xl">
							Social
							<br />
							Media
						</h3>

						<FooterLink
							text="Instagram"
							href="https://www.instagram.com/acmutsa"
							target="_blank"
						/>
						<FooterLink
							text="LinkedIn"
							href="https://www.linkedin.com/company/acmutsa"
							target="_blank"
						/>
						<FooterLink
							text="YouTube"
							href="https://www.youtube.com/@acmutsa"
							target="_blank"
						/>
						<FooterLink
							text="Twitter"
							href="https://x.com/acmutsa"
							target="_blank"
						/>
						<FooterLink
							text="Facebook"
							href="https://www.facebook.com/acmutsa"
							target="_blank"
						/>
					</div>
				</div>

				<Accordion type="single" collapsible className="md:hidden">
					<AccordionItem value="contacts" className="border-b-0">
						<AccordionTrigger className="py-3 font-chillax text-sm font-bold text-white sm:text-base md:text-base">
							Contacts
						</AccordionTrigger>
						<AccordionContent className="">
							<div className="flex flex-col items-start justify-start gap-2">
								<p className="p-0 text-left font-calsans text-sm text-white">
									ACM UTSA Email:
								</p>
								<FooterLink
									text="team@acmutsa.org"
									href={`mailto:team@acmutsa.org?subject=Inquiry about ACM UTSA`}
								/>
								{email && (
									<>
										<p className="p-0 pt-2 text-left font-calsans text-sm text-white">
											{orgName} Email:
										</p>
										<FooterLink
											text={email}
											href={`mailto:${email}?subject=Inquiry about ${orgName}`}
										/>
									</>
								)}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="resources" className="border-b-0">
						<AccordionTrigger className="py-3 font-chillax text-sm font-bold text-white sm:text-base md:text-base">
							Resources & Important Links
						</AccordionTrigger>
						<AccordionContent className="">
							<div className="flex flex-col items-start justify-start gap-2">
								<FooterLink
									text="Discord"
									href="https://go.acmutsa.org/discord"
									target="_blank"
								/>
								<FooterLink
									text="Wiki"
									href="https://wiki.acmutsa.org/"
									target="_blank"
								/>
								<FooterLink
									text="Constitution"
									href="https://file.notion.so/f/f/70f8f5fc-b58a-46f6-9e2b-d7bf203e13ab/6096233e-217f-4599-b131-48738b2bc7af/THE_ASSOCIATION_OF_COMPUTING_MACHINERY_AT_THE_UNIVERSITY_OF_TEXAS_AT_SAN_ANTONIO_CONSTITUTION_-_Updated_Spring_2025.pdf?table=block&id=328c7f3b-3742-807a-b8d0-e8853a31efed&spaceId=70f8f5fc-b58a-46f6-9e2b-d7bf203e13ab&expirationTimestamp=1774051200000&signature=P5WSQulpp21LNG0JUMAa64ZL9BDZhnwjwrkIK17I9PY&downloadName=THE+ASSOCIATION+OF+COMPUTING+MACHINERY+AT+THE+UNIVERSITY+OF+TEXAS+AT+SAN+ANTONIO+CONSTITUTION+-+Updated+Spring+2025.pdf"
									target="_blank"
								/>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="suborgs" className="border-b-0">
						<AccordionTrigger className="py-3 font-chillax text-sm font-bold text-white sm:text-base md:text-base">
							Suborgs & Hackathons
						</AccordionTrigger>
						<AccordionContent className="">
							<div className="flex flex-col items-start justify-start gap-2">
								<FooterLink text="ACM-W" href="/suborgs/acmw" />
								<FooterLink
									text="Coding in Color"
									href="/suborgs/codingincolor"
								/>
								<FooterLink
									text="ICPC"
									href="/suborgs/acmicpc"
								/>
								<FooterLink
									text="Rowdy Creators"
									href="/suborgs/rowdycreators"
								/>
								<FooterLink
									text="RowdyHacks"
									href="/suborgs/rowdyhacks"
								/>
								<FooterLink
									text="Code Quantum"
									href="https://cqhacks.org"
								/>
								<FooterLink
									text="Rowdy Datathon"
									href="https://rowdydatathon.org"
								/>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="social" className="border-b-0">
						<AccordionTrigger className="py-3 font-chillax text-sm font-bold text-white sm:text-base md:text-base">
							Social Media
						</AccordionTrigger>
						<AccordionContent className="">
							<div className="flex flex-col items-start justify-start gap-2">
								<FooterLink
									text="Instagram"
									href="https://www.instagram.com/acmutsa"
									target="_blank"
								/>
								<FooterLink
									text="LinkedIn"
									href="https://www.linkedin.com/company/acmutsa"
									target="_blank"
								/>
								<FooterLink
									text="YouTube"
									href="https://www.youtube.com/@acmutsa"
									target="_blank"
								/>
								<FooterLink
									text="Twitter"
									href="https://x.com/acmutsa"
									target="_blank"
								/>
								<FooterLink
									text="Facebook"
									href="https://www.facebook.com/acmutsa"
									target="_blank"
								/>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</footer>
		</div>
	);
}

function FooterLink({
	text,
	href,
	target,
}: {
	text: string;
	href: string;
	target?: string;
}) {
	return (
		<Link href={href} target={target}>
			<Button
				variant="link"
				className="p-0 text-left font-calsans text-sm text-white sm:text-sm md:text-base lg:text-base"
			>
				{text}
			</Button>
		</Link>
	);
}
