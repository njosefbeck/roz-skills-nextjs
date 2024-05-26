import Image from "next/image";
import gypsyImg from './jobs/sprites/gypsy.png';
import clownImg from './jobs/sprites/clown.png';
import lordKnightImg from './jobs/sprites/lord-knight.png';
import paladinImg from './jobs/sprites/paladin.png';
import highPriestImg from './jobs/sprites/high-priest.png';
import assassinCrossImg from './jobs/sprites/assassin-cross.png';
import sniperImg from './jobs/sprites/sniper.png';
import highWizardImg from './jobs/sprites/high-wizard.png';
import stalkerImg from './jobs/sprites/stalker.png';
import creatorImg from './jobs/sprites/creator.png';
import whitesmithImg from './jobs/sprites/whitesmith.png';
import championImg from './jobs/sprites/champion.png';
import professorImg from './jobs/sprites/professor.png';
import rebellionImg from './jobs/sprites/rebellion.png';
import superNoviceImg from './jobs/sprites/super-novice.png';
import oboroImg from './jobs/sprites/oboro.png';
import kagerouImg from './jobs/sprites/kagerou.png';
import Link from "next/link";

const CLASSES = [
  { href: '/lord-knight', image: lordKnightImg, imageHeight: 115, imageWidth: 68, name: 'Lord Knight' },
  { href: '/paladin', image: paladinImg, imageHeight: 115, imageWidth: 68, name: 'Paladin' },
  { href: '/high-priest', image: highPriestImg, imageHeight: 115, imageWidth: 68, name: 'High Priest' },
  { href: '/assassin-cross', image: assassinCrossImg, imageHeight: 115, imageWidth: 68, name: 'Assassin Cross' },
  { href: '/sniper', image: sniperImg, imageHeight: 115, imageWidth: 68, name: 'Sniper' },
  { href: '/gypsy', image: gypsyImg, imageHeight: 115, imageWidth: 68, name: 'Gypsy' },
  { href: '/clown', image: clownImg, imageHeight: 115, imageWidth: 68, name: 'Clown' },
  { href: '/high-wizard', image: highWizardImg, imageHeight: 115, imageWidth: 68, name: 'High Wizard' },
  { href: '/stalker', image: stalkerImg, imageHeight: 115, imageWidth: 68, name: 'Stalker' },
  { href: '/creator', image: creatorImg, imageHeight: 115, imageWidth: 68, name: 'Creator' },
  { href: '/whitesmith', image: whitesmithImg, imageHeight: 115, imageWidth: 68, name: 'Whitesmith' },
  { href: '/professor', image: professorImg, imageHeight: 115, imageWidth: 68, name: 'Professor' },
  { href: '/champion', image: championImg, imageHeight: 115, imageWidth: 68, name: 'Champion' },
  { href: '/rebellion', image: rebellionImg, imageHeight: 108, imageWidth: 68, name: 'Rebellion' },
  { href: '/super-novice', image: superNoviceImg, imageHeight: 115, imageWidth: 68, name: 'Super Novice' },
  { href: '/kagerou', image: kagerouImg, imageHeight: 108, imageWidth: 68, name: 'Kagerou' },
  { href: '/oboro', image: oboroImg, imageHeight: 108, imageWidth: 68, name: 'Oboro' }
];

export default function Home() {
  return (
    <main className="p-6 container max-w-lg mx-auto">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        {
          CLASSES.map(job => (
            <li key={job.name} className="bg-white/50 hover:bg-white rounded-sm text-center">
              <Link href={job.href}>
                <Image
                  src={job.image}
                  className="inline-block"
                  width={job.imageWidth}
                  height={job.imageHeight}
                  alt={`${job.name} class sprite`}
                />
              </Link>
            </li>
          ))
        }
      </ul>
    </main>
  );
}
