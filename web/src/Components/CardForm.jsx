import React, { useState } from "react";
import Contract from "../Services/Contract";
import { useAuth } from "../Contexts/AuthContext";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';

export default function CardForm (props) {
  const { account, isAdmin } = useAuth()
  const [name, setName] = useState("test");
  const [price, setPrice] = useState(10)
  const [count, setCount] = useState(10);
  const [discount, setDiscount] = useState(10);
  const [image, setImage] = useState("test");
  const [description, setDescription] = useState("test");

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
    
    props.getCards();
  }

  return (
    <div style={{ padding: "20px" }} className="form-wrapper">
      <Form labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal" className="form">
              <div className="input-wrapper">
                <div className="input-group">
                  <Input className="input-form" style={{width: "200px"}} placeholder="Nom" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />

                  <Input  className="input-form" style={{width: "150px"}} placeholder="Prix" type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="input-group">
                  <Input  className="input-form" style={{width: "175px"}} placeholder="Nombre" type="number" name="count" value={count} onChange={(e) => setCount(e.target.value)} />

                  <Input  className="input-form" style={{width: "175px"}} placeholder="Réduction" type="number" name="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                </div>

                  <Input className="input-form" style={{width: "350px"}} placeholder="Image string" type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} />

                  <Input className="input-form" style={{width: "350px"}} placeholder="Description" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

                <Button type="submit" value="Submit" className="button" onClick={handleSubmit}>Créer la carte</Button>
              </div>

      </Form>
    </div>
  );
}