import "./GoalCard.css";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import ThankButton from "../ThankButton";

const GoalCard = ({ productID }) => {
  const [currentProd, setCurrentProd] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetch(`/prod/${productID}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentProd(data.prod);
      });

    //fetch the progress amount
    fetch(`/progress${productID === "prod_Hnyn5deSyBNjBC" ? "cat" : "dog"}`)
      .then((res) => res.json())
      .then((data) => {
        setProgress(data);
      });
  }, [productID]);

  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title>{currentProd.name}</Card.Title>
        <ProgressBar now={progress} label={`${progress}%`} />
        <ThankButton productName={currentProd.name}>Thank Donors</ThankButton>
      </Card.Body>
    </Card>
  );
};

export default GoalCard;
