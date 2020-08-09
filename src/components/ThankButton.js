import React from "react";
import Button from "react-bootstrap/Button";

const ThankButton = ({ productName, children }) => {
  return <Button variant="primary">{children}</Button>;
};

export default ThankButton;
