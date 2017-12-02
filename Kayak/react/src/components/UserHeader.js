import React, {Component,PropTypes} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import axios from "axios";

class UserHeader extends Component{

    state = {
        showLoginModal: false,
        showSignupModal: false,
    };

    close = (data) => {

        if (data === 'login') {
            //alert("in login of close");
            this.setState({showLoginModal: false});
        }
        else if (data === 'signup') {
           // alert("in signup of close");
            this.setState({showSignupModal: false});
        }
    };
    open = (data) => {
        if (data === 'login') {
            //alert("in login of open");
            this.setState({showLoginModal: true});
        }
        else if (data === 'signup') {
            //alert("in signup of open");
            this.setState({showSignupModal: true});
        }
    };

    logout = () => {
        var self=this
        axios.get('http://localhost:3001/logout/logout',{withCredentials:true})
            .then(function (response) {
                console.log("in logout")
                localStorage.removeItem("isLoggedIn")
                localStorage.removeItem("isUser")
                console.log("res", response);
                console.log("res data", response.data);
                self.props.history.push('/')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                    <header id="fh5co-header-section" className="sticky-banner">
                        <div className="container">
                            <div className="nav-header">
                                <a href="#" className="js-fh5co-nav-toggle fh5co-nav-toggle dark"/>
                                <h1 id="fh5co-logo"><a href="index.html"><i className="icon-airplane"/>KAYAK</a></h1>

                                <nav id="fh5co-menu-wrap" role="navigation">
                                    <ul className="sf-menu" id="fh5co-primary-menu">
                                        <li className="active"><a href="/">Home</a></li>
                                        <li><Link to='/flight1'>Flights</Link></li>
                                        <li><Link to='/hotels'>Hotels</Link></li>
                                        <li><a href="car.html">Car</a></li>
                                        <li>
                                            <a href="vacation.html" className="fh5co-sub-ddown">Profile</a>
                                            <ul className="fh5co-sub-menu">
                                                <li><a href="/view_profile">View Profile</a></li>
                                                <li><a href="/edit_profile">Edit Profile</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="vacation.html" className="fh5co-sub-ddown">Bookings</a>
                                            <ul className="fh5co-sub-menu">
                                                <li><a href="/car_bookings">Car</a></li>
                                                <li><a href="/hotel_bookings">Hotel</a></li>
                                                <li><a href="/flight_bookings">Flight</a></li>
                                            </ul>
                                        </li>

                                        <li>
                                            <a href="vacation.html" className="fh5co-sub-ddown">Account</a>
                                            <ul className="fh5co-sub-menu">
                                                <li><button onClick={this.logout}>Logout</button></li>
                                                <li><a href="/edit_profile">Delete My Account</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>

                            </div>
                        </div>
                    </header>
                </div>
                    )

                    }
                    }
                    export default withRouter(UserHeader);