import React, { useState, useEffect } from "react";
import "./GlobalStyles.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Container from "react-bootstrap/Container";

import ProductCard from "./components/ProductCard";
import Header from "./components/Header/Header";

const stripePromise = loadStripe(
  "pk_test_51HDkRmEZFQAi6Kd7g9lQ12DizGNAzTsotDXjuiFobbkEz6IKJvWyVRrUyaLHO1EnBOYrfYRbIYjKb4dhNrSFjToN00CB5cH4la"
);

const App = () => {
  const [prodList, setProdList] = useState([]);
  useEffect(() => {
    fetch("/product_list")
      .then((res) => res.json())
      .then((data) => {
        setProdList(data.list.data);
      });
  }, [setProdList]);

  return (
    <div id="app">
      <Header />
      <Container fluid className="app-container">
        <Elements stripe={stripePromise}>
          {prodList.map(() => {
            return <ProductCard></ProductCard>;
          })}
        </Elements>
      </Container>
    </div>
  );
};

export default App;
