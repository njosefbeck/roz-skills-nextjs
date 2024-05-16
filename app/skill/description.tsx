
interface SkillDescriptionProps {
  description: string[];
}

function replaceHexCodes(content: string) {
  const regex = /\^000000|\^777777|\^993300|\^000099|\^ffffff|\^CC3399|^FF0000/g;
  return content.replace(regex, '');
}

function filterOutPrereqs(content: string) {
  if (content.includes('습득조건')) {
    return false
  }
  return true;
}

function filterOutMaxLevel(content: string) {
  if (content.includes('MAX Lv')) {
    return false;
  }
  return true;
}

function formatDescription(description: string[]) {
  return description
    .slice(1)
    .filter(filterOutPrereqs)
    .filter(filterOutMaxLevel)
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
