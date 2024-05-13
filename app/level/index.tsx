'use client';

import { JobSkill } from "../jobs";
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
  const currentLevel = selected ? selected.level.toString() : '0';
  const possibleLevels = Array.from(Array(maxLevel + 1).keys());

  function changeLevel(event: React.ChangeEvent<HTMLSelectElement>) {
    const newLevel = parseInt(event.target.value);
    processSkillLevelChange(
      skillId,
      newLevel,
      prereqs,
      parents
    );
  }

  return (
    <>
      <span className="pr-1">
        <select
          onChange={changeLevel}
          value={currentLevel}
          style={{
            width: '40px'
          }}
        >
          {
            possibleLevels.map(level => (
              <option key={level} value={level.toString()}>{level.toString()}</option>
            ))
          }
        </select>
      </span>
      /
      <span style={{ width: '25px' }} className="pl-1">{maxLevel}</span>
    </>
  );
}