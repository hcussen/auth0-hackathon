import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Checkout from "./Checkout";

const ProductCard = ({ productID }) => {
  const [currentProd, setCurrentProd] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");

  useEffect(() => {
    fetch(`/prod/${productID}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentProd(data.prod);
      });

    fetch(`/prodprice/${productID}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentPrice(data.price.data[0]);
      });
  }, [productID]);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{currentProd.name}</Card.Title>
        <Card.Subtitle>${currentPrice.unit_amount / 100}</Card.Subtitle>
        <Card.Text>{currentProd.description}</Card.Text>
        <Checkout productID={currentPrice.id}>Donate </Checkout>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
