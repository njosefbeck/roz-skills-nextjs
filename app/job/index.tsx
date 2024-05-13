import { Job } from "../jobs";
import Skill from "../skill";

interface JobProps {
  data: Job;
  name: string;
}

export default function Job({ data, name }: JobProps) {
  const skills = Object.values(data.tree);
  return (
    <div>
     <h1 className="mt-6 text-sm uppercase font-bold">{name}</h1>
     <ul>
      {
        skills.map(skill => (
          <Skill
            key={skill.id}
            id={skill.id.toString()}
            prereqs={skill.processedPrereqs}
            parents={skill.parents}
          />
        ))
      }
     </ul>
    </div>
  )
}
