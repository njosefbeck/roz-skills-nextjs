'use client';
import { useSelection } from "./provider"

export default function TreeOptions() {
  const { hideNotSelected, toggleHideSkills } = useSelection();
  return (
    <div>
      <input
        type="checkbox"
        id="toggleHideSkills"
        checked={hideNotSelected}
        onChange={toggleHideSkills}
      />
      <label htmlFor="toggleHideSkills" className="pl-2">Hide Not Selected Skills</label>
    </div>
  )
}
