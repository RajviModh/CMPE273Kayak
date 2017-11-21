import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../../api/API';

var DateTimeField = require('react-bootstrap-datetimepicker');


class AdminAddHotels extends Component {
    static propTypes = {};

    state = {
        hotelname: '',
        roomtype: '',
        city: '',
        states: '',
        hotelprice: '',
        date: "2017-06-05",
        format: "YYYY-MM-DD",
        inputFormat: "DD/MM/YYYY",
        mode: "date"
    };

    adminAddHotels = (hoteldata) => {
        alert("in AdminAdd hotels react" + JSON.stringify(hoteldata));
        API.adminAddHotels(hoteldata)
            .then((res) => {
                alert("back in AdminAdd hotels react response : " + JSON.stringify(res));
                if (res.status === '201') {
                    this.setState({
                        message: "Added successfully"
                    });

                }
                else if (res.status === '401') {
                    this.setState({
                        message: JSON.stringify(res.errors)
                    });
                    console.log(this.state.message);

                }

            })
    };

    componentWillMount() {
        this.setState({
            hotelname: '',
            roomtype: '',
            city: '',
            state: '',
            hotelprice: ''
        });
    }
    handleChange = (newDate) => {
        console.log("newDate", newDate);
        return this.setState({date: newDate});
    };

    render() {
        const {date, format, mode, inputFormat} = this.state;
        return (
            <div className="fh5co-hero">
                <div className="container">
                    <div className="row justify-content-md-center">

                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                            </div>

                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Hotel Name</label></div>
                                <div className="col-sm-8 col-md-8">
                                    <div className="input-field">

                                        <input
                                            className="form-control"
                                            type="text"
                                            label="hotelname"
                                            placeholder="Enter Hotel name"
                                            value={this.state.hotelname}
                                            onChange={(event) => {
                                                this.setState({
                                                    hotelname: event.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Room Type</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <div className="input-field">
                                        <select name="select" onChange={(event) => {
                                            this.setState({
                                                roomtype: event.target.value
                                            });
                                        }} style={{width: 300}}>
                                            <option>Regular</option>
                                            <option>Deluxe</option>
                                            <option>etc</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>State</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <input
                                        className="form-control"
                                        type="text"
                                        label="state"
                                        placeholder="Enter State"
                                        value={this.state.states}
                                        onChange={(event) => {
                                            this.setState({
                                                states: event.target.value
                                            });
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            <br/>
                        </div>
                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                            </div>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Hotel Price</label></div>
                                <div className="col-sm-8 col-md-8">


                                    <input
                                        className="form-control"
                                        type="text"
                                        label="hotelprice"
                                        placeholder="Enter Hotel price"
                                        value={this.state.hotelprice}
                                        onChange={(event) => {
                                            this.setState({
                                                hotelprice: event.target.value
                                            });
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Date</label></div>
                                <div className="col-sm-8 col-md-8">
                                    <div className="input-field">
                                        <DateTimeField  dateTime={date}
                                                        format={format}
                                                        viewMode={mode}
                                                        inputFormat={inputFormat} onChange={this.handleChange}/>


                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>City</label></div>
                                <div className="col-sm-8 col-md-8">
                                    <div className="input-field">

                                        <input
                                            className="form-control"
                                            type="text"
                                            label="city"
                                            placeholder="Enter City"
                                            value={this.state.city}
                                            onChange={(event) => {
                                                this.setState({
                                                    city: event.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <br/>


                            <div className="col-sm-6 col-md-6">

                                <div className="input-field">
                                    <button
                                        className="btn btn-warning"
                                        type="button"
                                        onClick={() => this.adminAddHotels(this.state)}>
                                        Add Hotels
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AdminAddHotels);
