import React, {Component,PropTypes} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';

import {Modal} from 'react-bootstrap';
import Login from "./Login";
import Signup from "./Signup";

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
                                                <li><a href="/my_bookings">My Bookings</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="vacation.html" className="fh5co-sub-ddown">Bookings</a>
                                            <ul className="fh5co-sub-menu">
                                                <li><a href="/car_bookings">Car</a></li>
                                                <li><a href="/hotel_booking">Hotel</a></li>
                                                <li><a href="/flight_booking">Flight</a></li>
                                            </ul>
                                        </li>
                                        <li className="active"><a href="/">Logout</a></li>
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