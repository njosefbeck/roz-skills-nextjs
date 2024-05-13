import skills from './skills.json';

export interface Skill {
  id: number;
  key: string;
  maxLevel: number;
  nameKO: string;
  nameEN: string;
  spAmount: number[];
  attackRange: number[];
  type?: string;
  descriptionKO: string[];
  descriptionEN: string;
}

type Skills = Record<string, Skill>;

const allSkills: Skills = skills;

export function getSkillById(id: string) {
  return allSkills[id];
}
