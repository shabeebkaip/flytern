import Image from "next/image";
import dynamic from "next/dynamic";
const MainHome = dynamic(() => import("@/app/home/page"));

export default function Home() {
  return (
    <main className="">
      <MainHome />
    </main>
  );
}
