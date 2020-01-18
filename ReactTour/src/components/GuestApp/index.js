import React, { Component } from "react";

import Home from "../Home";
import Login from "../Login";
import About from "../About";
import Tour from "../Tour";

import "./style.css";

class GuestApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      showHome: true,
      showAboutUs: false,
      showTour: false,
    };

    this.setShowLogin = this.setShowLogin.bind(this);
    this.setShowHome = this.setShowHome.bind(this);
    this.setShowAboutUs = this.setShowAboutUs.bind(this);
    this.onSuccessfulauth = this.onSuccessfulauth.bind(this);
    this.setTours = this.setTours.bind(this);
  }

  setShowLogin() {
    this.setState({
      showLogin: true,
      showHome: false,
      showAboutUs: false,
      showTour: false,
    });
  }

  setShowHome() {
    this.setState({
      showHome: true,
      showAboutUs: false,
      showLogin: false,
      showTour: false,
    })
  }

  setShowAboutUs() {
    this.setState({
      showAboutUs: true,
      showLogin: false,
      showHome: false,
      showTour: false,
    })
  }

  onSuccessfulauth(role, username) {
    this.props.handleLogin(role, username);
  }

  setTours() {
    this.setState({
      showAboutUs: false,
      showLogin: false,
      showHome: false,
      showTour: true,
    })
  }

  render() {
    return (
      <div>
        <nav>
          <ul>
            <li><a onClick={this.setShowHome}>HOME</a></li>
            <li><a onClick={this.setShowLogin}>LOGIN</a></li>
            <li><a>SIGN UP</a></li>
            <li><a onClick={this.setTours}>TOURS</a></li>
            <li><a onClick={this.setShowAboutUs}>ABOUT US</a></li>
          </ul>
        </nav>
        {this.state.showLogin === true && (
          <Login onSuccessfulauth={this.onSuccessfulauth} />
        )}
        {this.state.showHome === true && (
          <Home />
        )}
        {this.state.showAboutUs === true && (
          <About />
        )}
        {this.state.showTour === true && (
          <Tour />
        )}
      </div>
    )
  }
};


export default GuestApp;