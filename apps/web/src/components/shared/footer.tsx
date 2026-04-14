import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// This is for the parameters that need to be taken in for the Footer component for each suborg page
type FooterProps = {
	email: string;
	orgName: string;
};

export default function Footer({ email, orgName }: FooterProps) {
	return (
		<div className="p-10 pt-0">
			<footer className="grid min-h-[50vh] grid-cols-[auto_1fr] gap-10 rounded-xl bg-acm-darker-blue bg-[url('/img/landing/noise.png')] bg-center p-10">				<div className="flex flex-col items-start justify-start">
				<h1 className="text-balance text-left font-calsans text-6xl font-black leading-none tracking-wide text-white">
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
				<div className="grid grid-cols-4 gap-10">
					<div className="flex flex-col items-start justify-start">
						<h3 id="contact_footer" className="pb-3 font-mono text-xl font-bold text-white">
							Contacts
						</h3><br />
						
						<p className="p-0 text-left font-calsans text-white">ACM UTSA Email:</p>
						<FooterLink
							text="team@acmutsa.org"
							href={`mailto:team@acmutsa.org?subject=Inquiry about ACM UTSA Suborg`}
						/>
						<p className="p-0 text-left font-calsans text-white mt-4">{orgName} Email:</p>
						<FooterLink
							text={email}
							href={`mailto:${email}?subject=Inquiry about ${orgName} Suborg`}
						/>
					</div>
					<div className="flex flex-col items-start justify-start">

						<h3 className="pb-3 font-mono text-xl font-bold text-white">
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
					<div className="flex flex-col items-start justify-start">
						<h3 className="pb-3 font-mono text-xl font-bold text-white">
							Suborgs &<br />
							Hackathons
						</h3>
						<FooterLink text="ACM-W" href="/suborgs/acmw" />
						<FooterLink text="Coding in Color" href="/suborgs/codingincolor" />
						<FooterLink text="ICPC" href="/suborgs/acmicpc" />
						<FooterLink text="Rowdy Creators" href="/suborgs/rowdycreators" />
						<FooterLink text="RowdyHacks" href="/suborgs/rowdyhacks" />
						<FooterLink text="Code Quantum" href="https://cqhacks.org" />
						<FooterLink text="Rowdy Datathon" href="https://rowdydatathon.org" />
					</div>
					<div className="flex flex-col items-start justify-start">
						<h3 className="pb-3 font-mono text-xl font-bold text-white">
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
				variant={"link"}
				className="p-0 text-left font-calsans text-white"
			>
				{text}
			</Button>
		</Link>
	);
}
