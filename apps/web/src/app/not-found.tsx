import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
	return (
		<div className="flex min-h-screen w-full items-center justify-center bg-acm-darker-blue bg-[url('/img/landing/noise.png')] bg-center px-5">
			<div className="flex aspect-[12/16] w-full max-w-[500px] flex-col items-center justify-center rounded-lg bg-white p-10">
				<Image
					src="/img/logos/acm-blue.png"
					alt="404"
					width={200}
					height={200}
					className="pb-10"
				/>
				<h2 className="pb-5 font-chillax text-5xl font-bold text-acm-darker-blue">
					404 - not found
				</h2>
				<p className="text-center font-mono font-semibold">
					We couldn't find that page! If you believe this is an error,
					please{" "}
					<Link
						href="/contact"
						className="text-acm-darker-blue underline"
					>
						let us know
					</Link>
					!
				</p>

				<Link href="/" className="mt-5">
					<Button variant={"styleized-blue-darker"}>
						Return Home
					</Button>
				</Link>
			</div>
		</div>
	);
}
