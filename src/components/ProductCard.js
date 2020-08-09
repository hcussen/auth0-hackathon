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

    fetch("/prodprice")
      .then((res) => res.json())
      .then((data) => {
        setCurrentPrice(data.price.data[0].id);
      });
  }, [productID]);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{currentProd.name}</Card.Title>
        <Card.Text>{currentProd.description}</Card.Text>
        <Checkout productID={currentPrice}>Donate </Checkout>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
