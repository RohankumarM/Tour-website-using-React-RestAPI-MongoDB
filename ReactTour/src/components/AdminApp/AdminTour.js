import React, { Component } from "react";
import { Dropdown } from 'react-bootstrap';

import "./AdminTour.css"
import data from "../../constants";

class AdminTour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: "admintour",
      toursData: data,
      name: "null",
      city: "null",
      date: "null",
      fetchData: []
    };
    this.setName = this.setName.bind(this);
    this.setCity = this.setCity.bind(this);
    this.setDate = this.setDate.bind(this);
    this.addData = this.addData.bind(this);
  }

  componentDidMount() {
    fetch("/tours")
      .then(res => res.json())
      .then(resData => {
        this.setState({ fetchData: resData });
      })
  }

  setName(event) {
    this.setState({
      name: event.target.value,
    })
  }

  setCity(event) {
    this.setState({
      city: event.target.value,
    })
  }

  setDate(event) {
    this.setState({
      date: event.target.value,
    })
  }

  addData() {
    fetch('/tours/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "name": this.state.name,
        "city": this.state.city,
        "date": this.state.date
      })
    }).then((response) => {
      console.log("response: ", response);
    }).then((data) => {
      console.log(data);
    }).catch(function (error) {
      console.log("Error while adding tour...", error);
    });


    // const newData = {
    //   name: this.state.name,
    //   city: this.state.city,
    //   date: this.state.date,
    //   id: this.state.toursData.length + 1,
    // };
    // const updatedToursData = this.state.toursData;
    // updatedToursData.push(newData);
    // this.setState({
    //   toursData: updatedToursData,
    //   name: '',
    //   city: '',
    //   date: '',
    // })
  }

  deleteData(index) {
    const updatedToursdata = this.state.fetchData;
    let deleteTour;
    deleteTour = updatedToursdata[index];
    fetch("/tours/delete/" + deleteTour._id, {
      method: 'DELETE'
    }).then((response) => {
      console.log("response:", response);
    }).then((data) => {
      updatedToursdata.splice(index, 1);
    })

    // updatedToursdata.splice(index, 1);
    this.setState({
      toursData: updatedToursdata,
    })

  }

  render() {
    return (
      <div style={{ padding: 15 }}>
        <h4 style={{ marginLeft: 450 }}>Add Tour</h4>
        <div className="form-main">
          <div className="form-container">
            <label>
              Type:
              <div className="dropdown-btn">
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Select Tour
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Virtual Tour</Dropdown.Item>
                    <Dropdown.Item>Physical Tour</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </label>
            <div>
              <label>
                Name:
              <input style={{ marginLeft: 10 }} onChange={this.setName} type="type" name="name" />
              </label>
            </div>
            <div>
              <label>
                City:
              <input style={{ marginLeft: 26 }} onChange={this.setCity} type="type" name="city" />
              </label>
            </div>
            <div>
              <label>
                Date:
              <input style={{ marginLeft: 19 }} onChange={this.setDate} type="type" name="date" />
              </label>
            </div>
            <div>
              <button style={{ marginLeft: 110, marginTop: 20 }} onClick={this.addData}>
                Add
              </button>
            </div>
          </div>
        </div>


        <div className="table-container">
          <div>
            <h4>Virtual Tour</h4>
          </div>
          <table>
            <tbody>
              {this.state.fetchData.map((tour, index) => {
                return (
                  <tr key={tour._id}>
                    <th><button onClick={this.deleteData.bind(this, index)}>Delete</button></th>
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
  };
}


export default AdminTour;