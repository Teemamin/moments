import React, { useEffect, useRef, useState } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import logo from '../assests/logo.png'
import Avatar from "./Avatar";
import styles from "../styles/NavBar.module.css";
import {NavLink} from "react-router-dom";
import axios from 'axios';

import { useCurrentUser,  useSetCurrentUser } from "../contexts/CurrentUserContext";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const [expanded, setExpanded] = useState(false)

    const ref = useRef(null)

    useEffect(()=>{
      // see notes below
      const handleClickOutside = (event)=>{
        if (ref.current && !ref.current.contains(event.target)) {
          // console.log(ref.current)
          // console.log(event.target)
          // console.log(!ref.current.contains(event.target))
          setExpanded(false);
        }
      }

      document.addEventListener("mouseup", handleClickOutside);
      return () => {
        document.removeEventListener("mouseup", handleClickOutside);
      };

    },[ref]);
    const handleSignOut = async () => {
      try {
        await axios.post("dj-rest-auth/logout/");
        setCurrentUser(null);
      } catch (err) {
        console.log(err);
      }
    };

    const addPostIcon = (
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/posts/create"
      >
        <i className="far fa-plus-square"></i>Add post
      </NavLink>
    );
  
    const loggedInIcons = (
      <>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/feed"
        >
          <i className="fas fa-stream"></i>Feed
        </NavLink>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/liked"
        >
          <i className="fas fa-heart"></i>Liked
        </NavLink>
        <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
          <i className="fas fa-sign-out-alt"></i>Sign out
        </NavLink>
        <NavLink
          className={styles.NavLink}
          to={`/profiles/${currentUser?.profile_id}`}
        >
          <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
        </NavLink>
      </>
    );
    const loggedOutIcons = (
      <>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/signin"
        >
          <i className="fas fa-sign-in-alt"></i>Sign in
        </NavLink>
        <NavLink
          to="/signup"
          className={styles.NavLink}
          activeClassName={styles.Active}
        >
          <i className="fas fa-user-plus"></i>Sign up
        </NavLink>
      </>
    );
  
    return (
      <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
        <Container>
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" height="45" />
            </Navbar.Brand>
          </NavLink>
          {currentUser && addPostIcon}
          <Navbar.Toggle
           aria-controls="basic-navbar-nav"
           onClick={()=>setExpanded(!expanded)}
           ref={ref}
           />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-left">
              <NavLink
                exact
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/"
              >
                <i className="fas fa-home"></i>Home
              </NavLink>
  
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };
export default NavBar

//ref allow us to reference this (Navbar.Toggle) DOM element and detect  whether the user
// clicked inside or outside of it.

// Because we called the useRef hook,  the Navbar.Toggle is saved in the ref  
// variable’s current attribute. We’ll first  check the element has been assigned to it.  
// We need this because its initial value is  set to null. And then we’ll check if the  
// user has clicked away from the referenced button.  
// If they have, we’ll call setExpanded with  false, which will close our dropdown menu.
// Ok, we’ve defined our function, but we haven’t  done anything with it yet. Let’s then add a  
// mouseup event listener to the document and  set the handleClickOutside as its callback.
// inside the return statement’s cleanup  function, we’ll remove this event listener  
// so that we’re 100% sure we’re not  leaving any event listeners behind.  