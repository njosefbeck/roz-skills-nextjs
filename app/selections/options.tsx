'use client';
import { useSelection } from "./provider"

export default function TreeOptions() {
  const {
    hideNotSelected,
    toggleHideSkills,
    showKorean,
    toggleKorean
  } = useSelection();
  return (
    <>
      <div>
      <input
        type="checkbox"
        id="toggleHideSkills"
        checked={hideNotSelected}
        onChange={toggleHideSkills}
      />
      <label htmlFor="toggleHideSkills" className="pl-2">Only Show Selected</label>
      </div>
      <div>
      <input
        type="checkbox"
        id="toggleKorean"
        checked={showKorean}
        onChange={toggleKorean}
      />
      <label htmlFor="toggleKorean" className="pl-2">Show Korean</label>
      </div>
    </>
  )
}
