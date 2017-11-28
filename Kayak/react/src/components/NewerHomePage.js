import React, {Component, PropTypes} from 'react';
import {Link, Route, withRouter} from 'react-router-dom';
import * as API from '../api/API';
import {DropdownMenu, MenuItem} from 'react-bootstrap-dropdown-menu';
import UserHeader from "./UserHeader";
import AdminHeader from "./AdminHeader";
import UserFooter from "./UserFooter";
import AdminHomePage from "./admin/AdminHomePage";
import Hotels from "./Hotels";
import Flights from "./Flights";
import Cars from "./cars";
import Carbooking from './carbooking';
import Hotelbooking from './hotelbooking';
import DateTimeField from 'react-bootstrap-datetimepicker';
import axios from "axios";
import {connect} from "react-redux";

var abc = {backgroundImage: '../images/cover_bg_1.jpg'};
var w = {width: 80, height: 40, color: "black"}
var hoteldata = {}, cardata = {};

var color = {color:"black"}

var date = new Date();
date.setDate(date.getDate()-1,'YYYY-MM-DD');

var nowDate = new Date();
var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0)

class NewerHomePage extends Component {

    /*componentWillMount(){

        //var self=this;
        //console.log("in store ",this.props.select);
        axios.get('http://localhost:3001/flights/from')
            .then(function (response) {
                console.log(response);
                console.log(response.data.from);
                self.setState({
                    fromCity:response.data.from
                    //isLoggedIn: true,
                    //message: "Welcome to my App..!!",
                    //username: userdata.username
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://localhost:3001/flights/to')
            .then(function (response) {
                console.log(response);
                console.log(response.data.to);
                self.setState({
                    toCity:response.data.to
                    //isLoggedIn: true,
                    //message: "Welcome to my App..!!",
                    //username: userdata.username
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
*/
    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((res) => {
                alert("back in newer homepage : " + JSON.stringify(res));
                if (res.status === '201') {
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!",
                        //username: userdata.username
                    });
                    this.props.history.push("/welcome");
                } else if (res.status === '401') {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };
    handleSignUp = (userdata) => {
        //alert("in signup");
        API.doSignup(userdata)
            .then((res) => {
                //alert("back in handle signup response : " + JSON.stringify(res));
                if (res.status === '201') {
                    this.setState({
                        message: ""
                    });
                    this.props.history.push("/login");
                }
                else if (res.status === '401') {
                    this.setState({
                        message: JSON.stringify(res.errors)
                    });
                    //console.log(this.state.message);

                }

            })
    };
    handlehotelChange = (newDate) => {
        this.state.checkindate = newDate;
        hoteldata["checkindate"] = newDate;
    };
    handlehotelChange1 = (newDate) => {
        this.state.checkoutdate = newDate;
        hoteldata["checkoutdate"] = newDate;
    };
    handlecarChange = (newDate) => {
        cardata["pickupdate"] = newDate;
    };
    handlecarChange1 = (newDate) => {
        cardata["dropoffdate"] = newDate;
    };
    searchFlight = () => {
        //console.log(this.props.select);
        var inputData = "from city " + this.state.selectedFrom + "to city " + this.state.selectedTo + "going date" + this.state.goingDate + "coming date" + this.state.comingDate +" class " + this.state.selectedClass +" Adults"+ this.state.noAdults + " Child " + this.state.noChild;
        var today =new Date()
        var now = new Date(this.state.goingDate)
        var going = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        var coming = new Date(this.state.comingDate)

        var from = this.state.selectedFrom
        var to = this.state.selectedTo
        var goingD = this.state.goingDate
        var comingD = this.state.comingDate
        var Sclass = this.state.selectedClass
        var adult = this.state.noAdults
        var child = this.state.noChild

        if(from==="" || to==="" || goingD==="" || comingD==="" || Sclass==="" || adult==="")
            alert("Please select all the fields")
        else if(from===to)
            alert("From city cannot be same as To city")
        else if((new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))<(new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())))
            alert("Selected date cannot be less than today's date")
        else if(coming<=going)
            alert("Arrival date cannot be less than Departure date");
        else{
          var self=this;
          axios.get('http://localhost:3001/flights/search',{params:{from:document.getElementById('selectedFrom').value,to:document.getElementById('selectedTo').value,number_of_seats:document.getElementById('noAdults').value,number_of_seats_c:document.getElementById('noChild').value,category:document.getElementById('category').value,date:this.state.goingDate}})
              .then(function (response) {
                  console.log(response);
                  self.props.setFlights(response.data.returnFlightS);
                  localStorage.setItem("searchedFlights",response.data.returnFlightS);
                  console.log("in localStorage: ",localStorage.getItem("searchedFlights"));
                  this.props.history.push('/flights');
              })
              .catch(function (error) {
                  console.log(error);
              });
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
        } else {
            API.searchHotels(hoteldata)
                .then((res) => {
                    if (res.status === '200') {

                        try {
                            this.props.storeHotels(res);
                        }
                        catch (err) {
                            window.alert("Some error. Please try again later..")
                        }
                        this.props.history.push("/hotelbooking");

                    } else if (res.status === '500') {
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
            API.searchCars(hoteldata)
                .then((res) => {
                    if (res.status === '200') {

                        try {
                            this.props.storeCars(res);
                        }
                        catch (err) {
                            window.alert("Some error. Please try again later..")
                        }
                        this.props.history.push("/carbooking");

                    } else if (res.status === '500') {
                        window.alert("Bad request. Please try again later..")
                    }
                });
            //API call here
            //this.props.history.push('/cars');
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
            isUser: true,
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
            dropoffdate: "",
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
                    {this.state.isUser?<UserHeader/>:<AdminHeader/>}

                    <Route exact path="/" render={() => (

                        <div className="fh5co-hero">
                            <div className="fh5co-overlay"/>
                            <div className="fh5co-cover" data-stellar-background-ratio="0.5" style={abc}>
                                <div className="desc">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-8 col-md-8">
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
                                                        <div role="tabpanel" className="tab-pane active" id="flights">
                                                            <div className="row">
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <div className="input-field">
                                                                        <label for="from">From:</label>
                                                                        <select style={color}
                                                                                onChange={(event)=>{this.props.setSelectedFrom(event.target.value);this.setState({selectedFrom:event.target.value})}}  className="cs-select cs-skin-border" name="" id="selectedFrom">
                                                                            <option style={color} name="" id="">City</option>
                                                                            {
                                                                                /*this.state.fromCity.map(city=>
                                                                                    <option style={color} value={city}>{city}</option>

                                                                                )*/
                                                                            }

                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <div className="input-field">
                                                                        <label for="from">To:</label>

                                                                        <select style={color}
                                                                                onChange={(event)=>{this.props.setSelectedTo(event.target.value);this.setState({selectedTo:event.target.value})}}  className="cs-select cs-skin-border" name="" id="selectedTo">
                                                                            <option style={color} name="" id="">City</option>
                                                                            {
                                                                                /*this.state.toCity.map(city=>
                                                                                    <option style={color} value={city}>{city}</option>

                                                                                )*/
                                                                            }

                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                    <div className="input-field">
                                                                        <label for="date-start">Going Date</label>
                                                                        <div className="input-field">
                                                                            <DateTimeField  mode="date"
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
                                                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                    <div className="input-field">
                                                                        <label for="date-end">Coming Date:</label>
                                                                        <div className="input-field">
                                                                            <DateTimeField mode="date"
                                                                                           dateTime={this.state.comingDate}
                                                                                           minDate={this.state.startDate}
                                                                                           defaultText="Arrival Date"
                                                                                           format={this.state.format}
                                                                                           viewMode={this.state.mode}
                                                                                           inputFormat={this.state.inputFormat}
                                                                                           onChange={this.handleChange1}
                                                                            />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-12 mt">
                                                                    <section>
                                                                        <label for="class">Class:</label>
                                                                        {/*<select className="cs-select cs-skin-border">
                                                                            <option value="" disabled selected>Economy
                                                                            </option>
                                                                            <option value="economy">Economy</option>
                                                                            <option value="first">First</option>
                                                                            <option value="business">Business</option>*/}

                                                                            <select style={color}
                                                                                    onChange={(event)=>this.setState({selectedClass:event.target.value})}  className="cs-select cs-skin-border" name="" id="category">
                                                                                <option style={color} value="class">Class</option>
                                                                                <option style={color} value="economy">Economy</option>
                                                                                <option style={color} value="first">First</option>
                                                                                <option style={color} value="business">Business</option>
                                                                            </select>

                                                                      </section>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <section>
                                                                        <label for="class">Adult:</label>
                                                                        <input style={color} type='number' id="noAdults" onChange={(event) => {
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
                                                                        <input style={color} type='number' id="noChild" onChange={(event) => {
                                                                            this.setState({
                                                                                noChild: event.target.value
                                                                            });

                                                                        }}
                                                                        />
                                                                    </section>
                                                                </div>
                                                                <div className="col-xs-12">
                                                                    <button className="btn btn-primary btn-block" onClick={()=>this.searchFlight()}>Search Flight</button>
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
                                                                        <label for="date-start" id="">Check in:</label>
                                                                        <div className="input-field" id="checkindate">
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
                                                                    <input placeholder="Rooms" style={w} type='number'
                                                                           id="noofrooms" onChange={(event) => {
                                                                        hoteldata["noofrooms"] = Number(event.target.value)
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
                                                                               onChange={(event) => cardata["pickupcity"] = event.target.value}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <div className="input-field">
                                                                        <label for="from">Dropoff</label>
                                                                        <input type="text" className="form-control"
                                                                               id="to-place-car"
                                                                               placeholder="Tokyo, Japan"
                                                                               onChange={(event) => cardata["dropoffcity"] = event.target.value}/>
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

                    <Route exact path="/flights" render={() => (
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

                    <UserFooter/>
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return{
        hotels: state.reducerHotels,
        cars: state.reducerCars
    };
};

const mapDispatchToProps = (dispatch) => {
    return{

        storeHotels: (data) => {
            console.log("data is "+data);
            dispatch({
                type: "STOREHOTELS",
                payload :{data:data}
            });
        },

        storeCars: (data) => {
            console.log("data is " + data);
            dispatch({
                type: "STORECARS",
                payload :{data:data}
            });
        },
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NewerHomePage));
