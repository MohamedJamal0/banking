'use client';

import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { sidebarLinks } from '@/constants';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import Image from 'next/image';
import Link from 'next/link';

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side={'left'} className="bg-white border-none">
          <Link
            href="/"
            className="flex items-center gap-2 mb-12 cursor-pointer "
          >
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="Horizon logo"
              className=" size-10"
            />
            <h1 className="text-[26px] font-ibm-plex-serif font-bold text-black-1">
              Horizon
            </h1>
          </Link>

          <nav className="space-y-4">
            {sidebarLinks.map((link) => {
              const isActive =
                link.route === pathname ||
                pathname.startsWith(`${link.route}/`);

              return (
                <Link
                  href={link.route}
                  key={link.label}
                  className={cn('flex gap-3 items-center p-3 rounded-lg', {
                    'bg-bank-gradient': isActive,
                  })}
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
                    className={cn('text-16 font-semibold text-black-2', {
                      'text-white': isActive,
                    })}
                  >
                    {link.label}
                  </p>
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
