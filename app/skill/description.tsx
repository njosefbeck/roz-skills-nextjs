
interface SkillDescriptionProps {
  description: string[];
}

function replaceHexCodes(content: string) {
  return <span>{content}</span>;
}

function filterOutPrereqs(content: string) {
  if (content.includes('습득조건')) {
    return false
  }
  return true;
}

function formatDescription(description: string[]) {
  return description
    .slice(1)
    .filter(filterOutPrereqs)
    .map(replaceHexCodes);
}

export default function SkillDescription({
  description
}: SkillDescriptionProps) {
  console.log(description);
  const formatted = formatDescription(description);
  return (
    <>
      {
        formatted.map(content => (
          <>
            {content}<br/>
          </>
        ))
      }
    </>
  )
}
