import React, { useState, useEffect } from "react";

import { Elements } from "@stripe/react-stripe-js";
import Container from "react-bootstrap/Container";
import CardDeck from "react-bootstrap/CardDeck";

import ProductCard from "../components/ProductCard";
import GoalCard from "../components/GoalCard/GoalCard";

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
        // console.log(data);
        setProdList(data.list.data);
      });
  }, [setProdList]);

  return (
    <Container className="app-container">
      <Elements stripe={stripePromise}>
        <CardDeck>
          {prodList.map((prod) => {
            if (
              prod.id === "prod_Hnyn5deSyBNjBC" ||
              prod.id === "prod_Hnc31zqvvzlZbo"
            ) {
              return <GoalCard key={prod.id} productID={prod.id}></GoalCard>;
            }
            return (
              <ProductCard key={prod.id} productID={prod.id}></ProductCard>
            );
          })}
        </CardDeck>
      </Elements>
    </Container>
  );
};

export default HomePage;
