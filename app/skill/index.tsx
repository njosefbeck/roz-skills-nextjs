'use client';

import { JobSkill } from "../jobs";
import Level from "../level";
import { getSkillById } from "../skills";
import Image from 'next/image';
import SkillWrapper from './wrapper';
import SkillDescription from "./description";
import { useState } from "react";
import info from './info-icon.png';

interface SkillProps {
  id: string;
  prereqs: JobSkill["processedPrereqs"];
  parents: JobSkill["parents"];
}

export default function Skill({ id, prereqs, parents }: SkillProps) {
  const [isDescVisible, setIsDescVisible] = useState(false);
  const skill = getSkillById(id);
  const isQuestSkill = skill?.type === 'Quest';
  const description = skill.descriptionEN ? skill.descriptionEN : skill.descriptionKO;
  const icon = (
    <Image
      src={`https://static.divine-pride.net/images/skill/${id}.png`}
      width="24"
      height="24"
      alt={`${skill.nameKO} Icon`}
    />
  );
  const infoIcon = (
    <Image
      src={info}
      width="19"
      height="19"
      alt="Info Icon"
    />
  );
  return (
    <SkillWrapper
      skillId={id}
      prereqs={prereqs}
    >
      <div className="flex justify-between">
        <div className="flex">
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
          <span className="pl-2 text-sm" style={{ "paddingTop": "2px"}}>{skill.nameEN}</span>
        </div>
        <button
          className="font-mono pr-2 font-bold"
          onClick={() => setIsDescVisible(prev => !prev)}
        >
          {infoIcon}
        </button>
      </div>
      {
        isDescVisible ? (
          <div className="text-sm bg-white p-2 mt-2 rounded-sm">
            <SkillDescription
              description={description}
            />
          </div>
        ) : null
      }
    </SkillWrapper>
  )
}
