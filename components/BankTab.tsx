'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { cn } from '@/lib/utils';

const BankTab = ({
  account,
  currentBank,
}: {
  account: Account;
  currentBank: string;
}) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/?id=${account.bankId}`, { scroll: false });
  };
  return (
    <div
      className={cn('text-14 text-blue-400 pb-1 cursor-pointer  ', {
        'border-b-4 border-blue-500': account.bankId === currentBank,
      })}
      onClick={onClick}
    >
      {account.name}
    </div>
  );
};

export default BankTab;
