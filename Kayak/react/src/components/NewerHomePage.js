import React, {Component, PropTypes} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../api/API';

import {DropdownMenu, MenuItem} from 'react-bootstrap-dropdown-menu';
import UserHeader from "./UserHeader";
import AdminHeader from "./AdminHeader";
import BeforeHeader from "./BeforeHeader"
import UserFooter from "./UserFooter";
import AdminHomePage from "./admin/AdminHomePage";
import AdminAddHotels from "./admin/AdminAddHotels";
import AdminAddFlights from "./admin/AdminAddFlights";
import Welcome from "./Welcome";
//import '../css/style.css';
//import '../css/bootstrap.css';
import FlightBooking from "./FlightBooking";
import moment from 'moment';
import Hotels from "./Hotels";
import Flights from "./Flights";
import Cars from "./cars";
import Carbooking from './carbooking';
import Hotelbooking from './hotelbooking';
import DateTimeField from 'react-bootstrap-datetimepicker';
import MyBookingsF from './MyBookingsF';
import MyBookingsH from './MyBookingsH';
import MyBookingsC from './MyBookingsC';
import axios from "axios";
import {connect} from "react-redux";

var abc = {backgroundImage: '../images/cover_bg_1.jpg'};
var w = {width: 80, height: 40, color: "black"}
var hoteldata = {}, cardata = {};

var color = {color: "black"}

var date = new Date();
date.setDate(date.getDate() - 1, 'YYYY-MM-DD');

var nowDate = new Date();
var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0)

class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: '',
        showLoginModal: false,
        showSignupModal: false,
        isUser: true,
        date: "2017-11-21",
        startDate: moment(this.props.minDate, 'DD/MM/YYYY'),
        format: "YYYY-MM-DD",
        inputFormat: "DD/MM/YYYY",
        mode: "date",
        fromCity: [],
        toCity: [],
        selectedFrom: this.props.select.selectedFrom,
        selectedTo: this.props.select.selectedTo,
        goingDate: new Date(),
        comingDate: new Date(),
        selectedClass: '',
        noAdults: 0,
        noChild: 0,
        return_enable: false
    }

    componentWillMount() {
        this.props.setFromCity([])
        this.props.setToCity([])

        this.setState({isLoggedIn: localStorage.getItem("isLoggedIn"), isUser: localStorage.getItem("isUser")})

        if (localStorage.getItem("return_enable") === null || localStorage.getItem("return_enable") === undefined || localStorage.getItem("return_enable") === '') {
            this.setState({
                return_enable: false
            })
        } else {
            this.setState({
                return_enable: localStorage.getItem("return_enable")
            })
        }
        var self = this;
        console.log("in store ", this.state.selectedFrom);
        axios.get('http://localhost:3001/flights/from')
            .then(function (response) {
                console.log(response);
                console.log(response.data.from);
                self.setState({
                    fromCity: response.data.from
                });
                localStorage.setItem("fromCity", response.data.from);
                self.props.setFromCity(response.data.from);
                console.log("in store in home page" + self.props.select.fromCity);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://localhost:3001/flights/to')
            .then(function (response) {
                console.log(response);
                console.log(response.data.to);
                self.setState({
                    toCity: response.data.to
                });
                localStorage.setItem("toCity", response.data.to);
                self.props.setToCity(response.data.to);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleSubmit = (userdata) => {
        var isEmailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(userdata.username)

        if (userdata.userdata === "" || userdata.password === "") {
            alert("Please insert all the fields")
        }
        else if (!isEmailValid) {
            alert("Email id invalid. Please try again.")
        }
        else {
            API.doLogin(userdata)
                .then((res) => {
                    //alert("back in newer homepage : " + JSON.stringify(res));
                    if (res.status === '201') {
                        this.setState({
                            isLoggedIn: true,
                            message: "Welcome to my App..!!",
                            //username: userdata.username
                        });
                        localStorage.setItem("isLoggedIn", true)
                        alert(localStorage.getItem("isLoggedIn"))
                        this.close('login')
                        this.props.history.push('/flights')
                    } else if (res.status === '401') {
                        this.setState({
                            isLoggedIn: false,
                            message: "Wrong username or password. Try again..!!"
                        });
                        alert("Wrong username or password. Try again..!!")
                    }
                });
        }
    };
    handleSignUp = (userdata) => {

        var isEmailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(userdata.username)

        if (userdata.userdata === "" || userdata.password === "") {
            alert("Please insert all the fields")
        }
        else if (!isEmailValid) {
            alert("Email id invalid. Please try again.")
        }
        else {

            API.doSignup(userdata)
                .then((res) => {
                    alert("back in handle signup response : " + JSON.stringify(res));
                    if (res.code === '201') {
                        this.setState({
                            message: ""
                        });
                        alert("You have sign up successfully")
                        this.open('login')
                    }
                    else if (res.code === '401' && res.value === "User already exists") {

                        this.setState({
                            message: JSON.stringify(res.value)
                        });
                        alert("You cannot regiister. User already exists with this email id.")

                    }
                    else {

                        this.setState({
                            message: JSON.stringify(res.value)
                        });
                        alert("Try Again. Error happened.")

                    }

                })
        }
    };

    handlehotelChange = (newDate) => {
        this.state.checkindate = newDate;
        hoteldata["fromDate"] = newDate;
    };
    handlehotelChange1 = (newDate) => {
        this.state.checkoutdate = newDate;
        hoteldata["toDate"] = newDate;
    }
    handleChange = (newDate) => {
        //alert(newDate)
        return this.setState({goingDate: newDate});
    };
    handlecarChange = (newDate) => {
        this.state.pickupdate = newDate;
        cardata["fromDate"] = newDate;
    };
    handlecarChange1 = (newDate) => {
        this.state.dropoffdate = newDate;
        cardata["toDate"] = newDate;
    }
    handleChange1 = (newDate) => {
        //alert(newDate);
        return this.setState({comingDate: newDate});
    };

    searchFlight = () => {
        if (this.state.return_enable === true) {
            console.log(this.props.select);
            var inputData = "from city " + this.state.selectedFrom + "to city " + this.state.selectedTo + "going date" + this.state.goingDate + "coming date" + this.state.comingDate + " class " + this.state.selectedClass + " Adults" + this.state.noAdults + " Child " + this.state.noChild;
            var today = new Date()
            var now = new Date(this.state.goingDate)
            var going = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
            var now1 = new Date(this.state.comingDate)
            var coming = new Date(now1.getUTCFullYear(), now1.getUTCMonth(), now1.getUTCDate(), now1.getUTCHours(), now1.getUTCMinutes(), now1.getUTCSeconds());

            //alert(inputData);
            var from = this.state.selectedFrom
            var to = this.state.selectedTo
            var goingD = this.state.goingDate
            var comingD = this.state.comingDate
            var Sclass = this.state.selectedClass
            var adult = this.state.noAdults
            var child = this.state.noChild

            localStorage.setItem("Sclass", this.state.selectedClass);
            localStorage.setItem("adult", this.state.noAdults);
            localStorage.setItem("child", this.state.noChild);

            if (from === "" || to === "" || goingD === "" || comingD === "" || Sclass === "" || adult === "")
                alert("Please select all the fields")
            else if (from === to)
                alert("From city cannot be same as To city")
            else if ((new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())) < (new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())))
                alert("Selected date cannot be less than today's date")
            else if (coming < going)
                alert("Arrival date cannot be less than Departure date");
            else {
                var self = this;
                axios.get('http://localhost:3001/flights/search', {
                    params: {
                        from: document.getElementById('selectedFrom').value,
                        to: document.getElementById('selectedTo').value,
                        number_of_seats: document.getElementById('noAdults').value,
                        number_of_seats_c: document.getElementById('noChild').value,
                        category: document.getElementById('category').value,
                        date: this.state.goingDate
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        self.props.setFlights(response.data.returnFlightS);
                        localStorage.setItem("searchedFlights", JSON.stringify(response.data.returnFlightS));
                        console.log("after setting localStorage ", JSON.stringify(response.data.returnFlightS));
                        localStorage.setItem("goingD", goingD);
                        localStorage.setItem("Sclass", Sclass);
                        self.props.history.push("/flights_search");
                        //window.location.replace("/flights_search");
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                axios.get('http://localhost:3001/flights/round', {
                    params: {
                        to: document.getElementById('selectedFrom').value,
                        from: document.getElementById('selectedTo').value,
                        number_of_seats: document.getElementById('noAdults').value,
                        number_of_seats_c: document.getElementById('noChild').value,
                        category: document.getElementById('category').value,
                        date: this.state.comingDate
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        self.props.setFlights(response.data.returnFlightR);
                        localStorage.setItem("searchedFlightsR", JSON.stringify(response.data.returnFlightR));
                        console.log("after setting localStorage1 ", JSON.stringify(response.data.returnFlightR));
                        localStorage.setItem("comingD", comingD);
                        localStorage.setItem("Sclass", Sclass);
                        self.props.history.push("/flights_search");
                        //window.location.replace("/flights_search");
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        } else {
            console.log(this.props.select);
            var inputData = "from city " + this.state.selectedFrom + "to city " + this.state.selectedTo + "going date" + this.state.goingDate + "coming date" + this.state.comingDate + " class " + this.state.selectedClass + " Adults" + this.state.noAdults + " Child " + this.state.noChild;
            var today = new Date()
            var now = new Date(this.state.goingDate)
            var going = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
            var coming = new Date(this.state.comingDate)

            //alert(inputData);
            var from = this.state.selectedFrom
            var to = this.state.selectedTo
            var goingD = this.state.goingDate
            var comingD = this.state.comingDate
            var Sclass = this.state.selectedClass
            var adult = this.state.noAdults
            var child = this.state.noChild

            localStorage.setItem("Sclass", this.state.selectedClass);
            localStorage.setItem("adult", this.state.noAdults);
            localStorage.setItem("child", this.state.noChild);

            if (from === "" || to === "" || goingD === "" || Sclass === "" || adult === "")
                alert("Please select all the fields")
            else if (from === to)
                alert("From city cannot be same as To city")
            else if ((new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())) < (new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())))
                alert("Selected date cannot be less than today's date")
            else {
                var self = this;
                axios.get('http://localhost:3001/flights/search', {
                    params: {
                        from: document.getElementById('selectedFrom').value,
                        to: document.getElementById('selectedTo').value,
                        number_of_seats: document.getElementById('noAdults').value,
                        number_of_seats_c: document.getElementById('noChild').value,
                        category: document.getElementById('category').value,
                        date: this.state.goingDate
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        self.props.setFlights(response.data.returnFlightS);
                        localStorage.setItem("searchedFlights", JSON.stringify(response.data.returnFlightS));
                        localStorage.setItem("goingD", goingD);
                        localStorage.setItem("Sclass", Sclass);
                        self.props.history.push("/flights_search");
                        //window.location.replace("/flights_search");
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
    searchHotels = () => {

        var city = document.getElementById("city").value;
        var rooms = document.getElementById("noofrooms").value;
        //var checkin = document.getElementById("checkin").value;
        //var children = document.getElementById("noofchildren").value;

        if (city == "") {
            window.alert("Please enter city name")
        } else if (this.state.checkindate == "") {
            window.alert("Please enter check in date")
        } else if (this.state.checkoutdate == "") {
            window.alert("Please enter check out date")
        } else if (rooms == "") {
            window.alert("Please enter number of rooms")
        } else if (rooms <= 0) {
            window.alert("Please enter valid number of rooms")
        } else {
            var bookingdetails = {
                userid: 1,
                city: city,
                rooms: rooms,
                checkin: this.state.checkindate,
                checkout: this.state.checkoutdate
            }
            this.props.storeHotelBookingRequest(bookingdetails)
            let responseStatus;
            API.searchHotels(hoteldata)
                .then((res) => {
                    responseStatus = res.status;
                    return res.json();
                }).then(jsonData => {
                if (responseStatus === 200) {
                    //console.log(jsonData);
                    try {
                        this.props.storeHotels(jsonData.availableHotels);
                    }
                    catch (err) {
                        window.alert("Some error. Please try again later..")
                    }
                    this.props.history.push("/hotels");

                } else if (responseStatus === 500) {
                    window.alert("Bad request. Please try again later..")
                }
            });
            //API call here
            //this.props.history.push('/hotels');
        }
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
            var bookingdetails = {fromDate: this.state.pickupdate, toDate: this.state.dropoffdate} //carid left
            this.props.storeCarBookingRequest(bookingdetails);
            let responseStatus;
            console.log("car search data:" + cardata);
            API.searchCars(cardata)
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

    constructor(props) {
        super(props)
        this.state = {
            /*isLoggedIn: false,
            message: '',
            username: '',
            showLoginModal: false,
            showSignupModal: false,*/
           // isUser: false,
            /*date: "2017-11-21",
            startDate :  moment(this.props.minDate, 'DD/MM/YYYY'),*/
            format: "YYYY-MM-DD",
            inputFormat: "DD/MM/YYYY",
            mode: "date",
            /*fromCity : [],
            toCity : [],
            selectedFrom : this.props.select.selectedFrom,
            selectedTo:this.props.select.selectedTo,*/
            goingDate: new Date(),
            comingDate: new Date(),
            checkindate: "",
            checkoutdate: "",
            pickupdate: "",
            dropoffdate: ""
            //selectedClass:'',
            //noAdults:0,
            //noChild:0,
        }
    }

    close = (data) => {

        if (data === 'login') {
            //alert("in login of close");
            this.setState({showLoginModal: false});
        }
        else if (data === 'signup') {
            alert("in signup of close");
            this.setState({showSignupModal: false});
        }
    };

    open = (data) => {
        if (data === 'login') {
            alert("in login of open");
            this.setState({showLoginModal: true});
        }
        else if (data === 'signup') {
            alert("in signup of open");
            this.setState({showSignupModal: true});
        }
    };

    render() {
        return (
            <div id="fh5co-wrapper">
                <div id="fh5co-page">

                    <UserHeader/>

                   {/* {this.state.isLoggedIn ? (this.state.isUser ? <UserHeader/> : <AdminHeader/>) : <BeforeHeader/>}*/}

                    <Route exact path="/" render={() => (

                        <div className="fh5co-hero">
                            <div className="fh5co-overlay"/>
                            <div className="fh5co-cover" data-stellar-background-ratio="0.5" style={abc}>
                                <div className="desc">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-5 col-md-5">
                                                <div className="tabulation animate-box">


                                                    <ul className="nav nav-tabs" role="tablist">
                                                        <li role="presentation" className="active">
                                                            <a href="#flights" aria-controls="flights" role="tab"
                                                               data-toggle="tab">Flights</a>
                                                        </li>
                                                        <li role="presentation">
                                                            <a href="#hotels" aria-controls="hotels" role="tab"
                                                               data-toggle="tab">Hotels</a>
                                                        </li>
                                                        <li role="presentation">
                                                            <a href="#packages" aria-controls="packages" role="tab"
                                                               data-toggle="tab">Cars</a>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content">
                                                        <div role="tabpanel" className="tab-pane active"
                                                             id="flights">
                                                            <div className="row">
                                                                <label><input type="radio" name="optradio"
                                                                              onChange={() => {
                                                                                  this.props.setReturnEnable(false);
                                                                                  localStorage.setItem("return_enable", false);
                                                                                  this.setState({return_enable: false})
                                                                              }}/>One-Way</label>
                                                                <label><input type="radio" name="optradio"
                                                                              onChange={() => {
                                                                                  this.props.setReturnEnable(true);
                                                                                  localStorage.setItem("return_enable", true);
                                                                                  this.setState({return_enable: true})
                                                                              }}/>Round-Trip</label>
                                                            </div>
                                                            <div className="row">
                                                                <br/>
                                                            </div>
                                                            <div className="row">
                                                                <br/>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <div className="input-field">
                                                                        <label for="from">From:</label>
                                                                        <select style={color}
                                                                                onChange={(event) => {
                                                                                    this.props.setSelectedFrom(event.target.value);
                                                                                    this.setState({selectedFrom: event.target.value})
                                                                                }}
                                                                                className="cs-select cs-skin-border"
                                                                                name="" id="selectedFrom">
                                                                            <option style={color} name="" id="">City
                                                                            </option>
                                                                            {
                                                                                /*this.state.fromCity.map(city=>
                                                                                    <option style={color} value={city}>{city}</option>

                                                                                )*/
                                                                                this.props.select.fromCity.map(city=>
                                                                                    <option style={color} value={city}>{city}</option>

                                                                                )
                                                                            }

                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <div className="input-field">
                                                                        <label for="from">To:</label>

                                                                        <select style={color}
                                                                                onChange={(event) => {
                                                                                    this.props.setSelectedTo(event.target.value);
                                                                                    this.setState({selectedTo: event.target.value})
                                                                                }}
                                                                                className="cs-select cs-skin-border"
                                                                                name="" id="selectedTo">
                                                                            <option style={color} name="" id="">City
                                                                            </option>
                                                                            {
                                                                                /*this.state.toCity.map(city=>
                                                                                    <option style={color} value={city}>{city}</option>

                                                                                )*/
                                                                                this.props.select.toCity.map(city=>
                                                                                    <option style={color} value={city}>{city}</option>

                                                                                )
                                                                            }

                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                    <div className="input-field">
                                                                        <label for="date-start">Going Date</label>
                                                                        <div className="input-field">
                                                                            <DateTimeField mode="date"
                                                                                           dateTime={this.state.goingDate}
                                                                                           minDate={this.state.startDate}
                                                                                           defaultText="Departure Date"
                                                                                           format={this.state.format}
                                                                                           viewMode={this.state.mode}
                                                                                           inputFormat={this.state.inputFormat}
                                                                                           onChange={this.handleChange}/>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    this.state.return_enable
                                                                        ?
                                                                        <div
                                                                            className="col-xxs-12 col-xs-6 mt alternate">
                                                                            <div className="input-field">
                                                                                <label for="date-end">Coming
                                                                                    Date:</label>
                                                                                <div className="input-field">
                                                                                    <DateTimeField mode="date"
                                                                                                   dateTime={this.state.comingDate}
                                                                                                   minDate={this.state.startDate}
                                                                                                   defaultText="Arrival Date"
                                                                                                   format={this.state.format}
                                                                                                   viewMode={this.state.mode}
                                                                                                   inputFormat={this.state.inputFormat}
                                                                                                   onChange={this.handleChange1}/>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        null
                                                                }
                                                                <div className="col-sm-12 mt">
                                                                    <section>
                                                                        <label for="class">Class:</label>
                                                                        {/*<select className="cs-select cs-skin-border">
                                                                            <option value="" disabled selected>Economy
                                                                            </option>
                                                                            <option value="economy">Economy</option>
                                                                            <option value="first">First</option>
                                                                            <option value="business">Business</option>*/}

                                                                        <label for="Class">class:</label>

                                                                        <select style={color}
                                                                                onChange={(event) => this.setState({selectedClass: event.target.value})}
                                                                                className="cs-select cs-skin-border"
                                                                                name="" id="category">
                                                                            <option style={color}
                                                                                    value="class">Class
                                                                            </option>
                                                                            <option style={color}
                                                                                    value="economy">Economy
                                                                            </option>
                                                                            <option style={color}
                                                                                    value="first">First
                                                                            </option>
                                                                            <option style={color}
                                                                                    value="business">Business
                                                                            </option>
                                                                        </select>

                                                                    </section>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <section>
                                                                        <label for="class">Adult:</label>
                                                                        <input style={color} type='number'
                                                                               id="noAdults" onChange={(event) => {
                                                                            this.setState({
                                                                                noAdults: event.target.value
                                                                            });

                                                                        }}
                                                                        />
                                                                    </section>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <section>
                                                                        <label for="class">Children:</label>
                                                                        <input style={color} type='number'
                                                                               id="noChild"
                                                                               onChange={(event) => {
                                                                                   this.setState({
                                                                                       noChild: event.target.value
                                                                                   });

                                                                               }}
                                                                        />
                                                                    </section>
                                                                </div>
                                                                <div className="col-xs-12">
                                                                    <button className="btn btn-primary btn-block"
                                                                            onClick={() => this.searchFlight()}>Search
                                                                        Flight
                                                                    </button>
                                                                    {/*<input type="submit"
                                                                           className="btn btn-primary btn-block"
                                                                           value="Search Flight"/>*/}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div role="tabpanel" className="tab-pane" id="hotels">
                                                            <div className="row">
                                                                <div className="col-xxs-12 col-xs-12 mt">
                                                                    <div className="input-field">
                                                                        <label for="from">City:</label>
                                                                        <input type="text" className="form-control"
                                                                               id="city"
                                                                               placeholder="Los Angeles, USA"
                                                                               onChange={(event) => hoteldata["city"] = event.target.value}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                    <div className="input-field">
                                                                        <label for="date-start" id="">Check
                                                                            in:</label>
                                                                        <div className="input-field"
                                                                             id="checkindate">
                                                                            <DateTimeField mode="date"
                                                                                           dateTime={this.state.goingDate}
                                                                                           minDate={this.state.startDate}
                                                                                           defaultText="Check in date"
                                                                                           format={this.state.format}
                                                                                           viewMode={this.state.mode}
                                                                                           inputFormat={this.state.inputFormat}
                                                                                           onChange={this.handlehotelChange}/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                    <div className="input-field">
                                                                        <label for="date-end" id="checkoutdate">Check
                                                                            Out:</label>
                                                                        <div className="input-field">
                                                                            <DateTimeField id="checkoutdate"
                                                                                           mode="date"
                                                                                           dateTime={this.state.goingDate}
                                                                                           minDate={this.state.startDate}
                                                                                           defaultText="Check out date"
                                                                                           format={this.state.format}
                                                                                           viewMode={this.state.mode}
                                                                                           inputFormat={this.state.inputFormat}
                                                                                           onChange={this.handlehotelChange1}/>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-12 mt">
                                                                    <input placeholder="Rooms" style={w}
                                                                           type='number'
                                                                           id="noofrooms" onChange={(event) => {
                                                                        hoteldata["requiredNoOfRooms"] = Number(event.target.value)
                                                                    }}
                                                                    />
                                                                </div>

                                                                <div className="col-xs-12">
                                                                    <input type="submit"
                                                                           className="btn btn-primary btn-block"
                                                                           onClick={() => this.searchHotels()}
                                                                           value="Search Hotel"/>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div role="tabpanel" className="tab-pane" id="packages">
                                                            <div className="row">
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <div className="input-field">
                                                                        <label for="from">Pick Up</label>
                                                                        <input type="text" className="form-control"
                                                                               id="from-place-car"
                                                                               placeholder="Los Angeles, USA"
                                                                               onChange={(event) => cardata["pickUpPoint"] = event.target.value}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <div className="input-field">
                                                                        <label for="from">Dropoff</label>
                                                                        <input type="text" className="form-control"
                                                                               id="to-place-car"
                                                                               placeholder="Tokyo, Japan"
                                                                               onChange={(event) => cardata["dropOffPoint"] = event.target.value}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                    <div className="input-field">
                                                                        <label for="date-start">Pick up Date</label>
                                                                        <div className="input-field">
                                                                            <DateTimeField mode="datetime"
                                                                                           dateTime={this.state.goingDate}
                                                                                           minDate={this.state.startDate}
                                                                                           defaultText="Pick up date"
                                                                                           format={this.state.format}
                                                                                           viewMode={this.state.mode}
                                                                                           inputFormat={this.state.inputFormat}
                                                                                           onChange={this.handlecarChange}/>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                    <div className="input-field">
                                                                        <label for="date-end">Dropoff date</label>
                                                                        <div className="input-field">
                                                                            <DateTimeField mode="datetime"
                                                                                           dateTime={this.state.goingDate}
                                                                                           minDate={this.state.startDate}
                                                                                           defaultText="Drop off Date"
                                                                                           format={this.state.format}
                                                                                           viewMode={this.state.mode}
                                                                                           inputFormat={this.state.inputFormat}
                                                                                           onChange={this.handlecarChange1}/>

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-xs-12">
                                                                    <input type="submit"
                                                                           className="btn btn-primary btn-block"
                                                                           onClick={() => this.searchCars()}
                                                                           value="Search Cars"/>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}/>

                    <Route exact path="/hotels" render={() => (
                        <div>
                            <Hotels/>
                        </div>
                    )}/>

                    <Route exact path="/flights_search" render={() => (
                        <div>
                            <Flights/>
                        </div>
                    )}/>


                    <Route exact path="/cars" render={() => (
                        <div>
                            <Cars/>
                        </div>
                    )}/>

                    <Route exact path="/adminhome" render={() => (
                        <div>
                            <AdminHomePage/>
                        </div>
                    )}/>

                    <Route exact path="/carbooking" render={() => (
                        <div>
                            <Carbooking/>
                        </div>
                    )}/>

                    <Route exact path="/hotelbooking" render={() => (
                        <div>
                            <Hotelbooking/>
                        </div>
                    )}/>
                    <Route exact path="/flight_booking" render={() => (
                        <div>
                            <FlightBooking/>
                        </div>
                    )}/>
                    <Route exact path="/car_bookings" render={() => (
                        <div>
                            <MyBookingsC/>
                        </div>
                    )}/>

                    <Route exact path="/flight_bookings" render={() => (
                        <div>
                            <MyBookingsF/>
                        </div>
                    )}/>

                    <Route exact path="/hotel_bookings" render={() => (
                        <div>
                            <MyBookingsH/>
                        </div>
                    )}/>
                    <UserFooter/>
                </div>
            </div>
        );

    }
}

const
    mapStateToProps = (state) => {
        return {
            hotels: state.reducerHotels,
            cars: state.reducerCars,
            select: state.reducerFlights
        };
    };

const
    mapDispatchToProps = (dispatch) => {
        return {

            storeHotels: (data) => {
                console.log("data is " + data);
                dispatch({
                    type: "STOREHOTELS",
                    payload: {data: data}
                });
            },

            storeHotelBookingRequest: (data) => {
                console.log("data is " + data);
                dispatch({
                    type: "STOREHOTELBOOKINGREQUEST",
                    payload: {data: data}
                });
            },

            storeCars: (data) => {
                console.log("data is " + data);
                dispatch({
                    type: "STORECARS",
                    payload: {data: data}
                });
            },

            storeCarBookingRequest: (data) => {
                console.log("data is " + data);
                dispatch({
                    type: "STORECARBOOKINGREQUEST",
                    payload: {data: data}
                });
            },

            setSelectedFrom: (data) => {
                console.log("data is " + data);
                dispatch({
                    type: "setSelectedFrom",
                    payload: {data: data}
                });
            },
            setSelectedTo: (data) => {
                dispatch({
                    type: "setSelectedTo",
                    payload: {data: data}
                });
            },
            setFlights: (data) => {
                console.log("flights are ", data);
                dispatch({
                    type: "setFlights",
                    payload: {data: data}
                });
            },
            setFromCity: (data) => {
                dispatch({
                    type: "setFromCity",
                    payload: {data: data}
                });
            },
            setToCity: (data) => {
                dispatch({
                    type: "setToCity",
                    payload: {data: data}
                });
            },
            setReturnEnable: (data) => {
                dispatch({
                    type: "setReturnEnable",
                    payload: {data: data}
                });
            },

        };
    };

export default withRouter(connect

(
    mapStateToProps
    ,
    mapDispatchToProps
)(
    NewerHomePage
))
;
