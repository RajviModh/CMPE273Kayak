import React, {Component} from 'react';
import '../css/hotel-style.css';
import '../css/bootstrap.css';
import {Checkbox} from 'react-bootstrap';
import Slider from 'rc-slider';
import * as API from '../api/API';
import {Link, Route, withRouter} from 'react-router-dom';
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
var borderStyle = {border: "thin solid #F78536", padding: 0}

var imgs = ["../images/car-2.jpg", "../images/car-3.jpg", "../images/car-4.jpg", "../images/car-5.jpg"];

var creditCardValidator = require('credit-card-validator')
var CreditCard = require('credit-card')


class Carbooking extends Component {

    /*state = {
        flightData : [  {
            f_id: '#AI-1',
            airline_name: 'Air India',
            fare_e: 1000000,
            fare_child_e: 5,
            capacity_e: 200,
            time_s: '23:23:00',
            time_e: '01:25',
            duration: '2:02:00' },
            {
                f_id: '#AI-2',
                airline_name: 'Jet Airways',
                fare_e: 1000000,
                fare_child_e: 5,
                capacity_e: 200,
                time_s: '23:23:00',
                time_e: '01:25',
                duration: '2:02:00' },
            {
                f_id: '#AI-2',
                airline_name: 'Jet Airways',
                fare_e: 1000000,
                fare_child_e: 5,
                capacity_e: 200,
                time_s: '23:23:00',
                time_e: '01:25',
                duration: '2:02:00' },
            {
                f_id: '#AI-2',
                airline_name: 'Jet Airways',
                fare_e: 1000000,
                fare_child_e: 5,
                capacity_e: 200,
                time_s: '23:23:00',
                time_e: '01:25',
                duration: '2:02:00' },
            {
                f_id: '#AI-2',
                airline_name: 'Jet Airways',
                fare_e: 1000000,
                fare_child_e: 5,
                capacity_e: 200,
                time_s: '23:23:00',
                time_e: '01:25',
                duration: '2:02:00' }

        ],
        fromCity : ['SFO','SJC','LAX'],
        toCity : ['SFO','SJC','LAX'],
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
*/
    bookcar = () => {

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
        }else if (cvv.length != 3 || isNaN(Number(cvv))) {
            console.log(Number(cvv));
            document.getElementById('cvvvalidator').style.display = 'block';
            document.getElementById('cvvvalidator').innerHTML = 'Invalid CVV';
        }else if (isNaN(Number(part1)) || isNaN(Number(part2)) || expiry.charAt(2) != '/' || part1 > 31) {
            document.getElementById('expiryvalidator').style.display = 'block';
            document.getElementById('expiryvalidator').innerHTML = 'Invalid expiry date';
        }else if (regex.test(name)) {
            document.getElementById('namevalidator').style.display = 'block';
            document.getElementById('namevalidator').innerHTML = 'Invalid name';
        }else{
            var carbookingdetails = {carid:this.props.select.selected.CID,pickup:this.props.select.carbookingdetails.fromDate,
                dropoff:this.props.select.carbookingdetails.toDate}

            API.bookCar(carbookingdetails)
                .then((res) => {

                    if (res.status === '200') {
                        window.alert("Booking successful..");
                    } else if (res.status === '500') {
                        window.alert("Some error..");
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
                                <th style={{textAlign: 'center'}}>Car</th>
                                <th style={{textAlign: 'center'}}>Per Day</th>
                                <th style={{textAlign: 'center'}}>Total</th>
                            </tr>
                            <tr>
                                <td> {this.props.select.selected.carname}</td>
                                <td> {this.props.select.selected.price}</td>
                                <td> {this.props.select.selected.price}</td>
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
                        <h4> Renter Details </h4><br/>
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
                        <p> --> Unlimited free miles included.</p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> Rental fees are due at pick up.</p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> Car rental companies require the driver to supply a credit card in his/her name in order
                            to pick up the car.</p><br/>
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
                        <p> --> Debit cards are not accepted for pre-paid reservations or security deposits</p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> he credit card used for booking must be presented at the rental counter for confirmation
                            of this reservation</p><br/>
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
                                           console.log(event.target.value);
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
                                           console.log(event.target.value);
                                       }}
                                />
                            </div>

                            <div>
                                <p id="expiryvalidator"></p>
                            </div>

                            <div className="form-group">
                                <input id="cvv"
                                       className="form-control"
                                       type="text"
                                       label="CVV"
                                       placeholder="CVV"
                                       onChange={(event) => {
                                           console.log(event.target.value);
                                       }}
                                />
                            </div>

                            <div>
                                <p id="cvvvalidator"></p>
                            </div>

                            <div className="form-group">
                                <input id="name"
                                       className="form-control"
                                       type="text"
                                       label="Card Holders Name"
                                       placeholder="Card Holders Name"
                                       onChange={(event) => {
                                           console.log(event.target.value);
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
                                        onClick={() => this.bookcar()}>
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
        select: state.reducerCars
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Carbooking));