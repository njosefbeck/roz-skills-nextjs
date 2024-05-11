'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { Job, JobSkill } from '../jobs';
import { useStateInUrl } from '../url';

interface SelectedSkill {
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
  processSkillLevelChange: (skillId: string, newLevel: number, prereqs: JobSkill["processedPrereqs"], parents: JobSkill["parents"]) => void;
  calcSelectedSkillPoints: (tree: Job["tree"]) => number;
}

export const SelectionContext = createContext<SelectionProviderValue | undefined>(undefined);

function createNewSelectedSkills(
  currentlySelected: SelectedSkills = {},
  skillId: string,
  newLevel: number,
  prereqs: JobSkill["processedPrereqs"],
  parents: JobSkill["parents"]
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
    if (parents) {
      for (const skillId in parents) {
        if (selected[skillId]) {
          delete selected[skillId];
        }
      }
    }
    return selected;
  }
  selected[skillId] = { level: newLevel };
  if (parents) {
    /**
     * If newLevel is below what's required
     * then we need to delete the parent
     */
    for (const skillId in parents) {
      const requiredLevelForParent = parents[skillId];
      if (selected[skillId]) {
        if (newLevel < requiredLevelForParent) {
          delete selected[skillId];
        }
      }
    }
  }
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
            level: requiredPrereqLevel
          }
        }
      } else {
        selected[skillId] = { level: requiredPrereqLevel };
      }
    }
  }
  return selected;
}

export default function SelectionProvider({
  children
}: SelectionProviderProps) {
  const { getStateFromUrlParam, syncStateToUrl } = useStateInUrl();
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkills | undefined>(() => {
    return getStateFromUrlParam('t');
  });

  function getSelectedSkill(skillId: string): SelectedSkill | undefined {
    if (!selectedSkills) {
      return;
    }
    return selectedSkills[skillId];
  }

  function processSkillLevelChange(
    skillId: string,
    newLevel: number,
    prereqs: JobSkill["processedPrereqs"],
    parents: JobSkill["parents"]
  ) {
    const updatedSelectedSkills = createNewSelectedSkills(
      selectedSkills,
      skillId,
      newLevel,
      prereqs,
      parents
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

  useEffect(() => {
    syncStateToUrl(selectedSkills);
  });

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
