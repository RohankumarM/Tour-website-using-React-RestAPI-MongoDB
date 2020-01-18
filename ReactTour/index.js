import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";

import "./file.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import GuestApp from "./src/components/GuestApp"
import CustomerApp from "./src/components/CustomerApp";
import AdminApp from "./src/components/AdminApp";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "guest",
      showGuestApp: "false",
      showAdminApp: "false",
      showCustomerApp: "false",
      userInfo: "",
    };
    this.setshowAdmin = this.setshowAdmin.bind(this);
    this.setshowCustomer = this.setshowCustomer.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  setshowAdmin() {
    this.setState({
      showGuestApp: "false",
      showAdminApp: "true",
      showCustomerApp: "false",
      role: "admin",
    })
  }

  setshowCustomer() {
    this.setState({
      showCustomerApp: "true",
      showAdminApp: "false",
      showGuestApp: "false",
      role: "customer",
    })
  }

  handleLogin(role, username) {
    if (role === "admin") {
      console.log("logged in");
      this.setState({
        role: "admin",
        showAdminApp: "true",
        showGuestApp: "false",
        showCustomerApp: "false",
        userInfo: username,
      })
    }
    else if (role === "customer") {
      console.log("logged in");
      this.setState({
        role: "customer",
        showCustomerApp: "true",
        showGuestApp: "false",
        showAdminApp: "false",
        userInfo: username,
      })
    }
  }

  handleLogout(role, username) {
    console.log("logging out");
    this.setState({
      role: "guest",
      showGuestApp: "true",
      showAdminApp: "false",
      showCustomerApp: "false",
    })
  }


  render() {
    return (
      <div>
        <div className="header">
          <h1 style={{ textAlign: 'center', padding: '5px 0 5px' }}>
            Explore The Unexplored Tours
          </h1>
          <h3 style={{ textAlign: 'center', padding: '5px 0 5px' }}>
            Never Lose The Senses Of Wonder. NEVER . STOP . EXPLORING
          </h3>
        </div>

          <Button style={{ marginRight: '5px' }} onClick={this.setshowAdmin}>
            Admin
          </Button>
          <Button style={{ marginRight: '5px' }} onClick={this.setshowCustomer}>
            Customer
          </Button>
        

        {this.state.role === "guest" && (
          <GuestApp handleLogin={this.handleLogin} />
        )}
        {this.state.showAdminApp === "true" && (
          <AdminApp handleLogout={this.handleLogout} />
        )}
        {this.state.showCustomerApp === "true" && (
          <CustomerApp handleLogout={this.handleLogout} />
        )}
      </div>
    )
  }

};

ReactDOM.render(<App />, document.getElementById("root"));

