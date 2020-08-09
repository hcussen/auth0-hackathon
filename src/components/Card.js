import React from "react";
import Card from "react-bootstrap/Card";

import Checkout from "../Checkout";

const Card = (props) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.text}</Card.Text>
        <Button variant="primary" onClick={}>
          Donate!
        </Button>
        <Checkout productID="price_1HE0kdEZFQAi6Kd7yEROgYpX">Donate </Checkout>
      </Card.Body>
    </Card>
  );
};

export default Card;
