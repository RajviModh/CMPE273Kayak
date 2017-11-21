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


var abc = {backgroundImage: '../images/cover_bg_1.jpg'};

var color = {color:"black"}

var date = new Date();
date.setDate(date.getDate()-1,'YYYY-MM-DD');

var nowDate = new Date();
var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0)

class NewerHomePage extends Component {

    logChange = (val) => {
        console.log('Selected: ', val);
    }

    static propTypes = {
        minDate: PropTypes.object
    }

    componentWillMount(){
       //alert(today)
    }

    state = {
        isLoggedIn: false,
        message: '',
        username: '',
        showLoginModal: false,
        showSignupModal: false,
        isUser:true,
        fromCity : ['SFO','SJC','LAX'],
        selectedFrom : '',
        toCity : ['a','b','c'],
        selectedTo:'',
        date: "2017-11-21",
        startDate :  moment(this.props.minDate, 'DD/MM/YYYY'),
        format: "YYYY-MM-DD",
        inputFormat: "DD/MM/YYYY",
        mode: "date",
        goingDate : ''
    };

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
        alert(newDate);
        return this.setState({date: newDate});
    };

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
                                                                                onChange={(event)=>this.setState({selectedFrom:event.target.value})}  className="cs-select cs-skin-border" name="" id="">
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
                                                                                onChange={(event)=>this.setState({selectedTo:event.target.value})}  className="cs-select cs-skin-border" name="" id="">
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
                                                                        <label for="date-start">Check In:</label>
                                                                        <div className="input-field">
                                                                            <DateTimeField  mode="date"
                                                                                            dateTime={this.state.date}
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
                                                                        <label for="date-end">Check Out:</label>
                                                                        <input type="text" className="form-control"
                                                                               id="date-end" placeholder="mm/dd/yyyy"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-12 mt">
                                                                    <section>
                                                                        <label for="class">Class:</label>
                                                                        <select className="cs-select cs-skin-border">
                                                                            <option value="" disabled selected>Economy
                                                                            </option>
                                                                            <option value="economy">Economy</option>
                                                                            <option value="first">First</option>
                                                                            <option value="business">Business</option>
                                                                        </select>
                                                                    </section>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <section>
                                                                        <label for="class">Adult:</label>
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
                                                                        <label for="class">Children:</label>
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
                                                                           value="Search Flight"/>
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

export default withRouter(NewerHomePage);