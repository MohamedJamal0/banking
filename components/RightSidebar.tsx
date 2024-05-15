import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BankCard from './BankCard';
import PlaidLink from './PlaidLink';

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
  return (
    <aside className="hidden flex-col  h-screen w-[355px] border-l no-scrollbar overflow-y-scroll border-gray-200 xl:flex">
      <section className="w-full mb-16">
        <div className="h-[120px] w-full bg-gradient-mesh bg-cover bg-no-repeat"></div>
        <div className="px-6">
          <div className="flex-center -mt-8 mb-8 size-24 border-8 rounded-full bg-gray-100  border-white p-2 shadow-profile">
            <span className="text-5xl font-bold text-blue-500">
              {user.firstName[0]}
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-24 font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-16 font-normal text-gray-600">{user.email}</p>
          </div>
        </div>
      </section>

      <section className="w-full px-6 space-y-6">
        <div className="flex justify-between">
          <h2 className="header-2">My Banks</h2>
          <Link href="/" className="flex gap-2">
            <Image src="/icons/plus.svg" width={20} height={20} alt="plus" />
            <PlaidLink>
              <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
            </PlaidLink>
          </Link>
        </div>

        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10">
              <BankCard
                key={banks[0].id}
                account={banks[0]}
                userName={`${user.firstName} ${user.lastName}`}
                showBalance={false}
              />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%]">
                <BankCard
                  key={banks[1].id}
                  account={banks[1]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </aside>
  );
};

export default RightSidebar;
