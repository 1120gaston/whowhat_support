// src/AccountForm.js
import React, { useState } from 'react';
import { END_POINT } from '../../../config';

const AccountForm = ({ setAccountId }) => {
  const createAccount = async () => {
    const response = await fetch(`${END_POINT}/create-account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const { accountId } = await response.json();
    setAccountId(accountId);
    alert(`Connected account created: ${accountId}`);
  };

  return (
    <div>
      <button onClick={createAccount}>Create Connected Account</button>
    </div>
  );
};

export default AccountForm;
