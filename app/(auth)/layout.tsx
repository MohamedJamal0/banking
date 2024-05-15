'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    <main className="grid grid-cols-1 min-h-screen lg:grid-cols-2  ">
      <section className="flex items-center justify-center py-10 px-6">
        <section className="max-w-[400px] w-full space-y-5 md:space-y-8">
          <header className="space-y-5 md:space-y-8">
            <Link href="/" className="cursor-pointer flex items-center gap-1">
              <Image
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt="Horizon logo"
              />
              <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                Horizon
              </h1>
            </Link>
            <div className="space-y-1 md:space-y-1">
              <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                {pathName === '/sign-up' ? 'Sign Up' : 'Sign In'}
                <p className="text-16 font-normal text-gray-600">
                  Please enter your details
                </p>
              </h1>
            </div>
          </header>
          {children}
        </section>
      </section>
      <div className="bg-sky-1 max-lg:hidden"></div>
    </main>
  );
}
