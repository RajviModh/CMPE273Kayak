import React, {Component} from 'react';
import '../css/hotel-style.css';
import '../css/bootstrap.css';
import DateTimeField from 'react-bootstrap-datetimepicker';
import {Checkbox} from 'react-bootstrap';
import Slider from 'rc-slider';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import * as API from '../api/API';


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

var amount = {border: 0, color: '#ffffff'};
var amount1 = {border: '0', color: '#ffffff'};

var color = {color: "black"}
var colorBlue = {color: "blue"}
var w = {width: 80, height: 40, color: "black"}
var optStyle = {color: "Black", height: 40}
var optStyle1 = {height: 30}
var padding = {padding: 0}
var btnStyle = {height: 40, width: 20}
var btnStyle1 = {height: 30, textAlign: "center"}
var borderStyle = {border: "thin solid #ff5c24", padding: 0}
var re = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
var regex = /\d/g;

var imgs = ["../images/car-2.jpg", "../images/car-3.jpg", "../images/car-4.jpg", "../images/car-5.jpg"];
var validator = require("email-validator")
var formdata = {};

const sliderChanged = (newRange) => {
  console.log(newRange);
}

const dropdownselected = () => {
  console.log(document.getElementById("cartypes").value);
}

const handleClose = () => {

  var close = document.getElementById("modalforcarbooking");

  if (close.style.display == 'none') {
    close.style.display = 'block';
  } else {
    close.style.display = 'none';
  }
}


class Cars extends Component {

  state = {
    goingDate: new Date(),
    comingDate: new Date(),
    format: "YYYY-MM-DD",
    inputFormat: "DD/MM/YYYY",
    mode: "date",
    pickupdate: "",
    dropoffdate: ""
  };

  handlecarChange = (newDate) => {
    this.state.pickupdate = newDate;
    formdata["fromDate"] = newDate;
  };
  handlecarChange1 = (newDate) => {
    this.state.dropoffdate = newDate;
    formdata["toDate"] = newDate;
  };

  displaycarbookingmodal = (CID, carname, price) => {

    var selectedCar = {CID, carname: carname, price: price};

    var bookingclick = document.getElementById("modalforcarbooking");

    if (bookingclick.style.display == "none") {
      bookingclick.style.display = 'block';
    } else {
      bookingclick.style.display = 'none';
    }
    this.props.selectedOption(selectedCar);
  }

  searchCars = () => {

    var fromcity = document.getElementById("from-place-car").value;
    var tocity = document.getElementById("to-place-car").value;

    if (fromcity == "") {
      window.alert("Please enter pick up location")
    } else if (tocity == "") {
      window.alert("Please enter dropoff location")
    } else if (this.state.pickupdate == "") {
      window.alert("Please enter pickup date")
    } else if (this.state.dropoffdate == "") {
      window.alert("Please enter dropoff date")
    } else {
      console.log("asjfsj;sd");
      var bookingdetails = {fromDate: this.state.pickupdate, toDate: this.state.dropoffdate};
      this.props.storeCarBookingRequest(bookingdetails);
      let responseStatus;
      console.log("car search data:" + formdata);
      API.searchCars(formdata)
        .then((res) => {
          responseStatus = res.status;
          return res.json();
        }).then(jsonData => {
        if (responseStatus === 200) {
          //console.log(jsonData);
          try {
            this.props.storeCars(jsonData.availableCars);
          }
          catch (err) {
            window.alert("Some error. Please try again later..")
          }
          this.props.history.push("/cars");

        } else if (responseStatus === 500) {
          window.alert("Bad request. Please try again later..")
        }
      });
      //API call here
      //this.props.history.push('/hotels');
    }
  }
  handlecarbooking = () => {

    document.getElementById('messfirstname').style.display = 'none';
    document.getElementById('messlastname').style.display = 'none';
    document.getElementById('messemail').style.display = 'none';
    document.getElementById('messcontact').style.display = 'none';

    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var contact = document.getElementById("contact").value;


    if (firstname == "") {
      document.getElementById('messfirstname').style.display = 'block';
      document.getElementById("messfirstname").innerHTML = 'Please enter first name';
    } else if (regex.test(firstname)) {
      document.getElementById('messfirstname').style.display = 'block';
      document.getElementById("messfirstname").innerHTML = 'Name cannot contain digits';
    } else if (lastname == "") {
      document.getElementById('messlastname').style.display = 'block';
      document.getElementById("messlastname").innerHTML = 'Please enter last name';
    } else if (regex.test(lastname)) {
      document.getElementById('messlastname').style.display = 'block';
      document.getElementById("messlastname").innerHTML = 'Name cannot contain digits';
    } else if (email == "") {
      document.getElementById('messemail').style.display = 'block';
      document.getElementById("messemail").innerHTML = 'Please enter email';
    } else if (!re.test(email)) {
      document.getElementById('messemail').style.display = 'block';
      document.getElementById("messemail").innerHTML = 'Invalid email';
    } else if (contact == "") {
      document.getElementById('messcontact').style.display = 'block';
      document.getElementById("messcontact").innerHTML = 'Please enter contact';
    } else {
      var details = {firstname: firstname, email: email, contact: contact};
      this.props.storeDetails(details);
      this.props.history.push('/carbooking')
    }
  }


  render() {

    var RoomTypes = [];
    console.log('files render');
    var status, url;

    return (
      <div>

        <div className="search-page" style={padding}>
          <div className="container">


            <div className="tab-content" style={borderStyle}>
              <div role="tabpanel" className="tab-pane active" id="flights">

                &nbsp; &nbsp;

                <div className="row">
                  <div className="col-xs-2 mt" style={padding}>
                    <div className="input-field">
                      <select style={optStyle}
                              onChange={(event) => formdata["pickUpPoint"] = event.target.value}
                              className="cs-select cs-skin-border" name="" id="from-place-car">

                        <option style={color} name="" id="">Pickup</option>
                        {
                          /*this.state.fromCity.map(city =>
                              <option style={color} value={city}>{city}</option>
                          )*/
                        }

                      </select>


                    </div>
                  </div>

                  <div className="col-xs-2 mt" style={padding}>
                    <div className="input-field">
                      <select style={optStyle}
                              onChange={(event) => formdata["dropOffPoint"] = event.target.value}
                              className="cs-select cs-skin-border" name="" id="to-place-car">

                        <option style={color} name="" id="">Dropoff</option>
                        {
                          /*this.state.fromCity.map(city =>
                              <option style={color} value={city}>{city}</option>
                          )*/
                        }

                      </select>


                    </div>
                  </div>

                  <div className="col-xs-3 mt" style={padding}>
                    <div className="input-field">

                      <div className="input-field">
                        <DateTimeField mode="date"
                                       style={optStyle1}
                                       dateTime={this.state.goingDate}
                                       minDate={this.state.startDate}
                                       defaultText="Pickup"
                                       format={this.state.format}
                                       viewMode={this.state.mode}
                                       inputFormat={this.state.inputFormat}
                                       onChange={this.handlecarChange}/>

                      </div>
                    </div>
                  </div>

                  &nbsp; &nbsp;

                  <div className="col-xs-3 mt" style={padding}>

                    <div className="input-field">

                      <div className="input-field">
                        <DateTimeField mode="date"
                                       dateTime={this.state.goingDate}
                                       minDate={this.state.startDate}
                                       defaultText="Dropoff"
                                       format={this.state.format}
                                       viewMode={this.state.mode}
                                       inputFormat={this.state.inputFormat}
                                       onChange={this.handlecarChange1}/>

                      </div>
                    </div>
                  </div>

                  &nbsp; &nbsp;

                  <div className="col-xs-1" style={padding}>
                    <button className="btn btn-primary btn-block" style={{btnStyle, padding: 0, height: 40, width: 40, borderRadius: 0}}
                            onClick={() => this.searchCars()}>
                      <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor">
                        <path
                          d="M31.88 12.32l-1.43 1.4L39.56 23H20v2h19.56l-9.11 9.27 1.43 1.41L43.35 24 31.88 12.32M11 23h6v2h-6zM5 23h3v2H5z" />
                      </svg>
                    </button>
                    {/*<input type="submit"
                                                                           className="btn btn-primary btn-block"
                                                                           value="Search Flight"/>*/}
                  </div>
                </div>
              </div>


            </div>

            <div className="search-grids">
              <div className="col-md-3 search-grid-left" style={{marginTop: 25}}>

                <div className="range">
                  <h3 className="sear-head">Filter by Price</h3><br></br>
                  <Range min={100} max={2000} defaultValue={[150, 500]}
                         tipFormatter={value => `${value}`} onChange={sliderChanged}/>
                </div>

                <div className="range-two">
                  <h3 className="sear-head">Filter by Car Type</h3>
                  <select id="cartypes" onChange={() => dropdownselected()}>
                    <option value=""></option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="SUV">SUV</option>
                  </select>

                </div>
              </div>
              <br/>

              <div className="col-md-9 search-grid-right">

                {this.props.select.cars.map((item, index) => {
                    return (
                      <div className="col-md-12 search-grid-right">
                        <div className="hotel-rooms">
                          <div className="hotel-left">
                            <a style={{fontSize: 25, color: '#DC143C'}}><span
                              class="glyphicon glyphicon-bed" aria-hidden="true"></span>{item.type}</a><br></br>
                            <p style={{marginRight: 365}} align="left">{item.make + " " + item.model}</p>
                            <div className="hotel-left-grids">
                              <div className="hotel-left-one">
                                <img src={imgs[Math.floor(Math.random() * imgs.length)]}
                                     width={50} height={200} name="pic" alt=""/>
                              </div>
                              <div className="hotel-left-two">

                                                        <span className="glyphicon glyphicon-map-marker"
                                                              aria-hidden="true"></span> {item.pickUpPoint}
                                <br></br><br></br>
                                <p><span className="glyphicon glyphicon-user"></span>{item.capacity}</p>
                                <p><span className="glyphicon glyphicon-file"></span>{item.doors}
                                </p>
                              </div>
                              <div class="clearfix"></div>
                            </div>
                          </div>

                          <div className="hotel-right text-right">
                            <h4>{item.price}</h4>
                            <p>Best price</p>
                            <a onClick={() => this.displaycarbookingmodal(item.CID, item.model, item.price)}>Continue</a>
                          </div>
                          <div className="clearfix"></div>
                        </div>

                      </div>
                    )
                  }
                )}

              </div>

              <div id="modalforcarbooking" className="modal" style={{display: 'none'}}>
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">
                        <center>Renter Details</center>
                      </h4>
                      <button type="button" className="close" data-dismiss="modal"
                              aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <input type="text" id="firstname" placeholder="First Name"></input>
                      <p id="messfirstname"></p>
                      <hr></hr>
                      <input type="text" id="lastname" placeholder="Last Name"></input>
                      <p id="messlastname"></p>
                      <hr></hr>
                      <input type="text" id="email" placeholder="Email"></input>
                      <p id="messemail"></p>
                      <hr></hr>
                      <input type="text" id="contact" placeholder="Phone Number"></input>
                      <p id="messcontact"></p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary"
                              onClick={() => this.handlecarbooking()}>Book Now
                      </button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal"
                              onClick={() => handleClose()}>Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    select: state.reducerCars
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    selectedOption: (data) => {
      dispatch({
        type: "STORESELECTEDCARS",
        payload: {data: data}
      });
    },

    storeDetails: (data) => {
      dispatch({
        type: "STOREUSERDETAILS",
        payload: {data: data}
      });
    },

  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cars));