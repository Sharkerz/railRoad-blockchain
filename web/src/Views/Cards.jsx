import React, { useState, useEffect } from "react";
import Contract from "../Services/Contract";
import { useAuth } from "../Contexts/AuthContext";
import { CardForm } from "../Components";

export default function Cards () {
  const { account, isAdmin } = useAuth()
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

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div>
      <div className="cards-title">
        <h1>My cards : {myCards && myCards.length}</h1>
        <div>
          {myCards && myCardsGrouped && myCardsGrouped.map(e => {
            const cards = myCards.filter(card => card.groupId == e);
            return (
              <div key={e}>
                <p>Nom: {cards[0].name}</p>
                <p>Description: {cards[0].description}</p>
                <p>Réduction: {cards[0].discount}</p>
                <p>Nombre: {cards.length}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className="available-cards-title">
        <h1>Available cards {isAdmin && <a onClick={() => {setShowModal(!showModal)}}>show/hide</a>}</h1>
        <div>
        {availableCards && availableCardsGrouped && availableCardsGrouped.map(e => {
            const cards = availableCards.filter(card => card.groupId == e);
            return (
              <div key={e}>
                <p>Nom: {cards[0].name}</p>
                <p>Description: {cards[0].description}</p>
                <p>Réduction: {cards[0].discount} %</p>
                <p>Nombre disponible: {cards.length}</p>
              </div>
            )
          })}
        </div>
      </div>

      {
        showModal &&
        <CardForm getCards={getCards} />
      }
    </div>
  );
}