import React, { useState } from "react";
import Contract from "../Services/Contract";
import { useAuth } from "../Contexts/AuthContext";

export default function CardForm () {
  const { account, isAdmin } = useAuth()
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0)
  const [count, setCount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      price: price,
      count: count,
      discount: discount,
      image: image,
      description: description
    }

    const resp = await Contract.createCard(account, data);

    console.log('resp', resp);

    console.log("cards should have been created");
  }

  return (
    <div style={{ padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Prix:
          <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          Nombre:
          <input type="number" name="count" value={count} onChange={(e) => setCount(e.target.value)} />
        </label>
        <label>
          Réduction:
          <input type="number" name="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        </label>
        <label>
          Image string:
          <input type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}