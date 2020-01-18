import React, { Component } from "react";

import Home from "../Home";

import GuestApp from "../GuestApp";

import "./style.css";
import data from "../../constants";

class CustomerApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: "customer",
    };
    this.onSuccessfulLogout = this.onSuccessfulLogout.bind(this);
  }

  onSuccessfulLogout() {
    fetch('/logout', {
      method: "GET"
    })
      .then((data) => {
        this.props.handleLogout(data["guest"], {});
      })
      .then((response) => {
        console.log("response:", response);
      }).catch(function (error) {
        console.log("Error while logging out..", error);
      })
    // this.props.handleLogout("guest", {});
  }


  render() {
    return (
      <div>
        <nav>
          <ul>
            <li><a>TOURS</a></li>
            <li><a>ABOUT US</a></li>
            <li><a>HOME</a></li>
            <li><a onClick={this.onSuccessfulLogout}>LOGOUT</a></li>
          </ul>
        </nav>
        <div className="customer-header">
          Cutomer: Not yet implemented
        </div>
      </div>
    )
  }
};

export default CustomerApp;