import React, {Component,PropTypes} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import axios from "axios";
import logo from '../images/logo.png'
import ChangePassword from "./ChangePassword"
import Modal from 'react-bootstrap-modal';
class UserHeader extends Component{

    state = {
        showLoginModal: false,
        showSignupModal: false,
        showChangeModal : false
    };

    close = (data) => {

        if (data === 'login') {
            //alert("in login of close");
            this.setState({showLoginModal: false});
        }
        else if (data === 'signup') {
            this.setState({showSignupModal: false});
        }
        else if (data === 'passwd') {
            this.setState({showChangeModal: false});
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
        else if (data === 'passwd') {
            this.setState({showChangeModal: true});
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
                //self.props.history.push('/')
                window.location.replace('/');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    delete = () => {
        var self=this
        axios.get('http://localhost:3001/delete/delete',{withCredentials:true})
            .then(function (response) {
                console.log("in delete user")
                localStorage.removeItem("isLoggedIn")
                localStorage.removeItem("isUser")
                console.log("res", response);
                console.log("res data", response.data);
                //self.props.history.push('/')
                alert('You have deleted your account')
                window.location.replace('/');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handlePassword = (userdata) => {

        if(userdata.cpass ==="" || userdata.newpass1==="" || userdata.newpass2===""){
            alert("Please insert all the fields")
        }
        else if(userdata.newpass1!=userdata.newpass2)
        {
            alert("New Password doesn't match")
        }
        else
        {
            axios.get('http://localhost:3001/change/change',{withCredentials:true})
                .then(function (response) {
                    console.log("in change password user")
                    console.log("res", response);
                    console.log("res data", response.data);
                    alert('Psswprd successfully changed')
                    this.close('passwd')
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    render() {
        return (
            <div>

                <div className="container" style={{height:0, margin: 0, marginLeft: 240, marginRight: 240}}>
                    <div className="nav-header" style={{backgroundColor:'black'}}>
                                <a href="#" className="js-fh5co-nav-toggle fh5co-nav-toggle dark"/>
                        <h1 id="fh5co-logo"><a href="#"><img src={logo} style={{height:27, width:126}}/> </a></h1>

                                <nav id="fh5co-menu-wrap" role="navigation">
                                    <ul className="sf-menu" id="fh5co-primary-menu">
                                        <li className="active"><a href="/">Home</a></li>
                                        <li><Link to='/flights_search'>Flights</Link></li>
                                        <li><Link to='/hotels'>Hotels</Link></li>
                                        <li><Link to="/cars">Car</Link></li>
                                        <li>
                                            <a  className="fh5co-sub-ddown">Profile</a>
                                            <ul className="fh5co-sub-menu">
                                                <li><a href="/view_profile">View Profile</a></li>
                                                <li><a href="/edit_profile">Edit Profile</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a className="fh5co-sub-ddown">Bookings</a>
                                            <ul className="fh5co-sub-menu">
                                                <li><a href="/car_bookings">Car</a></li>
                                                <li><a href="/hotel_bookings">Hotel</a></li>
                                                <li><a href="/flight_bookings">Flight</a></li>
                                            </ul>
                                        </li>

                                        <li>
                                            <a  className="fh5co-sub-ddown">Account</a>
                                            <ul className="fh5co-sub-menu">
                                                <li><button onClick={this.logout} className="btn btn-primary btn-block">Logout</button></li>
                                                <br/>
                                                <li><button onClick={() => {if(window.confirm('Delete your account ?')) {this.delete()};}} className="btn btn-primary btn-block">Delete My Account</button></li>
                                                <br/>
                                                <li><button onClick={() => {this.open('passwd')}} className="btn btn-primary btn-block">Change Password</button></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>

                            </div>



                            <div>
                                <Modal show={this.state.showChangeModal} onHide={() => {
                                    this.close('passwd')
                                }}>
                                    <Modal.Body>
                                        <ChangePassword handlePassword={this.handlePassword}/>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <div className="col-sm-10 col-md-10">
                                            <button onClick={() => {
                                                this.close('passwd')
                                            }}>Close
                                            </button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>

                            </div>

                        </div>
                </div>
                    )

                    }
                    }
                    export default withRouter(UserHeader);