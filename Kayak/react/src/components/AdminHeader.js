import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import AdminAddHotels from "./admin/AdminAddHotels";
import AdminAddFlights from "./admin/AdminAddFlights";
import AdminAddCars from "./admin/AdminAddCars";

import AdminSearchHotels from "./admin/AdminSearchHotels";
import AdminSearchFlights from "./admin/AdminSearchFlights";
import AdminSearchCars from "./admin/AdminSearchCars";

import AdminViewUsers from "./admin/AdminViewUsers";


class AdminHeader extends Component{
    render() {
        return (
            <div>
                <header id="fh5co-header-section" className="sticky-banner">
                    <div className="container">
                        <div className="nav-header">
                            <a href="#" className="js-fh5co-nav-toggle fh5co-nav-toggle dark"/>
                            <h1 id="fh5co-logo"><a href="#"><i className="icon-airplane"/>KAYAK</a></h1>

                            <nav id="fh5co-menu-wrap" role="navigation">
                                <ul className="sf-menu" id="fh5co-primary-menu">
                                    <li className="active"><a href="/">Home</a></li>
                                    <li>
                                        <a href="#" className="fh5co-sub-ddown">Add</a>
                                        <ul className="fh5co-sub-menu">
                                            <li><Link to='/adminaddhotels'>Hotels</Link></li>
                                            <li><Link to='/adminaddflights'>Flights</Link></li>
                                            <li><Link to='/adminaddcars'>Cars</Link></li>
                                        </ul>
                                    </li>
                                   <li>
                                       <a href="#" className="fh5co-sub-ddown">Search</a>
                                       <ul className="fh5co-sub-menu">
                                           <li><Link to='/adminsearchhotels'>Hotels</Link></li>
                                           <li><Link to='/adminsearchflights'>Flights</Link></li>
                                           <li><Link to='/adminsearchcars'>Cars</Link></li>
                                       </ul>
                                   </li>
                                    <li>
                                        <a href="#" className="fh5co-sub-ddown">User</a>
                                        <ul className="fh5co-sub-menu">
                                            <li><a href="#">View Users</a></li>
                                            <li><a href="#">Modify Users</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>

                <Route exact path="/adminaddhotels" render={() => (
                    <div>
                        <AdminAddHotels/>
                    </div>
                )}/>
                <Route exact path="/adminaddflights" render={() => (
                    <div>
                        <AdminAddFlights/>
                    </div>
                )}/>
                <Route exact path="/adminaddcars" render={() => (
                    <div>
                        <AdminAddCars/>
                    </div>
                )}/>

                <Route exact path="/adminsearchhotels" render={() => (
                    <div>
                        <AdminSearchHotels/>
                    </div>
                )}/>
                <Route exact path="/adminsearchflights" render={() => (
                    <div>
                        <AdminSearchFlights/>
                    </div>
                )}/>
                <Route exact path="/adminsearchcars" render={() => (
                    <div>
                        <AdminSearchCars/>
                    </div>
                )}/>

            </div>
        )

    }
}
export default withRouter(AdminHeader);