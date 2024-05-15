import MobileNav from '@/components/MobileNav';
import RightSidebar from '@/components/RightSidebar';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { getSession } from '../../lib/actions/user.actions';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect('/sign-in');
  }
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <div className="flex items-center justify-between h-16 p-5 shadow-creditCard sm:p-8 md:hidden">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <MobileNav />
        </div>
        {children}
      </div>
    </main>
  );
}
