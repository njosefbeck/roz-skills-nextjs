import Image from "next/image";
import gypsyImg from './jobs/sprites/gypsy.png';
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6 container max-w-lg mx-auto">
      <ul className="flex gap-4">
        <li className="bg-white/50 hover:bg-white rounded-sm text-center">
          <Link href="/gypsy">
            <Image
              src={gypsyImg}
              width={68}
              height={115}
              alt="Gypsy class sprite"
            />
          </Link>
        </li>
      </ul>
    </main>
  );
}
