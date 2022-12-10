import React, {useContext, useEffect, useState} from 'react';
import Contract from "../Services/Contract";

const AuthContext = React.createContext();
const accountToUse = 1;

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [account, setAccount] = useState([]);
  const [balance, setBalance] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true)

  const requestAccounts = async() => {
    const _accounts = await Contract.accounts();
    setAccount(_accounts[accountToUse]);

    const _balance = await Contract.balance(_accounts[accountToUse])
    setBalance(_balance);

    const _isAdmin = await Contract.isAdmin(_accounts[accountToUse]);
    setIsAdmin(_isAdmin);
    setLoading(false);
  }

  const getBalance = async () => {
    const _balance = await Contract.balance(account);
    setBalance(_balance);
  }

  useEffect(() => {
    requestAccounts();
  }, [])

  const value = { account, balance, isAdmin, getBalance }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}