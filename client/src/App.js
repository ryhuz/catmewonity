import React, { useState, useEffect } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter, Link, NavLink, Route, Switch } from 'react-router-dom'
import CatProfile from './profiles/CatProfile';
import UserProfile from './profiles/UserProfile';
import Home from './landings/Home'
import CatResults from './landings/Search/CatResults';
import Search from './landings/Search/Search';
import Login from './landings/account/Login';
import RegisterContainer from './landings/account/RegisterContainer';
import Dashboard from './landings/dashboard/Dashboard';
import PrivateRoute from './private/PrivateRoute';
import LogOut from './private/LogOut';
import { decode } from "jsonwebtoken";
import RegisterCatContainer from './newcat/RegisterCatContainer';
import Footer from './Footer';
import Logo from './resources/favicon-32x32.png'
import './App.css';

function App() {
  const [valid, setValid] = useState({
    valid: false,
    refreshed: true,
  });

  useEffect(() => {
    function checkLoggedIn() {
      let token = localStorage.getItem('token');

      if (token !== null) {
        let user = decode(token);
        if (user.user) {
          return setValid({
            valid: true,
            refreshed: false,
          });
        }
      }
      return setValid({
        valid: false,
        refreshed: false,
      });
    }
    checkLoggedIn()
  }, [])

  /* show this navbar when logged in */
  function navLoggedIn() {
    return (
      <Navbar fixed="top" expand="lg" className="thewholenavbar topnav py-3">
        <NavLink id="catmeownity-navbar" className="navbar-brand" to="/">
        <img className="logo-nav"
        src={Logo}
        width="40"
        // height="40"
        // className="d-inline-block align-top"
        alt="CatMeownity"
        />
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink to="/dashboard" id="dashie" className="btn mx-2">Dashboard</NavLink>
            <NavLink to="/search" id="search" className="btn mx-2">Search</NavLink>
            <NavLink to="/logout" id="logout" className='btn mx-2'>Log Out</NavLink>
            <NavLink to="/" className='btn mx-2'><i className="fas fa-question-circle"></i></NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
  /* show this navbar when NOT logged in */
  function navNotLoggedIn() {
    return (
      <Navbar fixed="top" expand="lg" className="thewholenavbar topnav py-2">
        <NavLink id="catmeownity-navbar" className="navbar-brand" to="/">
        <img className="logo-nav"
        src={Logo}
        width="40"
        // height="40"
        // className="d-inline-block align-top"
        alt="CatMeownity"
        />
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link id="dashie" to="/login" className="btn mx-2" >Log In</Link>
            <Link id="search" to="/register" className="btn mx-2" >Register</Link>
            <NavLink id="logout" to="/search" className="btn mx-2">Search</NavLink>
            <NavLink to="/" className='btn mx-2'><i className="fas fa-question-circle"></i></NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  return (
    <BrowserRouter>
      {valid.valid ? navLoggedIn() : navNotLoggedIn()}

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/search'>
          <Search />
        </Route>
        <Route path='/location/:locationID'>
          <CatResults validLogIn={valid} />
        </Route>
        <Route path='/cat/:id'>
          <CatProfile />
        </Route>
        <Route path='/profile/:id'>
          {/* NEED TO ADD SLUG */}
          <UserProfile />
        </Route>
        <Route path='/login'>
          <Login setValid={setValid} />
        </Route>
        <Route path='/register'>
          <RegisterContainer setValid={setValid} />
        </Route>

        {/* THESE ROUTES SHOULD BE PRIVATE */}
        <PrivateRoute path='/dashboard' component={Dashboard} valid={valid} />
        <PrivateRoute path='/logout' component={LogOut} valid={valid} setValid={setValid} />
        <PrivateRoute path='/newcat/:locationID/' component={RegisterCatContainer} valid={valid} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
