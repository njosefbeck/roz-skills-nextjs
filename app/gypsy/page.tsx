import Job from "../job";
import { addPrereqsToSkills, getJob } from "../jobs";
import SelectionProvider from "../selections/provider";
import TotalSelected from "../selections/total";

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
    <SelectionProvider>
      <main className="p-6 container mx-auto max-w-screen-sm">
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
        </div>
        <Job name="Archer" data={archer} />
        <Job name="Dancer" data={dancer} />
        <Job name="Gypsy" data={gypsy} />
      </main>
    </SelectionProvider>
  )
}