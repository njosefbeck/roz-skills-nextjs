import { Suspense } from "react";
import Job from "../job";
import { addPrereqsToSkills, getJob } from "../jobs";
import SelectionProvider from "../selections/provider";
import TotalSelected from "../selections/total";
import TreeOptions from "../selections/options";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Gypsy Skills',
  description: 'An English-language skill simulator for the Korean Ragnarok Online Zero MMORPG.'
}

export default function Gypsy() {
  const archer = getJob("3");
  const dancer = getJob("20");
  const gypsy = getJob("4021");
  addPrereqsToSkills(
    archer.tree,
    dancer.tree,
    gypsy.tree
  );
  return (
    <Suspense>
      <SelectionProvider>
        <main className="p-6 container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 border p-2 border-white rounded-sm bg-white">
            <Link
              href="/"
              className="pr-5 uppercase text-sm text-sky-400 hover:text-sky-500 font-bold"
              style={{ paddingTop : 2 }}
            >
              Home
            </Link>
            <TotalSelected
              label="Archer"
              pointsPossible={49}
              skillsPossible={archer.tree}
            />
            <TotalSelected
              label="Gypsy"
              pointsPossible={69}
              skillsPossible={{
                ...dancer.tree,
                ...gypsy.tree
              }}
            />
            <TreeOptions />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Job name="Archer" data={archer} />
            <Job name="Dancer" data={dancer} />
            <Job name="Gypsy" data={gypsy} />
          </div>
        </main>
      </SelectionProvider>
    </Suspense>
  )
}