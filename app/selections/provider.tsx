'use client';
import { createContext, useContext, useState } from 'react';
import { Job, JobSkill } from '../jobs';

interface SelectedSkill {
  jobId: string;
  level: number;
}

interface SelectedSkills {
  [skillId: string]: SelectedSkill
}

interface SelectionProviderProps {
  children: React.ReactNode;
}

interface SelectionProviderValue {
  getSelectedSkill: (skillId: string) => SelectedSkill | undefined;
  processSkillLevelChange: (skillId: string, jobId: number, newLevel: number, prereqs: JobSkill["processedPrereqs"]) => void;
  calcSelectedSkillPoints: (tree: Job["tree"]) => number;
}

export const SelectionContext = createContext<SelectionProviderValue | undefined>(undefined);

function createNewSelectedSkills(
  currentlySelected: SelectedSkills = {},
  skillId: string,
  jobId: number,
  newLevel: number,
  prereqs: JobSkill["processedPrereqs"]
): SelectedSkills {
  const selected = {
    ...currentlySelected
  };
  /**
   * If newLevel = 0, then we want
   * to remove it from object if
   * present. We also don't need
   * to process prereqs.
   */
  if (newLevel === 0 && selected[skillId]) {
    delete selected[skillId];
    return selected;
  }
  // TO DO: FIX JOB ID!!!
  selected[skillId] = { jobId: jobId.toString(), level: newLevel };
  /**
   * Process prereqs
   * If prereq is already selected,
   * and if prereq is less than what is
   * required by this skill, then update
   * it. Otherwise do nothing.
   * 
   * If prereq is not selected, then add it.
   */
  if (prereqs) {
    for (const skillId in prereqs) {
      const requiredPrereqLevel = prereqs[skillId];
      if (selected[skillId]) {
        if (selected[skillId].level < requiredPrereqLevel) {
          selected[skillId] = {
            jobId: selected[skillId].jobId,
            level: requiredPrereqLevel
          }
        }
      } else {
        // TO DO: FIX JOB ID!!!
        selected[skillId] = { jobId: '0', level: requiredPrereqLevel };
      }
    }
  }
  return selected;
}

export default function SelectionProvider({
  children
}: SelectionProviderProps) {
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkills>();

  function getSelectedSkill(skillId: string): SelectedSkill | undefined {
    if (!selectedSkills) {
      return;
    }
    return selectedSkills[skillId];
  }

  function processSkillLevelChange(
    skillId: string,
    jobId: number,
    newLevel: number,
    prereqs: JobSkill["processedPrereqs"]
  ) {
    const updatedSelectedSkills = createNewSelectedSkills(
      selectedSkills,
      skillId,
      jobId,
      newLevel,
      prereqs
    );
    setSelectedSkills(updatedSelectedSkills);
  }

  function calcSelectedSkillPoints(tree: Job["tree"]) {
    let skillPointsSelected = 0;
    if (!selectedSkills) {
      return skillPointsSelected;
    }
    for (const skillId in selectedSkills) {
      /**
       * This selected skill is relevant
       * to this job and so should be
       * included in the calculation
       */
      if (tree[skillId]) {
        const selectedLevels = selectedSkills[skillId].level;
        skillPointsSelected += selectedLevels;
      }
    }
    return skillPointsSelected;
  }

  const value: SelectionProviderValue = {
    getSelectedSkill,
    processSkillLevelChange,
    calcSelectedSkillPoints
  };

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>
}

export function useSelection() {
  const context = useContext(SelectionContext)
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider')
  }
  return context
}
