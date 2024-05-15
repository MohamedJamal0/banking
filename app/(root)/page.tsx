import HeaderBox from '@/components/HeaderBox';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getSession } from '@/lib/actions/user.actions';

import React from 'react';

const Home = async ({ searchParams: { id, page } }) => {
  const session = await getSession();

  const { user } = session;

  const accounts = await getAccounts({ userId: user.id as string });

  if (!accounts) return;

  return (
    <section className="flex h-full">
      <div className="flex-1 space-y-8 h-full px-5 sm:px-8 py-7 lg:py-12 overflow-y-scroll no-scrollbar">
        <header className="space-y-8">
          <HeaderBox
            title="Welcome"
            subtext="Access and manage your account and transactions"
            type="greeting"
            user={user.firstName}
          />
          <TotalBalanceBox
            accounts={accounts.data}
            totalBanks={accounts.totalBanks}
            totalCurrentBalance={accounts.totalCurrentBalance}
          />
        </header>
        <RecentTransactions
          accounts={accounts.data}
          currentBank={id || accounts.data[0].bankId}
        />
      </div>
      <RightSidebar user={user} banks={accounts.data} />
    </section>
  );
};

export default Home;
