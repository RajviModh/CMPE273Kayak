import React, {Component} from 'react';
import '../css/hotel-style.css';
import '../css/bootstrap.css';
import CustomizedRange from './CustomizedRange';
import ReactStars from 'react-stars'
import ReactBootstrapSlider from 'react-bootstrap-slider'
import hotel1 from '../images/fb1.png';
import DateTimeField from 'react-bootstrap-datetimepicker';
import {Checkbox} from 'react-bootstrap';
import car from '../images/car-2.jpg';
import $ from 'jquery';
import Slider from 'rc-slider';
import { Link,Route, withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import axios from "axios";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

var creditCardValidator = require('credit-card-validator')
var CreditCard = require('credit-card')

class FlightBooking extends Component {

    state = {
        flightData : [],
        fromCity : [],
        toCity : [],
        selectedFrom : '',
        selectedTo:'',
        goingDate : new Date(),
        comingDate : new Date(),
        selectedClass:'',
        noAdults:0,
        noChild:0,
        return_enable:false,
        hotel_name: 'Hilton',
        random:0
    };

    flight_booking = () => {

        var cardvalidator = document.getElementById("cardvalidator");
        var cvvvalidator = document.getElementById("cvvvalidator");
        var expiryvalidator = document.getElementById("expiryvalidator");
        var namevalidator = document.getElementById("namevalidator");

        var cardnumber = document.getElementById("cardnumber").value;
        var cvv = document.getElementById("cvv").value;
        var expiry = document.getElementById("expiry").value;
        var name = document.getElementById("name").value;

        var parts = expiry.split("/");
        var part1 = parts[0];
        var part2 = parts[1];

        var regex = /\d/g;

        var card = {
            expiryMonth: part1,
            expiryYear: part2,
        };

        document.getElementById('cardvalidator').style.display = 'none';
        document.getElementById('cvvvalidator').style.display = 'none';
        document.getElementById('expiryvalidator').style.display = 'none';
        document.getElementById('namevalidator').style.display = 'none';

        if (!creditCardValidator.validateCard(cardnumber)) {
            document.getElementById('cardvalidator').style.display = 'block';
            document.getElementById('cardvalidator').innerHTML = 'Invalid card number';
        } else if (cvv.length != 3 || isNaN(Number(cvv))) {
            console.log(Number(cvv));
            document.getElementById('cvvvalidator').style.display = 'block';
            document.getElementById('cvvvalidator').innerHTML = 'Invalid CVV';
        } else if (isNaN(Number(part1)) || isNaN(Number(part2)) || expiry.charAt(2) != '/' || part1 > 31) {
            document.getElementById('expiryvalidator').style.display = 'block';
            document.getElementById('expiryvalidator').innerHTML = 'Invalid expiry date';
        } else if (regex.test(name)) {
            document.getElementById('namevalidator').style.display = 'block';
            document.getElementById('namevalidator').innerHTML = 'Invalid name';
        } else {
            console.log(localStorage.getItem('goingD'));
            console.log(this.props.select.selectedFlight.fare);
            console.log(((this.props.select.Adult.length*this.props.select.selectedFlight.fare)+(this.props.select.Child.length*this.props.select.selectedFlight.fare/10)));
            var self=this;
            axios.get('http://localhost:3001/flights/flight_booking_direct',{params:{f_id:this.props.select.selectedFlight.f_id,user_id:"1",flight_start_s:localStorage.getItem('goingD'),class:localStorage.getItem('Sclass'),duration:this.props.select.selectedFlight.duration,booked_seats:this.props.select.Adult.length,passenger:this.props.select.Adult.concat(this.props.select.Child),fare:((this.props.select.Adult.length*this.props.select.selectedFlight.fare)+(this.props.select.Child.length*this.props.select.selectedFlight.fare_child))}})
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });


             };




    }

    render() {

        return (

            <div className="container-fluid">

                <div className="row">
                    <div className="col-md-12">
                        <h1 style={{color:"Orange"}}> <b>Booking Summary</b> </h1><br/><br/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h4> Passenger Details </h4><br/>
                    </div>
                </div>

                <div className="row">
                    <div className="center-block col-md-5">
                        <table id="tableMenu" className="table">
                            <tbody>
                            <tr>
                                <th style={{textAlign: 'center'}}>Name of the Passengers:</th>
                                <th style={{textAlign: 'center'}}>Age : &nbsp;</th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {
                  this.props.select.Adult.map
                  (Adult=>
                    <div className="row">
                        <div className="center-block col-md-5">
                            <table id="tableMenu" className="table">
                                <tbody>
                                <tr className="spaceUnder">
                                    <th style={{textAlign: 'center'}}>{Adult.name}</th>
                                    <th style={{textAlign: 'center'}}>{Adult.age}</th>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                  )
                }

                {
                  this.props.select.Child.map
                  (Child=>
                    <div className="row">
                        <div className="center-block col-md-5">
                            <table id="tableMenu" className="table">
                                <tbody>
                                <tr>
                                    <th style={{textAlign: 'center', 'border-collapse': 'collapse'}}>{Child.name}</th>
                                    <th style={{textAlign: 'center'}}>{Child.age}</th>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                  )
                }

                <div className="row">
                    <div className="col-md-12">
                        <hr/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h4> Terms and Conditions </h4><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> We do not sell Travel Products</p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> KAYAK hosts content, including prices, made available by or obtained from Travel Providers.</p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> -->  KAYAK is in no way responsible for the accuracy, timeliness or completeness of such content.</p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> Since KAYAK has no control over the Travel Products and does not verify the content uploaded by the Travel Providers, it is not possible for us to guarantee the prices displayed on Our Website.</p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> Prices change constantly and additional charges (e.g. payment fees, services charges, checked-in luggage fees, local taxes and fees) may apply, so you should always check whether the price asked for a booking is the one you expected. </p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> If you make a booking through Our Website for Travel Products, that booking is made with the Travel Provider named on the booking page and Our Website only acts as a user interface.</p><br/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <hr/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h4> Booking Details </h4><br/>
                    </div>
                </div>

                <div className="row">

                    <div id="centerbarmain" className="center-block col-md-6">
                        <form id="userdatachangeform">

                            <div className="form-group">
                                <input id="cardnumber"
                                       className="form-control"
                                       type="text"
                                       label="Card Number"
                                       placeholder="Card Number"
                                       onChange={(event) => {

                                       }}
                                />
                            </div>

                            <div>
                                <p id="cardvalidator"></p>
                            </div>

                            <div className="form-group">
                                <input id="expiry"
                                       className="form-control"
                                       type="text"
                                       label="Expiry"
                                       placeholder="Expiry"
                                       onChange={(event) => {

                                       }}
                                />
                            </div>

                            <div>
                                <p id="cvvvalidator"></p>
                            </div>

                            <div className="form-group">
                                <input id="cvv"
                                       className="form-control"
                                       type="text"
                                       label="CVV"
                                       placeholder="CVV"
                                       onChange={(event) => {

                                       }}
                                />
                            </div>

                            <div>
                                <p id="expiryvalidator"></p>
                            </div>

                            <div className="form-group">
                                <input id="name"
                                       className="form-control"
                                       type="text"
                                       label="Card Holders Name"
                                       placeholder="Card Holders Name"
                                       onChange={(event) => {

                                       }}
                                />
                            </div>

                            <div>
                                <p id="namevalidator"></p>
                            </div>

                            <div id="change" className="form-group">
                                <button id="change"
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={() => this.flight_booking()}>
                                    Book Now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return{
        select: state.reducerFlights
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        setSelectedFrom: (data) => {
            console.log("data is "+data);
            dispatch({
                type: "setSelectedFrom",
                payload :{data:data}
            });
        },
        setSelectedTo: (data) => {
            dispatch({
                type: "setSelectedTo",
                payload :{data:data}
            });
        },
        setFlights: (data) => {
          console.log("flights are ",data);
            dispatch({
                type: "setFlights",
                payload :{data:data}
            });
        },
        setFromCity: (data) => {
          dispatch({
              type: "setFromCity",
              payload :{data:data}
          });
        },
        setSelectedFlight: (data) => {
          dispatch({
              type: "setSelectedFlight",
              payload :{data:data}
          });
        },
        setSelectedFlightR: (data) => {
            dispatch({
                type: "setSelectedFlightR",
                payload :{data:data}
            });
        },
        setAdult: (data) => {
          dispatch({
              type: "setAdult",
              payload :{data:data}
          });
        },
        setChild: (data) => {
          dispatch({
              type: "setChild",
              payload :{data:data}
          });
        },
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FlightBooking));
