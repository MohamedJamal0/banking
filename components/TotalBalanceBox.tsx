import React from 'react';
import DoughnutChart from './DoughnutChart';
import AnimatedCounter from './AnimatedCounter';

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) => {
  return (
    <section className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 shadow-chart sm:gap-6 sm:p-6">
      <div className="flex size-full max-h-[96px] sm:max-h-[120px] max-w-[100px] items-center sm:max-w-[120px]">
        <DoughnutChart accounts={accounts} />
      </div>
      <div className="space-y-6">
        <h2 className="header-2">Bank Accounts : {totalBanks}</h2>
        <div>
          <p className="text-14 font-medium text-gray-600">
            Total Current Balance
          </p>
          <div className="h-[20px] text-24 lg:text-30 font-semibold text-gray-900">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
