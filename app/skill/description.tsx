
interface SkillDescriptionProps {
  description: string[];
}

function replaceHexCodes(content: string) {
  const regex = /\^000000|\^777777|\^993300|\^000099|\^ffffff|\^CC3399|\^FF0000|\^339900|\^6666cc|\^00BB00/g;
  return content.replace(regex, '');
}

function filterOutMaxLevel(content: string) {
  if (content.includes('MAX Lv') || content.includes('Max Level')) {
    return false;
  }
  return true;
}

function formatDescription(description: string[]) {
  return description
    .slice(1)
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
