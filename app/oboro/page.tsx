import { Suspense } from "react";
import Job from "../job";
import { addPrereqsToSkills, getJob } from "../jobs";
import SelectionProvider from "../selections/provider";
import TotalSelected from "../selections/total";
import TreeOptions from "../selections/options";
import { Metadata } from "next";
import Link from "next/link";

const TITLES = {
  firstJob: 'Ninja',
  secondJob: 'Oboro'
}

const IDS = {
  firstJob: '25',
  secondJob: '4212',
}

export const metadata: Metadata = {
  title: `${TITLES.secondJob} Skills`,
  description: 'An English-language skill simulator for the Korean Ragnarok Online Zero MMORPG.'
}

export default function SkillTree() {
  const firstJob = getJob(IDS.firstJob);
  const secondJob = getJob(IDS.secondJob);
  addPrereqsToSkills(
    firstJob.tree,
    secondJob.tree
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
              pointsPossible={69}
              skillsPossible={firstJob.tree}
            />
            <TotalSelected
              label={TITLES.secondJob}
              pointsPossible={59}
              skillsPossible={secondJob.tree}
            />
            <TreeOptions />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Job name={TITLES.firstJob} data={firstJob} />
            <Job name={TITLES.secondJob} data={secondJob} />
          </div>
        </main>
      </SelectionProvider>
    </Suspense>
  )
}