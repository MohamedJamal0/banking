'use server';

import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from 'plaid';

import { plaidClient } from '../plaid';
import { parseStringify } from '../utils';

// import { getTransactionsByBankId } from './transaction.actions';
import { getBanks, getBank } from './user.actions';

// Get multiple bank accounts

export const getAccounts = async ({ userId }: getAccountsProps) => {
  try {
    // get banks from db
    const banks = await getBanks({ userId });

    const getAccount = async (bank: Bank) => {
      const accountsResponse = await plaidClient.accountsGet({
        access_token: bank.accessToken,
      });

      const accountData = accountsResponse.data.accounts[0];

      const institution = await getInstitution({
        institutionId: accountsResponse.data.item.institution_id!,
      });

      const account = {
        id: accountData.account_id,
        availableBalance: accountData.balances.available!,
        currentBalance: accountData.balances.current!,
        institutionId: institution.institution_id,
        name: accountData.name,
        officialName: accountData.official_name,
        mask: accountData.mask!,
        type: accountData.type as string,
        subtype: accountData.subtype! as string,
        bankId: bank.bankId,
        sharaebleId: bank.shareableId,
      };

      return account;
    };

    const accounts = await Promise.all(banks.map(getAccount));

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);

    return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
  } catch (error) {
    console.error('An error occurred while getting the accounts:', error);
  }
};

// Get one bank account
export const getAccount = async ({ bankId }: getAccountProps) => {
  try {
    const bank = await getBank({ bankId });

    const accountsResponse = await plaidClient.accountsGet({
      access_token: bank.accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];

    const institution = await getInstitution({
      institutionId: accountsResponse.data.item.institution_id!,
    });

    const account = {
      id: accountData.account_id,
      availableBalance: accountData.balances.available!,
      currentBalance: accountData.balances.current!,
      institutionId: institution.institution_id,
      name: accountData.name,
      officialName: accountData.official_name,
      mask: accountData.mask!,
      type: accountData.type as string,
      subtype: accountData.subtype! as string,
      bankId: bank.bankId,
    };

    return parseStringify({
      data: account,
    });
  } catch (error) {
    console.error('An error occurred while getting the account:', error);
  }
};

// Get bank info
export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ['US'] as CountryCode[],
    });

    const intitution = institutionResponse.data.institution;

    return parseStringify(intitution);
  } catch (error) {
    console.error('An error occurred while getting the accounts:', error);
  }
};

// Get transactions
export const getTransactions = async ({ bankId }: getTransactionsProps) => {
  let hasMore = true;
  let transactions: any = [];

  const bank = await getBank({ bankId });

  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: bank.accessToken,
      });

      const data = response.data;

      transactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : '',
        date: transaction.date,
        image: transaction.logo_url,
      }));

      hasMore = data.has_more;
    }

    return parseStringify(transactions);
  } catch (error) {
    console.error('An error occurred while getting the accounts:', error);
  }
};
