import React, { useState, useEffect } from "react";

import { Elements } from "@stripe/react-stripe-js";
import Container from "react-bootstrap/Container";
import CardDeck from "react-bootstrap/CardDeck";

import ProductCard from "../components/ProductCard";
import GoalCard from "../components/GoalCard/GoalCard";
import LoginButton from "../components/LoginButton";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51HDkRmEZFQAi6Kd7g9lQ12DizGNAzTsotDXjuiFobbkEz6IKJvWyVRrUyaLHO1EnBOYrfYRbIYjKb4dhNrSFjToN00CB5cH4la"
);

const HomePage = () => {
  const [prodList, setProdList] = useState([]);
  useEffect(() => {
    fetch("/product_list")
      .then((res) => res.json())
      .then((data) => {
        setProdList(data.list.data);
      });
  }, [setProdList]);

  return (
    <Container fluid className="app-container">
      <Elements stripe={stripePromise}>
        <CardDeck>
          {prodList.map((prod) => {
            return (
              <ProductCard key={prod.id} productID={prod.id}></ProductCard>
            );
          })}
        </CardDeck>
        <CardDeck>
          {prodList.map((prod) => {
            return <GoalCard key={prod.id} productID={prod.id}></GoalCard>;
          })}
        </CardDeck>
      </Elements>
      <LoginButton />
    </Container>
  );
};

export default HomePage;
