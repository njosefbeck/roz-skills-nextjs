import { Suspense } from "react";
import Job from "../job";
import { addPrereqsToSkills, getJob } from "../jobs";
import SelectionProvider from "../selections/provider";
import TotalSelected from "../selections/total";
import TreeOptions from "../selections/options";

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
          <div className="flex border p-2 border-white rounded-sm bg-white">
            <TotalSelected
              label="Archer"
              pointsPossible={50}
              skillsPossible={archer.tree}
            />
            <TotalSelected
              label="Gypsy"
              pointsPossible={70}
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