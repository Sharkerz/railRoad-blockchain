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
  };

  useEffect(() => {
    getCards();
  }, []);

  console.log("MyCards", myCards);
  console.log("availableCards", availableCards);

  return (
    <div>
      <div>
        <h1>My cards : {myCards && myCards.length}</h1>
        <div>
          {myCards && myCards.map(e => (
            <p key={e}>{e}</p>
          ))}
        </div>
      </div>
      <div>
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