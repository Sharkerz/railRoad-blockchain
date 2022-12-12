import React, { useState, useEffect } from "react";
import Contract from "../Services/Contract";
import { useAuth } from "../Contexts/AuthContext";
import { CardForm, Card } from "../Components";

export default function Cards () {
  const { account, isAdmin, getBalance } = useAuth()
  const [availableCards, setAvailableCards] = useState();
  const [availableCardsGrouped, setAvailableCardsGrouped] = useState();
  const [myCards, setMyCards] = useState();
  const [myCardsGrouped, setMyCardsGrouped] = useState();
  const [showModal, setShowModal] = useState(false);

  const getCards = async () => {
    const _availableCards = await Contract.availableCards(account);
    setAvailableCards(_availableCards);
    const _myCards = await Contract.myCards(account);
    setMyCards(_myCards);

    setAvailableCardsGrouped(Array.from(new Set(_availableCards.map((item) => item.groupId))));
    setMyCardsGrouped(Array.from(new Set(_myCards.map((item) => item.groupId))));

    if (isAdmin) {
      const _allCards = await Contract.allCards(account);
      console.log("allCards", _allCards);
    }

    console.log("MyCards", _myCards);
    console.log("availableCards", _availableCards);
  };

  const buyCard = async (card) => {
    const buyedCard = await Contract.buyCard(account, card.id, card.price);

    getCards();
    getBalance();
  }

  const sendCard = async (card, address) => {
    await Contract.giveCard(account, card.id, address);

    getCards();
    getBalance();
  }

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div style={{marginTop: "-240px", zIndex: "10000"}}>
      <div className="cards-containter-wrapper">
        <div className="cards-title">
          <h1>Mes cartes : {myCards && myCards.length}</h1>
          <div className="cards-container">
            {myCards && myCardsGrouped && myCardsGrouped.map(e => {
              const cards = myCards.filter(card => card.groupId == e);
              return <Card key={e} card={cards[0]} number={cards.length} sendCard={sendCard} />
            })}
          </div>
        </div>  
        <div></div>      
      </div>

      <div className="cards-containter-wrapper">
      <div className="available-cards-title">
        <h1>Mes cartes disponibles {isAdmin && <a onClick={() => {setShowModal(!showModal)}}>show/hide</a>}</h1>
        <div className="cards-container">
        {availableCards && availableCardsGrouped && availableCardsGrouped.map(e => {
            const cards = availableCards.filter(card => card.groupId == e);
            return <Card key={e} card={cards[0]} number={cards.length} buyCard={buyCard} />
          })}
        </div>
      </div> 
      <div></div>       
      </div>


      {
        showModal &&
        <CardForm getCards={getCards} />
      }
    </div>
  );
}