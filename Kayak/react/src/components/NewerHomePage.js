import React, {Component, PropTypes} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../api/API';
import {DropdownMenu, MenuItem} from 'react-bootstrap-dropdown-menu';
import Login from "./Login";
import Message from "./Message";
import UserHeader from "./UserHeader";
import AdminHeader from "./AdminHeader";
import UserFooter from "./UserFooter";
import AdminHomePage from "./admin/AdminHomePage";
import moment from 'moment';
import Hotels from "./Hotels";
import DateTimeField from 'react-bootstrap-datetimepicker';
import axios from "axios";
import {connect} from "react-redux";

var abc = {backgroundImage: '../images/cover_bg_1.jpg'};

var color = {color:"black"}

var date = new Date();
date.setDate(date.getDate()-1,'YYYY-MM-DD');

var nowDate = new Date();
var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0)

class NewerHomePage extends Component {

  constructor (props) {
    super(props)
    this.state = {
        isLoggedIn: false,
        message: '',
        username: '',
        showLoginModal: false,
        showSignupModal: false,
        isUser:true,
        date: "2017-11-21",
        startDate :  moment(this.props.minDate, 'DD/MM/YYYY'),
        format: "YYYY-MM-DD",
        inputFormat: "DD/MM/YYYY",
        mode: "date",
        fromCity : [],
        toCity : [],
        selectedFrom : this.props.select.selectedFrom,
        selectedTo:this.props.select.selectedTo,
        goingDate : new Date(),
        comingDate : new Date(),
        selectedClass:'',
        noAdults:0,
        noChild:0,
    }
  }

    componentWillMount(){

        var self=this;
        console.log("in store ",this.props.select);
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
                    console.log(this.state.message);

                }

            })
    };

    handleChange = (newDate) => {
        //alert(newDate)
        return this.setState({goingDate: newDate});
    };

    handleChange1 = (newDate) => {
        //alert(newDate);
        return this.setState({comingDate: newDate});
    };

    searchFlight = () => {
      console.log(this.props.select);
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
              })
              .catch(function (error) {
                  console.log(error);
              });
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
                                                               data-toggle="tab">Packages</a>
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
                                                                                this.state.fromCity.map(city=>
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
                                                                                onChange={(event)=>{this.props.setSelectedTo(event.target.value);this.setState({selectedTo:event.target.value})}}  className="cs-select cs-skin-border" name="" id="selectedTo">
                                                                            <option style={color} name="" id="">City</option>
                                                                            {
                                                                                this.state.toCity.map(city=>
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
                                                                            <DateTimeField  mode="date"
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
                                                                               id="from-place"
                                                                               placeholder="Los Angeles, USA"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                    <div className="input-field">
                                                                        <label for="date-start">Return:</label>
                                                                        <input type="text" className="form-control"
                                                                               id="date-start"
                                                                               placeholder="mm/dd/yyyy"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                    <div className="input-field">
                                                                        <label for="date-end">Check Out:</label>
                                                                        <input type="text" className="form-control"
                                                                               id="date-end" placeholder="mm/dd/yyyy"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-12 mt">
                                                                    <section>
                                                                        <label for="className">Rooms:</label>
                                                                        <select className="cs-select cs-skin-border">
                                                                            <option value="" disabled selected>1
                                                                            </option>
                                                                            <option value="economy">1</option>
                                                                            <option value="first">2</option>
                                                                            <option value="business">3</option>
                                                                        </select>
                                                                    </section>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <section>
                                                                        <label for="className">Adult:</label>
                                                                        <select className="cs-select cs-skin-border">
                                                                            <option value="" disabled selected>1
                                                                            </option>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                        </select>
                                                                    </section>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <section>
                                                                        <label for="className">Children:</label>
                                                                        <select className="cs-select cs-skin-border">
                                                                            <option value="" disabled selected>1
                                                                            </option>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                        </select>
                                                                    </section>
                                                                </div>
                                                                <div className="col-xs-12">
                                                                    <input type="submit"
                                                                           className="btn btn-primary btn-block"
                                                                           value="Search Hotel"/>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div role="tabpanel" className="tab-pane" id="packages">
                                                            <div className="row">
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <div className="input-field">
                                                                        <label for="from">City:</label>
                                                                        <input type="text" className="form-control"
                                                                               id="from-place"
                                                                               placeholder="Los Angeles, USA"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <div className="input-field">
                                                                        <label for="from">Destination:</label>
                                                                        <input type="text" className="form-control"
                                                                               id="to-place"
                                                                               placeholder="Tokyo, Japan"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                    <div className="input-field">
                                                                        <label for="date-start">Departs:</label>
                                                                        <input type="text" className="form-control"
                                                                               id="date-start"
                                                                               placeholder="mm/dd/yyyy"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                    <div className="input-field">
                                                                        <label for="date-end">Return:</label>
                                                                        <input type="text" className="form-control"
                                                                               id="date-end" placeholder="mm/dd/yyyy"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-12 mt">
                                                                    <section>
                                                                        <label for="className">Rooms:</label>
                                                                        <select className="cs-select cs-skin-border">
                                                                            <option value="" disabled selected>1
                                                                            </option>
                                                                            <option value="economy">1</option>
                                                                            <option value="first">2</option>
                                                                            <option value="business">3</option>
                                                                        </select>
                                                                    </section>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <section>
                                                                        <label for="className">Adult:</label>
                                                                        <select className="cs-select cs-skin-border">
                                                                            <option value="" disabled selected>1
                                                                            </option>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                        </select>
                                                                    </section>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <section>
                                                                        <label for="className">Children:</label>
                                                                        <select className="cs-select cs-skin-border">
                                                                            <option value="" disabled selected>1
                                                                            </option>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                        </select>
                                                                    </section>
                                                                </div>
                                                                <div className="col-xs-12">
                                                                    <input type="submit"
                                                                           className="btn btn-primary btn-block"
                                                                           value="Search Packages"/>
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

                    <Route exact path="/adminhome" render={() => (
                        <div>
                            <AdminHomePage/>
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
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NewerHomePage));
