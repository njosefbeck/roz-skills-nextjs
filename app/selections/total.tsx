'use client';

import { Job } from "../jobs";
import { useSelection } from "./provider";

interface TotalSelectedProps {
  label: string;
  pointsPossible: number;
  skillsPossible: Job["tree"];
}

export default function TotalSelected({
  label,
  pointsPossible,
  skillsPossible
}: TotalSelectedProps) {
  const { calcSelectedSkillPoints } = useSelection();
  const pointsUsed = calcSelectedSkillPoints(skillsPossible);
  return (
    <span className="text-sm uppercase pr-4">{label}: {pointsUsed} / {pointsPossible} Points</span>
  );
}