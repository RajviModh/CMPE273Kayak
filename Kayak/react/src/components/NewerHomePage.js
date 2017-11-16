import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import * as API from '../api/API';
import {DropdownMenu, MenuItem} from 'react-bootstrap-dropdown-menu';
import Login from "./Login";
import Message from "./Message";
import Welcome from "./Welcome";
//import '../css/style.css';
//import '../css/bootstrap.css';
import Signup from "./Signup";
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";

var abc = {backgroundImage: '../images/cover_bg_1.jpg'};


class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: '',
        showLoginModal: false,
        showSignupModal: false
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
                                        <li><a href="hotel.html">Hotel</a></li>
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
                            </div>
                        </div>
                    </header>

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


                    <div>
                        <Modal show={this.state.showLoginModal} onHide={() => {
                            this.close('login')
                        }}>
                            {/* <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>*/}
                            <Modal.Body>
                                <Login handleSubmit={this.handleSubmit}/>
                                <Message message={this.state.message}/>
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
                                <Message message={this.state.message}/>
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

                    <footer>
                        <div id="footer">
                            <div className="container">
                                <div className="row row-bottom-padded-md">
                                    <div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                                        <h3>About Travel</h3>
                                        <p>Far far away, behind the word mountains, far from the countries Vokalia and
                                            Consonantia, there live the blind texts.</p>
                                    </div>
                                    <div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                                        <h3>Top Flights Routes</h3>
                                        <ul>
                                            <li><a href="#">Manila flights</a></li>
                                            <li><a href="#">Dubai flights</a></li>
                                            <li><a href="#">Bangkok flights</a></li>
                                            <li><a href="#">Tokyo Flight</a></li>
                                            <li><a href="#">New York Flights</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                                        <h3>Top Hotels</h3>
                                        <ul>
                                            <li><a href="#">Boracay Hotel</a></li>
                                            <li><a href="#">Dubai Hotel</a></li>
                                            <li><a href="#">Singapore Hotel</a></li>
                                            <li><a href="#">Manila Hotel</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                                        <h3>Interest</h3>
                                        <ul>
                                            <li><a href="#">Beaches</a></li>
                                            <li><a href="#">Family Travel</a></li>
                                            <li><a href="#">Budget Travel</a></li>
                                            <li><a href="#">Food &amp; Drink</a></li>
                                            <li><a href="#">Honeymoon and Romance</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                                        <h3>Best Places</h3>
                                        <ul>
                                            <li><a href="#">Boracay Beach</a></li>
                                            <li><a href="#">Dubai</a></li>
                                            <li><a href="#">Singapore</a></li>
                                            <li><a href="#">Hongkong</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                                        <h3>Affordable</h3>
                                        <ul>
                                            <li><a href="#">Food &amp; Drink</a></li>
                                            <li><a href="#">Fare Flights</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-md-offset-3 text-center">
                                        <p className="fh5co-social-icons">
                                            <a href="#"><i className="icon-twitter2"/></a>
                                            <a href="#"><i className="icon-facebook2"/></a>
                                            <a href="#"><i className="icon-instagram"/></a>
                                            <a href="#"><i className="icon-dribbble2"/></a>
                                            <a href="#"><i className="icon-youtube"/></a>
                                        </p>
                                        <p>Copyright 2017. All Rights Reserved. <br/>Made with <i
                                            className="icon-heart3"/> by Rajvi</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>

                </div>
            </div>

        );

    }
}

const mapDispatchToProps = (dispatch) => {
    return{

        userChange: (username) => {
            dispatch({
                type: "CHANGEUSER",
                payload : {username:username}
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