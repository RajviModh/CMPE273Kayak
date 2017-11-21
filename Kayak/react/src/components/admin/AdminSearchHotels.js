import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../../api/API';

class AdminSearchHotels extends Component {
    state = {
        hotelName: '',
        city: '',
        operation:''
    };

    adminSearchHotels = (hoteldata) => {
        alert("in AdminSearch hotels react" + JSON.stringify(hoteldata));
        API.adminSearchHotels(hoteldata)
            .then((res) => {
                alert("back in AdminSearch hotels react response : " + JSON.stringify(res));
                if (res.status === '201') {
                    this.setState({
                        message: "Displayed successfully"
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
            hotelName: '',
            city: '',
            operation:''
        });
    }
    render() {
        return (
            <div className="fh5co-hero">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-sm-4 col-md-4">
                            <div className="col-sm-4 col-md-4">
                            <label>Search By Name</label>
                            </div>
                            <div className="col-sm-8 col-md-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="hotelname"
                                    placeholder="Enter Hotel name"
                                    value={this.state.hotelName}
                                    onChange={(event) => {
                                        this.setState({
                                            hotelName: event.target.value
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-sm-1 col-md-1">
                            <select name="select" onChange={(event) => {
                                this.setState({
                                    operation: event.target.value
                                });
                            }} style={{width: 60}}>
                                <option>And</option>
                                <option>Or</option>
                            </select>
                        </div>
                        <div className="col-sm-4 col-md-4">
                            <div className="col-sm-4 col-md-4">
                                <label>Search By City</label>
                            </div>
                            <div className="col-sm-8 col-md-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="city"
                                    placeholder="Enter city"
                                    value={this.state.city}
                                    onChange={(event) => {
                                        this.setState({
                                            city: event.target.value
                                        });
                                    }}
                                />
                            </div>

                        </div>
                        <div className="col-sm-3 col-md-3">
                            <div className="input-field">
                                <button
                                    className="btn btn-warning"
                                    type="button"
                                    onClick={() => this.adminSearchHotels(this.state)}>
                                    Search Hotels
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(AdminSearchHotels);