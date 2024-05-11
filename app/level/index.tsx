'use client';

import { Job, JobSkill } from "../jobs";
import { useSelection } from "../selections/provider";
import { Skill } from "../skills";

interface LevelProps {
  skillId: string;
  maxLevel: Skill["maxLevel"];
  prereqs: JobSkill["processedPrereqs"];
  parents: JobSkill["parents"];
}

export default function Level({ skillId, maxLevel, prereqs, parents }: LevelProps) {
  const { getSelectedSkill, processSkillLevelChange } = useSelection();
  const selected = getSelectedSkill(skillId);
  const currentLevel = selected ? selected.level : 0;

  function increase() {
    const newLevel = currentLevel + 1;
    processSkillLevelChange(
      skillId,
      newLevel,
      prereqs,
      parents
    );
  }

  function decrease() {
    const newLevel = currentLevel - 1;
    processSkillLevelChange(
      skillId,
      newLevel,
      prereqs,
      parents
    );
  }

  return (
    <>
      <span>{currentLevel}</span> / <span>{maxLevel}</span>&nbsp;
      <button
        disabled={currentLevel === maxLevel}
        onClick={increase}
      >
        Increase
      </button>&nbsp;
      <button
        disabled={currentLevel === 0}
        onClick={decrease}
      >Decrease</button>
    </>
  );
}