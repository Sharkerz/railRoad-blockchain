import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../Contexts/AuthContext";

export default function Header () {
  const { account, balance, isAdmin } = useAuth()

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p>Mon compte : {account}</p>
          <p>Mon statut : {isAdmin ? 'Administrateur' : 'Utilisateur'}</p>
        </div>
        <p>Ma balance : {balance} ETH</p>
      </div>
      <div>
        <Link to="/cards" >Cards</Link>
        <Link to="/tickets" >Tickets</Link>
      </div>
    </div>
  );
}