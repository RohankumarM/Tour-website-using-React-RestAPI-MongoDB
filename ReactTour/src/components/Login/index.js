import React, { Component } from "react";

import "./styles.css";

import AdminApp from "../AdminApp";
import GuestApp from "../GuestApp"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "guest",
      email: "null",
      password: "null"
    };
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  setUsername(event) {
    this.setState({
      email: event.target.value,
    });
  }

  setPassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  doLogin() {
    console.log("logging in..");
    fetch('/login', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": this.state.email,
        "password": this.state.password
      })
    }).then((response) => {
      console.log("Response:", response);
      if (response.status !== 200) {
        throw response.error;
      }
      return response.json();
    }).then((data) => {
      console.log("Data", data);
      this.props.onSuccessfulauth(data["role"], {
        email: data["email"],
        firstName: data["firstName"],
        lastName: data["lastName"]
      });
    }).catch(function (error) {
      console.log("Error while logging in : ", error);
    });
    // fetch('/login', {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     "email": this.state.email,
    //     "password": this.state.password
    //   })
    // }).then((response) => {
    //   console.log(response);
    //   return response.props.onSuccessfulauth("admin", { name: this.state.email });
    // }).then((data) => {
    //   console.log('Request success: ', data);
    // }).catch((error) => {
    //   console.log('Request failure: ', error);
    // });

    // if ("admin@email.org" === this.state.email) {
    //   this.props.onSuccessfulauth("admin", { name: "rohan_admin", netId: "ab4489" });
    // }
    // if ("cust@email.org" === this.state.email) {
    //   this.props.onSuccessfulauth("customer", { name: "rohan_cust", netId: "ab4489" });
    // }
    // else
    //   this.props.onSuccessfulauth("guest", {});
  }

  render() {
    return (
      <div>
        <div className="login-container">
          <div>Email: </div>
          <input type="email" onChange={this.setUsername} ref="username" placeholder="john.doe@gmail.com" />
          <div>Password: </div>
          <input type="password" onChange={this.setPassword} ref="username" />
          <button onClick={this.doLogin}>LOGIN</button>
        </div>
      </div>
    )
  }
};


export default Login;