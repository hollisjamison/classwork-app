import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";

const Homepage = () => {
  let [auth, setAuth] = useState(false);
  let [user, setUser] = useState({});
  let [error, setError] = useState("");

  const handleNotAuthenticated = () => {
    setAuth(false);
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:3001/auth/login/success",
        { withCredentials: true },
        {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }
      )
      .then((res) => {
        if (res.status == 200) return res;
        throw new Error("failed to authenticate user");
      })
      .then((resJson) => {
        setAuth(true);
        setUser(resJson.data.user);
        setError(null);
      })
      .catch((error) => {
        setAuth(false);
        setUser({});
        setError("Failed to authenticate user");
      });
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <Header
        authenticated={auth}
        handleNotAuthenticated={handleNotAuthenticated}
      />
      {!auth ? (
        <h1>You are not authenticated</h1>
      ) : (
        <div>
          <h1> You are authenticated!</h1>
          <img src={user.avatar}/>
          <h2> Hi {user.username}</h2>
        </div>
      )}
    </div>
  );
};

export default Homepage;
