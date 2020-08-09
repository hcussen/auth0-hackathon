import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import PrivateRoute from "./components/PrivateRoute";
import "./GlobalStyles.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/home";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  return (
    <div id="app">
      <Auth0Provider
        domain="dev-rfxe-cap.us.auth0.com"
        clientId="Bp15bvDnRF7kmKhFDyi1pz9WofQCl2j1"
        redirectUri={`${window.location.origin}/dashboard`}
      >
        <Header />
        <Router>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <PrivateRoute path="/dashboard" exact component={DashboardPage} />
          </Switch>
        </Router>
      </Auth0Provider>
    </div>
  );
};

export default App;
