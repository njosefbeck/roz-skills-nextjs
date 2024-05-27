import { Suspense } from "react";
import Job from "../job";
import { addPrereqsToSkills, getJob } from "../jobs";
import SelectionProvider from "../selections/provider";
import TotalSelected from "../selections/total";
import TreeOptions from "../selections/options";
import { Metadata } from "next";
import Link from "next/link";

const TITLES = {
  firstJob: 'Merchant',
  secondJob: 'Alchemist',
  transcendentJob: 'Creator'
}

const IDS = {
  firstJob: '5',
  secondJob: '18',
  transcendentJob: '4019'
}

export const metadata: Metadata = {
  title: `${TITLES.transcendentJob} Skills`,
  description: 'An English-language skill simulator for the Korean Ragnarok Online Zero MMORPG.'
}

export default function SkillTree() {
  const firstJob = getJob(IDS.firstJob);
  const secondJob = getJob(IDS.secondJob);
  const transcendentJob = getJob(IDS.transcendentJob);
  addPrereqsToSkills(
    firstJob.tree,
    secondJob.tree,
    transcendentJob.tree
  );
  return (
    <Suspense>
      <SelectionProvider>
        <main className="p-6 container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 border p-2 border-white rounded-sm bg-white">
            <Link
              href="/"
              className="pr-5 uppercase text-sm text-sky-400 hover:text-sky-500 font-bold"
              style={{ paddingTop : 2 }}
            >
              Home
            </Link>
            <TotalSelected
              label={TITLES.firstJob}
              pointsPossible={49}
              skillsPossible={firstJob.tree}
            />
            <TotalSelected
              label={TITLES.transcendentJob}
              pointsPossible={69}
              skillsPossible={{
                ...secondJob.tree,
                ...transcendentJob.tree
              }}
            />
            <TreeOptions />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Job name={TITLES.firstJob} data={firstJob} />
            <Job name={TITLES.secondJob} data={secondJob} />
            <Job name={TITLES.transcendentJob} data={transcendentJob} />
          </div>
        </main>
      </SelectionProvider>
    </Suspense>
  )
}