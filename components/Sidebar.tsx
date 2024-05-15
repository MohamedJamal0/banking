'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Logout from './Logout';
const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="sticky left-0 top-0  h-screen w-fit max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px] border-r border-gray-200 bg-white pt-8 text-white ">
      <nav className="space-y-4">
        <Link
          href="/"
          className="flex items-center  gap-2 mb-12 cursor-pointer "
        >
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="text-[26px] 2xl:text-26 font-ibm-plex-serif font-bold text-black-1 max-xl:hidden">
            Horizon
          </h1>
        </Link>

        {sidebarLinks.map((link) => {
          const isActive =
            link.route === pathname || pathname.startsWith(`${link.route}/`);

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                'flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start',
                { 'bg-bank-gradient': isActive }
              )}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
                className={cn({
                  'brightness-[3] invert-0': isActive,
                })}
              />
              <p
                className={cn(
                  'text-16 font-semibold text-black-2 max-xl:hidden',
                  { 'text-white': isActive }
                )}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </nav>
      <div className='text-green-700'>
        <Logout />
      </div>
    </div>
  );
};

export default Sidebar;
