import { logout } from '@/lib/actions/user.actions';
import React from 'react';

const Logout = () => {
  const handleLogout = async () => {
    console.log(1);
    await logout();
  };
  return (
    <div className={'cursor-pointer'} onClick={handleLogout}>
      Logout
    </div>
  );
};

export default Logout;
