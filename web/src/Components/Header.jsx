import React from "react";
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { useAuth } from "../Contexts/AuthContext";

export default function Header () {
  const { account, balance, isAdmin } = useAuth()

  return (
    <div style={{ padding: "20px"}}>

      <div className="header">
        <div className="header-text">
          <div className="my-account">
            <p>{account}</p>
          </div>
        </div>
        <div className="button-cards-tickets">
            <Link to="/cards" className="button-switch-cards-tickets" >Cards</Link>
            <Link to="/tickets" className="button-switch-cards-tickets">Tickets</Link>
      </div>

        <div className="profil-card">
        <div className="profil-title">Mon profil</div>
        <div className="profil-status">
          <div className="profil-status-title">Statut</div>              
          <div className="profil-status-data">{isAdmin ? 'Administrateur' : 'Utilisateur'}</div>              
        </div>
        <div className="profil-balance">
          <div className="profil-balance-title">Balance</div>  
          <div className="profil-balance-data">{balance} ETH</div>           
        </div>
        </div>  


      </div>
    </div>
  );
}