"use client";

import { useMemo, useState } from "react";

import OrbitCarousel, {
  type OrbitPerson,
} from "@/components/team/orbit-carousel";
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

  const people = useMemo<OrbitPerson[]>(() => {
    const group = TEAM_GROUPS.find(
      (teamGroup) => teamGroup.label === activeTab
    );

    if (!group) {
      return [];
    }

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
    <div className="mx-auto w-full max-w-screen-xl px-4 pb-24 pt-10 sm:px-6 sm:pt-16">
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-calsans text-lg font-bold sm:mt-8 sm:text-2xl">
        {TABS.map((tab, index) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`transition-colors ${activeTab === tab
                ? "text-acm-darker-blue"
                : "text-acm-darker-blue/35 hover:text-acm-darker-blue/60"
              }`}
          >
            {tab}

            {index < TABS.length - 1 ? (
              <span
                aria-hidden="true"
                className="ml-3 text-acm-darker-blue/25"
              >
                |
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-2 h-px w-full bg-acm-darker-blue/15 md:mt-8" />

      <div className="mt-8 sm:mt-10">
        {people.length > 0 ? (
          <OrbitCarousel
            key={activeTab}
            people={people}
            initialIndex={0}
          />
        ) : (
          <div className="rounded-3xl border border-acm-darker-blue/10 bg-white p-8 sm:p-10">
            <div className="font-calsans text-2xl font-black text-acm-darker-blue">
              No members yet
            </div>

            <div className="mt-2 font-mono text-sm font-semibold text-acm-darker-blue/60">
              Add people to the{" "}
              <span className="text-acm-darker-blue/80">
                {activeTab}
              </span>{" "}
              group
            </div>
          </div>
        )}
      </div>
    </div>
  );
}