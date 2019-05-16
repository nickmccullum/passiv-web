import React from 'react';

const AccountPicker = ({ accounts, account, onChange }) => (
  <select value={account} onChange={onChange}>
    {accounts.map(account => (
      <option value={account.id} key={account.id}>
        {account.name}
      </option>
    ))}
  </select>
);

export default AccountPicker;
