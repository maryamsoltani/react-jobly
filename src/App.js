import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter } from "react-router-dom";

import NavBar from "./NavBar";
import Routes from "./Routes"
import JoblyApi from "./Api"
import UserContext from "./userContext"
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";


function App() {
  const [curUser, setCurUser] = useState(null);
  // const [token, setToken] = useState("");
  const [token, setToken] = useLocalStorage();
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  // let lsCall = useLocalStorage("GET")
  // console.log("effect LS call", lsCall)

  // User API Call to grab data. Dependency: Token. Will grab user data from DB
  useEffect(() => {
    async function getUser() {
      console.log("TOKEN state app", token);
      if (token) {
        try {
          let { username } = jwt.decode(token)
          let user = await JoblyApi.getOneUser(username)
          setCurUser(user)

        } catch (error) {
          console.log("User loading error:", error);
        }
      }
    };
    getUser()
  }, [token]);

  // Signup Function = Takes Userdata -> returns: token if user successfully added
  const signUpUser = async (formData) => {
    try {
      let res = await JoblyApi.signUp(formData)
      // setCurUser(formData.username)
      setToken(res)
      // useLocalStorage("SET", res)
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  // Login Function = Takes Userdata / password -> validateds -> returns: token if correct auth
  const loginUser = async (formData) => {
    try {
      let res = await JoblyApi.login(formData)
      // setCurUser(formData.username)
      setToken(res)
      // useLocalStorage("SET", res)
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  // Logout:
  const logout = () => {
    setCurUser(null);
    setToken(null);
  }

  const hasAppliedToJob = (id) => {
    return applicationIds.has(id)
  }

  // Applying to job functions
  const applyToJob = (id) => {
    if (hasAppliedToJob(id)) return
    JoblyApi.applyToJob(curUser.username, id)
    setApplicationIds(new Set([...applicationIds, id]))
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ curUser, setCurUser, signUpUser, loginUser, logout, hasAppliedToJob, applyToJob }}>
        <BrowserRouter>
          <NavBar />
          <Routes />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
