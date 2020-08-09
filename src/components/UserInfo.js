import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useAuth0 } from "@auth0/auth0-react";

const UserInfo = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user;

  return (
    <Container>
      <Row>
        <Col md={2}>
          <img
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h3>{name}</h3>
          <p>{email}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default UserInfo;
