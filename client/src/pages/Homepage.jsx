import React, { useState, useEffect } from "react";
import axios from "axios";

const Homepage = (props) => {
  let [user, setUser] = useState({});
  let [error, setError] = useState("");
  let { auth, setAuth } = props;


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
        if (res.status === 200) return res;
        throw new Error("failed to authenticate user");
      })
      .then((resJson) => {
        setAuth(true);
        setUser(resJson.data.user);
        setError(null);
      })
      .catch((error) => {
        console.log(error)
        //setAuth(false);
        //setUser({});
        setError("Failed to authenticate user");
      });
  }, []);

  return (
    <div className="homepage">
      {!auth ? (
        <h1>You are not authenticated</h1>
      ) : (
        <div>
          <h1> You are authenticated!</h1>
          <img src={user.avatar} />
          <h2> Hi {user.username}</h2>
        </div>
      )}
    </div>
  );
};

export default Homepage;
