import Image from "next/image";
import { auth } from "./(auth)/auth";
import { UserButton } from "@/components/user/user-button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  let user = null;
  if (session) {
    user = session.user;
  }
  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <h1 className="text-4xl font-bold text-center">
            Ambassade de Indonesie
          </h1>
          <p className="text-center">Event</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-2">
      <div className="flex flex-row w-full justify-end p-2">
        <UserButton />
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center">
          Ambassade de Indonesie
        </h1>
        <p className="text-center">Event</p>
        
      </div>
      <div className="flex flex-col items-start justify-start w-full max-w-5xl p-4 pt-10 gap-4">
      <Link href="/ci/resdip79">Checkin</Link>
      <Link href="/cim/resdip79">Summary Checkin</Link>
      </div>
    </main>
  );
}
