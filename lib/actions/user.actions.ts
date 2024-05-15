'use server';

import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import User from '@/models/User';
import connect from '@/db';
import { plaidClient } from '../plaid';
import {
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
  CountryCode,
} from 'plaid';
import { createDwollaCustomer, addFundingSource } from './dwolla.actions';
import { extractCustomerIdFromUrl, parseStringify, encryptId } from '../utils';
import { revalidatePath } from 'next/cache';

import Bank from '@/models/Bank';

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), {
    password: process.env.SECRET_KEY!,
    cookieName: 'banking-session',
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },
  });

  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
  }

  // CHECK THE USER IN THE DB

  return session;
};

export const login = async ({ email, password }: signInProps) => {
  await connect();
  const session = await getSession();

  // CHECK USER IN THE DB
  const user = await User.findOne({ email });

  if (!user) {
    return { error: 'Email or Password is incorrect' };
  }

  const isMatch = await user?.comparePassword(password);

  if (!isMatch) {
    return { error: 'Email or Password is incorrect' };
  }

  session.user = {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  session.isLoggedIn = true;

  await session.save();
  redirect('/');
};

export const register = async (userData: SignUpParams) => {
  await connect();
  const session = await getSession();

  const dwollaCustomerUrl = await createDwollaCustomer({
    ...userData,
    type: 'personal',
  });

  if (!dwollaCustomerUrl) throw new Error('Failed to create dwolla customer');

  const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

  const user = await User.create({
    ...userData,
    dwollaCustomerUrl,
    dwollaCustomerId,
  });

  session.user = {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  session.isLoggedIn = true;

  await session.save();

  redirect('/');
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect('/');
};

export const createLinkToken = async () => {
  await connect();
  const session = await getSession();

  try {
    const user = await User.findById(session.user.id);

    console.log(user._id.toString());
    const tokenParams = {
      user: {
        client_user_id: user._id.toString(),
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.log(error);
  }
};

export const createBank = async (bankData: createBankAccountProps) => {
  await connect();

  try {
    const bank = await Bank.create(bankData);
    return parseStringify(bank);
  } catch (err: any) {
    console.log(err);
  }
};

export const exchangePublicToken = async (publicToken: string) => {
  await connect();
  const session = await getSession();

  try {
    const user = await User.findById(session.user.id);

    // get access token from Plaid
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    console.log(accountsResponse);

    // Create a processor token for Dwolla using the access token and account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: 'dwolla' as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(
      request
    );
    const processorToken = processorTokenResponse.data.processor_token;

    // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    // If the funding source URL is not created, throw an error
    if (!fundingSourceUrl) throw Error;

    // Create a bank account using the user ID, item ID,  access token, funding source URL, and shareableId ID
    await createBank({
      user: user._id,
      bankId: itemId,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });

    // Revalidate the path to reflect the changes
    revalidatePath('/');
    redirect('/');

    // Return a success message
    return parseStringify({
      publicTokenExchange: 'complete',
    });
  } catch (err) {
    console.error(err);
  }
};

export const getBanks = async ({ userId }: getBanksProps) => {
  await connect();

  const bankAccount = await Bank.find({ user: userId });

  return parseStringify(bankAccount);
};

export const getBank = async ({ bankId }: getBankProps) => {
  await connect();

  const bankAccount = await Bank.findOne({ bankId });

  return parseStringify(bankAccount);
};
