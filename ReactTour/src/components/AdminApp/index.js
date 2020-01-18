import React, { Component } from "react";

import "./style.css";
import GuestApp from "../GuestApp";
import AdminTour from "../AdminApp/AdminTour"

class AdminApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: "admin",
    };
    this.onSuccessfulLogout = this.onSuccessfulLogout.bind(this);
    this.onCallTourManag = this.onCallTourManag.bind(this);
  }

  onSuccessfulLogout() {
    fetch('/logout', {
      method: "GET"
    })
    .then((response) => {
      console.log("response: ", response);
    }).then((data) => {
      this.props.handleLogout("guest", {});
    }).catch(function(error){
      console.log("error while logging out:", error);
    })
    // this.props.handleLogout("guest", {});
  }

  onCallTourManag() {
    this.setState({
      showing: "TourM",
    })
  }


  render() {
    return (
      <div>
        <nav>
          <ul>
            <li><a onClick={this.onCallTourManag}>TOUR MANAGEMENT</a></li>
            <li><a>CUSTOMER MANAGEMENT</a></li>
            <li><a>ABOUT US</a></li>
            <li><a>HOME</a></li>
            <li><a onClick={this.onSuccessfulLogout}>LOGOUT </a></li>
          </ul>
        </nav>
        {this.state.showing === "admin" && (
          <div className="admin-header">
            Admin: Not yet implemented
        </div>
        )}
        {this.state.showing === "guest" && (
          <GuestApp />
        )}
        {this.state.showing === "TourM" && (
          <AdminTour />
        )}

      </div>
    )
  }
};

export default AdminApp;