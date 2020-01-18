import React, { Component } from "react";

import toursData from "../../constants";

import "./style.css"

class TourTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch("/tours")
      .then(res => res.json())
      .then(resData => {
        this.setState({ data: resData });
      })
  }

  render() {
    return (
      <div>
        <div className="table-header">
          <table>
            <tbody>
              {this.state.data.map((tour) => {
                return (
                  <tr key={tour._id}>
                    <th><button>Delete</button></th>
                    <th>{tour.name}</th>
                    <th>{tour.city}</th>
                    <th>{tour.date}</th>
                  </tr>
                )
              }
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
};


export default TourTable;