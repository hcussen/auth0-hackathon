import React, { useState, useEffect } from "react";

import { Container } from "react-bootstrap";
import PrivateGoalCard from "../components/GoalCard/PrivateGoalCard";
import ProductCard from "../components/ProductCard";

const DashboardPage = () => {
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
    <Container>
      <h1>Your Goals</h1>

      {prodList.map((prod) => {
        if (
          prod.id === "prod_Hnyn5deSyBNjBC" ||
          prod.id === "prod_Hnc31zqvvzlZbo"
        ) {
          return (
            <PrivateGoalCard
              key={prod.id}
              productID={prod.id}
            ></PrivateGoalCard>
          );
        }
        return <ProductCard key={prod.id} productID={prod.id}></ProductCard>;
      })}
    </Container>
  );
};

export default DashboardPage;
