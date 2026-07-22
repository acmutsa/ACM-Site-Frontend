import MeetTheTeamClient from "@/components/team/meet-the-team.client";

export default function TeamPage() {
	return (
		<>
			<div className="h-28 w-full" />

			<main className="mx-auto w-full max-w-screen-xl px-10 pb-24">
				<h1 className="font-chillax text-6xl font-black tracking-tight text-acm-darker-blue md:text-8xl">
					meet our team.
				</h1>

				<p className="mt-4 max-w-[850px] font-mono text-sm font-semibold text-acm-darker-blue/70">
					Browse the people behind ACM UTSA, our sub-organizations, and our major
					events.
				</p>

				<div className="mt-10">
					<MeetTheTeamClient />
				</div>
				
			</main>
		</>
	);
}
