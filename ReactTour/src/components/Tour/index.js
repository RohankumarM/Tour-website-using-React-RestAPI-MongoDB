import React, { Component } from "react";

import "./style.css"
import TourTable from "../Tour/Tour1"

class Tour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: "tour",
      data: "null"
    };
  }

  render() {
    return (
      <div>
        <TourTable />
      </div>

    )
  }
};


export default Tour;