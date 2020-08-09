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

const DashboardPage = () => {
  //   const [prodList, setProdList] = useState([]);
  //   useEffect(() => {}, [setProdList]);

  return <div>DASHBOARD</div>;
};

export default DashboardPage;
