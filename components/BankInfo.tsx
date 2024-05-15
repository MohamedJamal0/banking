import React from 'react';
import Image from 'next/image';

import { getAccountTypeColors } from '@/lib/utils';
import { formatAmount } from '@/lib/utils';

const BankInfo = ({ account }: BankInfoProps) => {
  const colors = getAccountTypeColors(account?.type as AccountTypes);

  return (
    <div className={`flex gap-3 p-3 shadow-sm border-blue-700  rounded-xl hover:shadow-sm cursor-pointer ${colors.bg}`}>
      <figure
        className={`flex-center h-fit rounded-full bg-blue-100 ${colors.lightBg}`}
      >
        <Image
          src="/icons/connect-bank.svg"
          width={20}
          height={20}
          alt={account.subtype}
          className="m-2 min-w-5"
        />
      </figure>
      <div className="flex w-full flex-1 flex-col justify-center gap-1">
        <div className="bank-info_content">
          <h2
            className={`text-16 line-clamp-1 flex-1 font-bold text-blue-900 ${colors.title}`}
          >
            {account.name}
          </h2>

          <p
            className={`text-12 rounded-full px-3 py-1 font-medium text-blue-700 ${colors.subText} ${colors.lightBg}`}
          >
            {account.subtype}
          </p>
        </div>

        <p className={`text-16 font-medium text-blue-700 ${colors.subText}`}>
          {formatAmount(account.currentBalance)}
        </p>
      </div>
    </div>
  );
};

export default BankInfo;
