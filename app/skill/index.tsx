import { Job, JobSkill } from "../jobs";
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
  const icon = (
    <Image
      src={`https://static.divine-pride.net/images/skill/${id}.png`}
      width="24"
      height="24"
      alt={`${skill.name} Icon`}
    />
  );
  return (
    <li key={id} className="flex">
      <Level
        skillId={id}
        maxLevel={skill.maxLevel}
        prereqs={prereqs}
        parents={parents}
      />&nbsp;&nbsp;
      <span>{icon}</span>&nbsp;<span>{skill.id}</span>&nbsp;-&nbsp;<span>{skill.name}</span>
    </li>
  )
}
