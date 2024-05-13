'use client';

import { Job } from "../jobs";
import { useSelection } from "./provider";

interface TotalSelectedProps {
  label: string;
  pointsPossible: number;
  skillsPossible: Job["tree"];
}

function calcPointsUsedClass(usedTooMany: boolean, usedEnough: boolean) {
  if (usedEnough) {
    return 'text-green-500';
  }
  if (usedTooMany) {
    return 'text-red-500';
  }
  return '';
}

export default function TotalSelected({
  label,
  pointsPossible,
  skillsPossible
}: TotalSelectedProps) {
  const { calcSelectedSkillPoints } = useSelection();
  const pointsUsed = calcSelectedSkillPoints(skillsPossible);
  const usedTooMany = pointsUsed > pointsPossible;
  const usedEnough = pointsUsed === pointsPossible;

  return (
    <span className="text-sm uppercase pr-5">
      {label}
      <span className="font-bold pl-3">
        <span className={calcPointsUsedClass(usedTooMany, usedEnough)}>{pointsUsed}</span>
        <span className="px-1">/</span>
        {pointsPossible} Points
      </span>
    </span>
  );
}