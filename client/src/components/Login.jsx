import React, { useState, useEffect } from "react";
import axios from 'axios'

const Login = () => {
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const getUser = async () => {
      let user = await axios.get('http://localhost:3001/auth/login/success')
      console.log(user)
    }

    getUser()
  }, [])

  return (
    <div>
        
    </div>
  )
};

export default Login
