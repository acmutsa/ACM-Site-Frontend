"use client";

import { useMemo, useState } from "react";
import OrbitCarousel, { type OrbitPerson } from "@/components/team/orbit-carousel";
import { TEAM_GROUPS } from "@/components/team/team.data";

const TABS = [
  "faculty sponsors",
  "acm",
  "acm-w",
  "rowdy creators",
  "coding in color",
  "rowdyhacks",
  "code quantum",
  "rowdy cybercon",
] as const;

type Tab = (typeof TABS)[number];

export default function MeetTheTeamClient() {
  const [activeTab, setActiveTab] = useState<Tab>("acm");

  const people: OrbitPerson[] = useMemo(() => {
    const group = TEAM_GROUPS.find((g) => g.label === activeTab);
    if (!group) return [];

    return group.members.map((member) => ({
      id: member.id,
      name: member.name,
      role: member.role,
      org: group.label,
      imageUrl: member.imageUrl,
      socials: member.socials,
    }));
  }, [activeTab]);

  return (
    <div className="mx-auto w-full max-w-screen-xl pb-12 pt-6 sm:pb-16 sm:pt-10 md:pb-24 md:pt-16">
      <div
        className="-mx-1 flex w-[calc(100%+0.5rem)] items-center gap-3 overflow-x-auto px-1 pb-3 font-calsans text-xl font-bold [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:w-full md:flex-wrap md:gap-x-3 md:gap-y-2 md:overflow-visible md:px-0 md:pb-0 md:text-2xl"
        aria-label="Team groups"
      >
        {TABS.map((tab, idx) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 whitespace-nowrap transition ${
              activeTab === tab
                ? "text-acm-blue"
                : "text-acm-darker-blue/35 hover:text-acm-darker-blue/60"
            }`}
          >
            {tab}
            {idx < TABS.length - 1 ? (
              <span className="ml-3 text-acm-darker-blue/25">|</span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-2 h-px w-full bg-acm-darker-blue/15 md:mt-8" />

      <div className="mt-6 md:mt-10">
        {people.length ? (
          <OrbitCarousel people={people} initialIndex={0} />
        ) : (
          <div className="rounded-3xl border border-acm-darker-blue/10 bg-white p-6 sm:p-10">
            <div className="font-calsans text-2xl font-black text-acm-darker-blue">
              No members yet
            </div>
            <div className="mt-2 font-mono text-sm font-semibold text-acm-darker-blue/60">
              Add people to the{" "}
              <span className="text-acm-darker-blue/80">{activeTab}</span> group in{" "}
              <span className="text-acm-darker-blue/80">team.data.ts</span>.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}