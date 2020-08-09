import React from "react";
import Button from "react-bootstrap/Button";

// const stripePromise = loadStripe(
//   "sk_test_51HDkRmEZFQAi6Kd7pAkZZtS33tq2Q1NG1dyqfO8gW1haptjw3fbadqTFfHO413T1wLUd7dHsXTw2TXQh7BWjq1EP00IDLvE3uZ"
// );
/*
props.productID
*/

const Checkout = (props) => {
  const stripe = window.Stripe(
    "pk_test_51HDkRmEZFQAi6Kd7g9lQ12DizGNAzTsotDXjuiFobbkEz6IKJvWyVRrUyaLHO1EnBOYrfYRbIYjKb4dhNrSFjToN00CB5cH4la"
  );

  const redirect = async (event) => {
    event.preventDefault();
    const { a, b } = stripe
      .redirectToCheckout({
        lineItems: [
          // Replace with the ID of your price
          { price: props.productID, quantity: 1 },
        ],
        mode: "payment",
        successUrl: `${window.location.origin}/page-2/`,
        cancelUrl: `${window.location.origin}/`,
      })
      .then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        console.log(result.error.message);
      });
  };

  return (
    <form onSubmit={redirect}>
      <Button type="submit" disabled={!stripe}>
        {props.children}
      </Button>
    </form>
  );
};

export default Checkout;
