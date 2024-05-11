'use client';

import { Job, JobSkill } from "../jobs";
import { useSelection } from "../selections/provider";
import { Skill } from "../skills";

interface LevelProps {
  skillId: string;
  jobId: Job["id"];
  maxLevel: Skill["maxLevel"];
  prereqs: JobSkill["processedPrereqs"];
}

export default function Level({ skillId, jobId, maxLevel, prereqs }: LevelProps) {
  const { getSelectedSkill, processSkillLevelChange } = useSelection();
  const selected = getSelectedSkill(skillId);
  const currentLevel = selected ? selected.level : 0;

  function increase() {
    const newLevel = currentLevel + 1;
    processSkillLevelChange(
      skillId,
      jobId,
      newLevel,
      prereqs
    );
  }

  function decrease() {
    const newLevel = currentLevel - 1;
    processSkillLevelChange(
      skillId,
      jobId,
      newLevel,
      prereqs
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