import React, { useState, useEffect } from "react";
import Contract from "../Services/Contract";
import { useAuth } from "../Contexts/AuthContext";
import { CardForm } from "../Components";

export default function Cards () {
  const { account, isAdmin } = useAuth()
  const [availableCards, setAvailableCards] = useState();
  const [myCards, setMyCards] = useState();
  const [showModal, setShowModal] = useState(false);

  const getCards = async () => {
    const _availableCards = await Contract.availableCards(account);
    setAvailableCards(_availableCards);
    const _myCards = await Contract.myCards(account);
    setMyCards(_myCards);

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
    <div style={{marginTop: "-240px", zIndex: "10000"}}>
      <div className="cards-title">
        <h1>My cards : {myCards && myCards.length}</h1>
        <div>
          {myCards && myCards.map(e => (
            <p key={e}>{e}</p>
          ))}
        </div>
      </div>
      <div className="available-cards-title">
        <h1>Available cards {isAdmin && <a onClick={() => {setShowModal(!showModal)}}>show/hide</a>}</h1>
        <div>
          {availableCards && availableCards.map(e => (
            <p key={e}>{e}</p>
          ))}
        </div>
      </div>

      {
        showModal &&
        <CardForm />
      }
    </div>
  );
}