import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../api/API';
import {DropdownMenu, MenuItem} from 'react-bootstrap-dropdown-menu';
import Login from "./Login";
import Message from "./Message";
import UserHeader from "./UserHeader";
import AdminHeader from "./AdminHeader";
import UserFooter from "./UserFooter";
import AdminHomePage from "./admin/AdminHomePage";
import AdminAddHotels from "./admin/AdminAddHotels";
import AdminAddFlights from "./admin/AdminAddFlights";
import Welcome from "./Welcome";
import {connect} from "react-redux";
//import '../css/style.css';
//import '../css/bootstrap.css';
import Signup from "./Signup";
import {Modal} from 'react-bootstrap';
import Hotels from "./Hotels";

var abc = {backgroundImage: '../images/cover_bg_1.jpg'};


class NewerHomePage extends Component {

    /*state = {
        isLoggedIn: false,
        message: '',
        username: '',
        showLoginModal: false,
        showSignupModal: false,
        isUser:false

    };*/

    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((res) => {
                alert("back in newer homepage : " + JSON.stringify(res));
                if (res.status === '201') {
                    /*this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!",
                        //username: userdata.username
                    });*/

                    this.props.loginChange();
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
                                                                        <input type="text" className="form-control"
                                                                               id="from-place"
                                                                               placeholder="Los Angeles, USA"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt">
                                                                    <div className="input-field">
                                                                        <label for="from">To:</label>
                                                                        <input type="text" className="form-control"
                                                                               id="to-place"
                                                                               placeholder="Tokyo, Japan"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                    <div className="input-field">
                                                                        <label for="date-start">Check In:</label>
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

const mapDispatchToProps = (dispatch) => {
    return{

        loginChange: () => {
            dispatch({
                type: "CHANGELOGIN"
            });
        },

        passChange: (password) => {
            dispatch({
                type: "CHANGEPASS",
                payload : {password:password}
            });
        },

    };
};

const mapStateToProps = (state) => {
    return{
        select: state.userReducer
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NewerHomePage));