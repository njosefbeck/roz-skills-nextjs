import { Suspense } from "react";
import Job from "../job";
import { addPrereqsToSkills, getJob } from "../jobs";
import SelectionProvider from "../selections/provider";
import TotalSelected from "../selections/total";
import TreeOptions from "../selections/options";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Lord Knight Skills',
  description: 'An English-language skill simulator for the Korean Ragnarok Online Zero MMORPG.'
}

export default function LordKnight() {
  const swordsman = getJob("1");
  const knight = getJob("7");
  const lordKnight = getJob("4008");
  addPrereqsToSkills(
    swordsman.tree,
    knight.tree,
    lordKnight.tree
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
              label="Swordsman"
              pointsPossible={49}
              skillsPossible={swordsman.tree}
            />
            <TotalSelected
              label="Lord Knight"
              pointsPossible={69}
              skillsPossible={{
                ...knight.tree,
                ...lordKnight.tree
              }}
            />
            <TreeOptions />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Job name="Swordsman" data={swordsman} />
            <Job name="Knight" data={knight} />
            <Job name="Lord Knight" data={lordKnight} />
          </div>
        </main>
      </SelectionProvider>
    </Suspense>
  )
}