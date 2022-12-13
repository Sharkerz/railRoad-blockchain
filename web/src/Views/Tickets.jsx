import React, { useState, useEffect } from "react";
import Contract from "../Services/Contract";
import { useAuth } from "../Contexts/AuthContext";

export default function Tickets () {
  const { account, getBalance } = useAuth()
  const [myTickets, setMyTickets] = useState();
  const [ticketPrice, setTicketPrice] = useState();

  const getTicketsInfos = async () => {
    const _ticketprice = await Contract.ticketPrice(account);
    setTicketPrice(_ticketprice);

    getMyTickets();
  }

  const getMyTickets = async () => {
    const _myTickets = await Contract.myTickets(account);
    setMyTickets(_myTickets);

    console.log(_myTickets)
  }

  const buyTicket = async (type) => {
    await Contract.buyTicket(account, type, ticketPrice);

    getMyTickets();
    getBalance();
  }

  useEffect(() => {
    getTicketsInfos();
  }, []);

  return (
    <div style={{marginTop: "-240px", zIndex: "10000"}} >


      <div className="cards-containter-wrapper">
      <div className="cards-title">
      <h1>Mes tickets</h1>    
        <div className="cards-container">
          <div className="cards-wrapper">
          <div className="card-bottom-data">
            <h1 className="card-title">Bus</h1>
            <a className="card-buy-button" onClick={() => buyTicket('bus')}>Acheter</a>
            </div>
            <p className="card-info">Price: {ticketPrice}</p>
            <p className="card-info">Nombre possedé: {myTickets && myTickets.filter(ticket => ticket.ticketType == "bus").length}</p>
          </div>
          <div className="cards-wrapper">
          <div className="card-bottom-data">
            <h1 className="card-title">Train</h1>
            <a className="card-buy-button" onClick={() => buyTicket('train')}>Acheter</a>
            </div>
            <p className="card-info">Price: {ticketPrice}</p>
            <p className="card-info">Nombre possedé: {myTickets && myTickets.filter(ticket => ticket.ticketType == "train").length}</p>
          </div>
          <div className="cards-wrapper">
          <div className="card-bottom-data">
            <h1 className="card-title">Metro</h1>
            <a className="card-buy-button" onClick={() => buyTicket('subway')}>Acheter</a>
          </div>
            <p className="card-info">Price: {ticketPrice}</p>
            <p className="card-info">Nombre possedé: {myTickets && myTickets.filter(ticket => ticket.ticketType == "subway").length}</p>
          </div>
        </div>  
      </div >
      </div>
    </div>
  );
}