'use client';

import { Job } from "../jobs";
import { useSelection } from "./provider";

interface TotalSelectedProps {
  pointsPossible: number;
  skillsPossible: Job["tree"];
}

export default function TotalSelected({
  pointsPossible,
  skillsPossible
}: TotalSelectedProps) {
  const { calcSelectedSkillPoints } = useSelection();
  const pointsUsed = calcSelectedSkillPoints(skillsPossible);
  return (
    <div>{pointsUsed} / {pointsPossible}</div>
  );
}