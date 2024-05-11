import jobs from './jobs.json';

interface ProcessedPrereqs {
  [skillId: string]: number;
}

export interface JobSkill {
  id: number;
  treeIndex: number;
  prereqs?: number[][];
  processedPrereqs?: ProcessedPrereqs;
  parents?: Record<string, number>;
}

export interface Job {
  id: number;
  tree: Record<string, JobSkill>;
}

type Jobs = Record<string, Job>;

const allJobs: Jobs = jobs;

function extractPrereqs(
  allSkills: Record<string, JobSkill>,
  allPrereqs: Record<string, number>,
  skill: JobSkill
) {
  if (!skill.prereqs) {
    return;
  }
  for (const prereq of skill.prereqs) {
    const [skillId, levelNeeded] = prereq;
    allPrereqs[skillId.toString()] = levelNeeded;
    const prereqSkill = allSkills[skillId.toString()];
    if (!prereqSkill.parents) {
      prereqSkill.parents = {};
    }
    if (!prereqSkill.parents[skill.id.toString()]) {
      prereqSkill.parents[skill.id.toString()] = levelNeeded;
    }
    if (!prereqSkill.prereqs) {
      continue;
    }
    extractPrereqs(allSkills, allPrereqs, prereqSkill);
  }
}

export function getPrereqs(skill: JobSkill, skills: Record<string, JobSkill>) {
  if (!skill) {
    return;
  }
  if (!skill.prereqs) {
    return;
  }
  const allPrereqs: Record<string, number> = {};
  extractPrereqs(skills, allPrereqs, skill);
  return allPrereqs;
}

function getAllSkills(...trees: Job["tree"][]) {
  const allSkills: Record<string, JobSkill> = {};
  for (const tree of trees) {
    for (const id in tree) {
      if (!allSkills[id]) {
        allSkills[id] = tree[id];
      }
    }
  }
  return allSkills;
}

export function addPrereqsToSkills(...trees: Job["tree"][]) {
  const skills = getAllSkills(...trees);
  for (const skillId in skills) {
    const skill = skills[skillId];
    skill.processedPrereqs = getPrereqs(skill, skills);
    skills[skillId] = skill;
  }
}

export function getJob(id: string) {
  return allJobs[id];
}