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
      <main className="p-3">
        <TotalSelected
          pointsPossible={40}
          skillsPossible={archer.tree}
        />
        <Job name="Archer" data={archer} />
        <TotalSelected
          pointsPossible={70}
          skillsPossible={{
            ...dancer.tree,
            ...gypsy.tree
          }}
        />
        <Job name="Dancer" data={dancer} />
        <Job name="Gypsy" data={gypsy} />
      </main>
    </SelectionProvider>
  )
}