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
    <div>{label}: {pointsUsed} / {pointsPossible} Points</div>
  );
}