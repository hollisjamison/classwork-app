import React, { useState } from "react";
import Homepage from "./pages/Homepage";
import Repos from "./pages/Repos";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";

const AppRouter = () => {
  const [auth, setAuth] = useState(false);

  const handleNotAuthenticated = () => {
    setAuth(false);
  };

  return (
    <Router>
      <Header
        authenticated={auth}
        handleNotAuthenticated={handleNotAuthenticated}
      />
      <div className="router">
        <Route exact path="/" auth={auth} setAuth={setAuth} component={Homepage} />
        <Route exact path="/repos" component={Repos} />
      </div>
    </Router>
  );
};

export default AppRouter;
