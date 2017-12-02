import React, {Component} from 'react';
import '../css/hotel-style.css';
import '../css/bootstrap.css';
import * as API from '../api/API';
import Slider from 'rc-slider';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";

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

var imgs = ["../images/car-2.jpg", "../images/car-3.jpg", "../images/car-4.jpg", "../images/car-5.jpg"];

var creditCardValidator = require('credit-card-validator')
var CreditCard = require('credit-card')

class Hotelbooking extends Component {

    /*state = {
        flightData: [{
            f_id: '#AI-1',
            airline_name: 'Air India',
            fare_e: 1000000,
            fare_child_e: 5,
            capacity_e: 200,
            time_s: '23:23:00',
            time_e: '01:25',
            duration: '2:02:00'
        },
            {
                f_id: '#AI-2',
                airline_name: 'Jet Airways',
                fare_e: 1000000,
                fare_child_e: 5,
                capacity_e: 200,
                time_s: '23:23:00',
                time_e: '01:25',
                duration: '2:02:00'
            },
            {
                f_id: '#AI-2',
                airline_name: 'Jet Airways',
                fare_e: 1000000,
                fare_child_e: 5,
                capacity_e: 200,
                time_s: '23:23:00',
                time_e: '01:25',
                duration: '2:02:00'
            },
            {
                f_id: '#AI-2',
                airline_name: 'Jet Airways',
                fare_e: 1000000,
                fare_child_e: 5,
                capacity_e: 200,
                time_s: '23:23:00',
                time_e: '01:25',
                duration: '2:02:00'
            },
            {
                f_id: '#AI-2',
                airline_name: 'Jet Airways',
                fare_e: 1000000,
                fare_child_e: 5,
                capacity_e: 200,
                time_s: '23:23:00',
                time_e: '01:25',
                duration: '2:02:00'
            }

        ],
        fromCity: ['SFO', 'SJC', 'LAX'],
        toCity: ['SFO', 'SJC', 'LAX'],
        selectedFrom: '',
        selectedTo: '',
        goingDate: new Date(),
        comingDate: new Date(),
        selectedClass: '',
        noAdults: 0,
        noChild: 0,
        return_enable: false,
        hotel_name: 'Hilton',
        random: 0
    };
*/
    bookhotel = () => {

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

        //var validation = CreditCard.validate(card)

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
            var bookingdetails = {
                RID: this.props.select.selected.RID, fromDate: this.props.select.bookingdetails.checkin,
                toDate: this.props.select.bookingdetails.checkout, noOfRooms: this.props.select.bookingdetails.rooms,
                UID: this.props.select.bookingdetails.userid,firstname:this.props.select.details.lastname,
                lastname:this.props.select.details.lastname,contact:this.props.select.details.contact,
                lastname:this.props.select.details.email
            };

            API.bookHotel(bookingdetails)
                .then((res) => {

                    if (res.status === 200) {
                        window.alert("Booking successful..");
                        // this.props.history.push("/welcome");
                    } else if (res.status === 500) {
                        window.alert("Some error..");
                    } else{
                        window.alert("Some error..Please try again later");
                    }
                });
        }

    }


    render() {

        return (

            <div className="container-fluid">

                <div className="row">
                    <div className="col-md-12">
                        <h1 style={{color: "Orange"}}><b>Booking Summary</b></h1><br/><br/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h4> Price Details </h4><br/>
                    </div>
                </div>

                <div className="row">
                    <div className="center-block col-md-5">
                        <table id="tableMenu" className="table">
                            <tbody>
                            <tr>
                                <th style={{textAlign: 'center'}}>Hotel Name</th>
                                <th style={{textAlign: 'center'}}>Room type</th>
                                <th style={{textAlign: 'center'}}>Per Day</th>
                                <th style={{textAlign: 'center'}}>Total</th>
                            </tr>
                            <tr>
                                <td> {this.props.select.selected.name}</td>
                                <td> {this.props.select.selected.type}</td>
                                <td> {this.props.select.selected.rent}</td>
                                <td> {this.props.select.selected.rent}</td>
                            </tr>
                            </tbody>
                        </table>
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
                    <div className="center-block col-md-4">
                        <table id="tableMenu" className="table">
                            <tbody>
                            <tr>
                                <th style={{textAlign: 'center'}}>Name</th>
                                <th style={{textAlign: 'center'}}>Phone</th>
                                <th style={{textAlign: 'center'}}>Email</th>
                            </tr>
                            <tr>
                                <td> {this.props.select.details.firstname}</td>
                                <td> {this.props.select.details.contact}</td>
                                <td> {this.props.select.details.email}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

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
                        <p> --> The Hotel may, at its absolute discretion, cancel the reservation if the Hotel is of the
                            opinion that the reservation information provided is falsified or incomplete.
                        </p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> The Hotel shall be entitled to vary, amend and/or otherwise change these terms and
                            conditions at any time without prior notice.</p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> Additional restrictions and fees may apply based on driver's age.</p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> Additional charges may apply for required insurance, optional items, or additional
                            drivers. These services can be purchased from the rental car company at the time of
                            rental.</p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> You shall indemnify and hold the Hotel harmless in respect of any liability, loss,
                            damage, cost and expense of any nature arising out of, and/or in connection with the
                            acceptance of the reservation by the Hotel.
                        </p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> The Hotel shall not be liable for any losses, damages, costs or expenses incurred by you
                            as a result of any cancellation of the reservation by the Hotel.
                        </p><br/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <p> --> Cancellation of and/or amendments to your reservation must be made 48 hours prior to
                            your arrival date.
                        </p><br/>
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
                                        onClick={() => this.bookhotel()}>
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
    return {
        select: state.reducerHotels
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        storeRestore: () => {
            dispatch({
                type: "RESTORE"
            });
        },

    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hotelbooking));