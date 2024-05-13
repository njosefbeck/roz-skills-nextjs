import { JobSkill } from "../jobs";
import Level from "../level";
import { getSkillById } from "../skills";
import Image from 'next/image';

interface SkillProps {
  id: string;
  prereqs: JobSkill["processedPrereqs"];
  parents: JobSkill["parents"];
}

export default function Skill({ id, prereqs, parents }: SkillProps) {
  const skill = getSkillById(id);
  const isQuestSkill = skill?.type === 'Quest';
  const icon = (
    <Image
      src={`https://static.divine-pride.net/images/skill/${id}.png`}
      width="24"
      height="24"
      alt={`${skill.nameKO} Icon`}
    />
  );
  return (
    <li
      key={id}
      className="flex mt-2 border p-2 border-white rounded-sm text-md bg-white"
    >
      {
        isQuestSkill ? (
          <span style={{ width: '74px' }}>Quest</span>
        ) : (
          <Level
            skillId={id}
            maxLevel={skill.maxLevel}
            prereqs={prereqs}
            parents={parents}
          />
        )
      }
      <span className="pl-3">{icon}</span>
      <span className="pl-2">{skill.nameKO}</span>
    </li>
  )
}
