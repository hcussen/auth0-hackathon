import React, { useState, useEffect } from "react";

import { Container } from "react-bootstrap";
import PrivateGoalCard from "../components/GoalCard/PrivateGoalCard";

const DashboardPage = () => {
  const [prodList, setProdList] = useState([]);
  useEffect(() => {
    fetch("/product_list")
      .then((res) => res.json())
      .then((data) => {
        setProdList(data.list.data);
      });
  }, [setProdList]);

  return (
    <Container lg>
      <h1>Your Goals</h1>

      {prodList.map((prod) => {
        return (
          <PrivateGoalCard key={prod.id} productID={prod.id}></PrivateGoalCard>
        );
      })}
    </Container>
  );
};

export default DashboardPage;
