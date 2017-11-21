import React, {Component} from 'react';
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
            <div>
                    <header id="fh5co-header-section" className="sticky-banner">
                        <div className="container">
                            <div className="nav-header">
                                <a href="#" className="js-fh5co-nav-toggle fh5co-nav-toggle dark"/>
                                <h1 id="fh5co-logo"><a href="index.html"><i className="icon-airplane"/>KAYAK</a></h1>

                                <nav id="fh5co-menu-wrap" role="navigation">
                                    <ul className="sf-menu" id="fh5co-primary-menu">
                                        <li className="active"><a href="/">Home</a></li>
                                        <li>
                                            <a href="vacation.html" className="fh5co-sub-ddown">Vacations</a>
                                            <ul className="fh5co-sub-menu">
                                                <li><a href="#">Family</a></li>
                                                <li><a href="#">CSS3 &amp; HTML5</a></li>
                                                <li><a href="#">Angular JS</a></li>
                                                <li><a href="#">Node JS</a></li>
                                                <li><a href="#">Django &amp; Python</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="flight.html">Flights</a></li>
                                        <li><Link to='/hotels'>Hotels</Link></li>
                                        <li><a href="car.html">Car</a></li>
                                        <li><a href="blog.html">Blog</a></li>
                                        <li><a href="contact.html">Contact</a></li>
                                        <li>
                                            <a href='#' className="fh5co-sub-ddown">My Account</a>
                                            <ul className="fh5co-sub-menu">
                                                <li>
                                                    <div>
                                                        <button className="btn btn-warning" onClick={() => {
                                                            this.open('login')
                                                        }}>
                                                            Login
                                                        </button>

                                                        <br/><br/>
                                                        <button className="btn btn-warning" onClick={() => {
                                                            this.open('signup')
                                                        }}>
                                                            Signup
                                                        </button>
                                                    </div>
                                                </li>
                                                <li>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                                <div>
                                    <Modal show={this.state.showLoginModal} onHide={() => {
                                        this.close('login')
                                    }}>
                                        {/* <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>*/}
                                        <Modal.Body>
                                            <Login handleSubmit={this.handleSubmit}/>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <div className="col-sm-5 col-md-5">
                                                Don't have an account?
                                                <button onClick={() => {
                                                    this.close('login')
                                                }}>Close
                                                </button>
                                            </div>
                                        </Modal.Footer>
                                    </Modal>

                                </div>

                                <div>
                                    <Modal show={this.state.showSignupModal} onHide={() => {
                                        this.close('signup')
                                    }}>
                                        {/* <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>*/}
                                        <Modal.Body>
                                            <Signup handleSignUp={this.handleSignUp}/>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <div className="col-sm-5 col-md-5">
                                                Don't have an account?
                                                <button onClick={() => {
                                                    this.close('signup')
                                                }}>Close
                                                </button>
                                            </div>
                                        </Modal.Footer>
                                    </Modal>

                                </div>
                            </div>
                        </div>
                    </header>
                </div>
                    )

                    }
                    }
                    export default withRouter(UserHeader);