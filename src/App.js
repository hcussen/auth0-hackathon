import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import Checkout from "./components/Checkout";
import MyCard from "./components/Card";

const stripePromise = loadStripe(
  "pk_test_51HDkRmEZFQAi6Kd7g9lQ12DizGNAzTsotDXjuiFobbkEz6IKJvWyVRrUyaLHO1EnBOYrfYRbIYjKb4dhNrSFjToN00CB5cH4la"
);

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <MyCard></MyCard>
      <Checkout productID="price_1HE0kdEZFQAi6Kd7yEROgYpX">buy me</Checkout>
    </Elements>
  );
};

export default App;
