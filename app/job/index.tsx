import { Job, getJob } from "../jobs";
import Skill from "../skill";

interface JobProps {
  data: Job;
  name: string;
}

export default function Job({ data, name }: JobProps) {
  const skills = Object.values(data.tree);
  return (
    <>
     <h1 className="mt-3">{name}</h1>
     <ul>
      {
        skills.map(skill => (
          <Skill
            key={skill.id}
            id={skill.id.toString()}
            jobId={data.id}
            prereqs={skill.processedPrereqs}
            parents={skill.parents}
          />
        ))
      }
     </ul>
    </>
  )
}
