import React from "react";
import "./Header.css";
import LoginButton from "../LoginButton";
import UserInfo from "../UserInfo";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col } from "react-bootstrap";

const Header = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Container fluid className="my-header">
      <Row>
        <Col sm={8}>
          <h1>City Animal Shelter</h1>
        </Col>
        <Col sm={4}>{isAuthenticated ? <UserInfo /> : <LoginButton />}</Col>
      </Row>
    </Container>
  );
};

export default Header;
