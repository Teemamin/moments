import React, { useState, useEffect, createContext } from "react";
import styles from "./App.module.css";
import NavBar from './components/NavBar';
import Container from "react-bootstrap/Container";
import "./api/axiosDefaults";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import axios from "axios";

export const CurrentUserContext = createContext();

function App() {
  const [currentUser, setCurrentUser]=useState(null)

  const handleMount = async ()=>{
    try{
      const {data} = await axios.get("/dj-rest-auth/user/")
      setCurrentUser(data)
    }catch(e){
      console.log(e)
    }
  }
  useEffect(() => {
    handleMount()
    
  }, [])
  return (
    <div className={styles.App}>
      <NavBar/>
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={()=><h2>Home page </h2>}/>
          <Route exact path="/signin" render={()=><SignInForm/>}/>
          <Route exact path="/signup" render={()=><SignUpForm/>}/>
          <Route render={() => <p>Page not found!</p>} />

        </Switch>
      </Container>
    </div>
  );
}

export default App;
