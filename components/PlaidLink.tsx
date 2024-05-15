'use client';

import {
  createLinkToken,
  exchangePublicToken,
} from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const PlaidLink = ({ children } : { children: React.ReactNode }) => {
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken();
      setToken(data.linkToken);
    };

    getLinkToken();
  }, []);

  const config = {
    token,
    onSuccess: exchangePublicToken,
  };
  const { open, ready } = usePlaidLink(config);
  return (
    <button onClick={() => open()} disabled={!ready}>
      {children}
    </button>
  );
};

export default PlaidLink;
