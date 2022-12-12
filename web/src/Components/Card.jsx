import React, { useState } from "react";
import { Button, Form, Input } from 'antd';

export default function Card({ card, number, buyCard, sendCard }) {
  const [showModal, setShowModal] = useState();
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await sendCard(card, address);
  }

  return (
    <>
      <div className="cards-wrapper">
        {
          buyCard ?
          <div className="card-bottom-data">
            <p className="card-title">{card.name}</p>
            <a onClick={() => buyCard(card)} className="card-buy-button">Acheter</a>
          </div>
          :
          <div className="card-bottom-data">
            <p className="card-title">{card.name}</p>
            <a onClick={() => setShowModal(true)} className="card-buy-button">Envoyer</a>
          </div>
        }
        <p className="card-description">Description: {card.description}</p>

        <div className="card-bottom-data">
          <p className="card-info">Réduction: {card.discount}%</p>
          <p className="card-info">Quantité: {number}</p>
        </div>
      </div>
      
      {
        showModal &&
        <Form>
          <Input className="input-form" style={{width: "200px"}} placeholder="Adresse" type="text" name="adresse" value={address} onChange={(e) => setAddress(e.target.value)} />

          <Button type="submit" value="Submit" className="button" onClick={handleSubmit}>Envoyer la carte</Button>
        </Form>
      }
    </>
  );
}