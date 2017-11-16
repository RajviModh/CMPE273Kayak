import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';

import '../../css/admin/sb-admin-2.css';
import '../../css/admin/metisMenu.css';
import '../../css/admin/font-awesome.css';


class AdminWelcome extends Component {
    render() {
        return (

            <div className="fh5co-hero">
                <div className="container">
                    <div className="row">
<div className="col-md-4">
    <div id="wrapper">

            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <li className="sidebar-search">
                            <div className="input-group custom-search-form">
                                <input type="text" className="form-control" placeholder="Search..."/>
                                <span className="input-group-btn">
                                <button className="btn btn-default" type="button">
                                    <i className="fa fa-search"/>
                                </button>
                            </span>
                            </div>

                        </li>
                        <li>
                            <a href="#"><i className="fa fa-dashboard fa-fw"/> Dashboard</a>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-bar-chart-o fa-fw"/> Add<span className="fa arrow"/></a>
                            <ul className="nav nav-second-level">
                                <li>
                                    <a href="#">Add Hotels</a>
                                </li>
                                <li>
                                    <a href="#">Add Flights</a>
                                </li>
                                <li>
                                    <a href="#">Add Cars</a>
                                </li>
                            </ul>

                        </li>
                        <li>
                            <a href="#"><i className="fa fa-table fa-fw"/> User</a>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-edit fa-fw"/> Forms</a>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-wrench fa-fw"/> Search<span className="fa arrow"/></a>
                            <ul className="nav nav-second-level">
                                <li>
                                    <a href="#">Search Hotels</a>
                                </li>
                                <li>
                                    <a href="#">Search Flights</a>
                                </li>
                                <li>
                                    <a href="#">Search Cars</a>
                                </li>
                                <li>
                                    <a href="#">Search Bills <span className="fa arrow"/></a>
                                    <ul className="nav nav-third-level">
                                        <li>
                                            <a href="#">By Date</a>
                                        </li>
                                        <li>
                                            <a href="#">By Month</a>
                                        </li>
                                    </ul>
                                    {/*<!-- /.nav-third-level -->*/}
                                </li>
                            </ul>
                            {/*<!-- /.nav-second-level -->*/}
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-sitemap fa-fw"/> Multi-Level Dropdown<span className="fa arrow"/></a>
                            <ul className="nav nav-second-level">
                                <li>
                                    <a href="#">Second Level Item</a>
                                </li>
                                <li>
                                    <a href="#">Second Level Item</a>
                                </li>
                            </ul>
                            {/*<!-- /.nav-second-level -->*/}
                        </li>
                    </ul>
                </div>
                {/*<!-- /.sidebar-collapse -->*/}
            </div>

</div>
</div>

            </div>
                </div>
            </div>

        )
    }

}
export default withRouter(AdminWelcome);