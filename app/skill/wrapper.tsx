'use client';

import { JobSkill } from '../jobs';
import { useSelection } from '../selections/provider';

interface SkillWrapperProps extends React.PropsWithChildren {
  skillId: string;
  prereqs: JobSkill["processedPrereqs"];
}

export default function SkillWrapper({ children, skillId, prereqs }: SkillWrapperProps) {
  const {
    getSelectedSkill,
    isHighlightedPrereq,
    highlightPrereqs,
    clearHighlightPrereqs,
    hideNotSelected
  } = useSelection();
  const skill = getSelectedSkill(skillId);
  const isHighlighted = isHighlightedPrereq(skillId);
  let bgClass = 'bg-white hover:bg-lime-200';
  if (skill) {
    bgClass = 'bg-lime-300 hover:bg-lime-300';
  } else if (isHighlighted) {
    bgClass = 'bg-lime-100 hover:bg-lime-100';
  }

  function highlight() {
    if (prereqs) {
      const skillIds = Object.keys(prereqs);
      highlightPrereqs([...skillIds]);
    }
  }

  function unhighlight() {
    clearHighlightPrereqs();
  }

  if (hideNotSelected && !skill) {
    return null;
  }

  return (
    <li
      className={`mt-2 p-1 rounded-sm text-md ${bgClass}`}
      onMouseEnter={highlight}
      onMouseLeave={unhighlight}
    >
      {children}
    </li>
  );
}
