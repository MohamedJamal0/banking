import Link from 'next/link';
import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BankInfo from './BankInfo';
import TransactionsTable from './TransactionsTable';

import BankTab from './BankTab';
import { SunSnow } from 'lucide-react';

const RecentTransactions = ({
  accounts,
  currentBank,
}: RecentTransactionsProps) => {
  return (
    <section>
      <header className="flex justify-between items-center">
        <h2 className="text-20 md:text-24 font-semibold text-gray-900">
          Recent transactions
        </h2>
        <Link
          href={`/transaction-history`}
          className="px-4 py-2.5 rounded-lg border border-gray-300 text-14 font-semibold text-gray-700"
        >
          View all
        </Link>
      </header>

      <Tabs defaultValue={currentBank}>
        <TabsList className="custom-scrollbar mb-8 flex gap-5 w-full justify-start flex-nowrap">
          {accounts.map((account) => (
            <TabsTrigger key={account.id} value={account.bankId} asChild>
              <BankTab account={account} currentBank={currentBank} />
            </TabsTrigger>
          ))}
        </TabsList>
        {accounts.map((account) => (
          <TabsContent
            className="space-y-6"
            key={account.id}
            value={account.bankId}
          >
            <BankInfo account={account} />
            <Suspense fallback={<div>loading...</div>}>
              <TransactionsTable currentBank={currentBank} />
            </Suspense>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
