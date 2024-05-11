import skills from './skills.json';

export interface Skill {
  id: number;
  key: string;
  maxLevel: number;
  name: string;
  spAmount: number[];
  attackRange: number[];
  bSeperateLv: boolean;
  description: string[];
}

type Skills = Record<string, Skill>;

const allSkills: Skills = skills;

export function getSkillById(id: string) {
  return allSkills[id];
}
