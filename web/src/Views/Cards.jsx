import React, { useState, useEffect } from "react";
import Contract from "../Services/Contract";
import { useAuth } from "../Contexts/AuthContext";

export default function Cards () {
  const { account } = useAuth()
  const [availableCards, setAvailableCards] = useState();
  // const [myCards, setMyCards] = useState();

  const getCards = async () => {
    console.log("account", account);
    const _availableCards = await Contract.availableCards(account);
    setAvailableCards(_availableCards);
    console.log("there");
  };

  useEffect(() => {
    getCards();
  }, []);

  // console.log(myCards);
  console.log(availableCards);

  return (
    <div>
      Test Card Page
    </div>
  );
}