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
    <div>
      <h1>Tickets</h1>
      <div>
        <div>
          <h1>Bus</h1>
          <p>Price: {ticketPrice}</p>
          <p>Nombre possedé: {myTickets && myTickets.filter(ticket => ticket.ticketType == "bus").length}</p>
          <a onClick={() => buyTicket('bus')}>Acheter</a>
        </div>
        <div>
          <h1>Train</h1>
          <p>Price: {ticketPrice}</p>
          <p>Nombre possedé: {myTickets && myTickets.filter(ticket => ticket.ticketType == "train").length}</p>
          <a onClick={() => buyTicket('train')}>Acheter</a>
        </div>
        <div>
          <h1>Metro</h1>
          <p>Price: {ticketPrice}</p>
          <p>Nombre possedé: {myTickets && myTickets.filter(ticket => ticket.ticketType == "subway").length}</p>
          <a onClick={() => buyTicket('subway')}>Acheter</a>
        </div>
      </div>
    </div>
  );
}