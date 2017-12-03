import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../../api/API';
import ReactStars from 'react-stars'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import Message from '../Message';

var DateTimeField = require('react-bootstrap-datetimepicker');



class AdminAddHotels extends Component {
    static propTypes = {};

    state = {
        message:'',
        name: '',
        street:'',
        city: '',
        state: '',
        stars:'',
        freebies:'',
        type: '',
        total_rooms:'',
        rent: ''
    };

    adminAddHotels = (hoteldata) => {

        if(this.state.name==="" || this.state.street==="" || this.state.city==="" || this.state.state==="" || this.state.stars==="" || this.state.freebies==="" || this.state.type==="" || this.state.total_rooms==="" || this.state.rent==="")
            alert("Please add all the fields");

        else {
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
                    }
                    else{
                        this.setState({
                            message: "Data couldn't be added. Try Adding details Again!"
                        });
                    }

                })
        }
    };

    componentWillMount() {
        this.setState({
            message:'',
            name: '',
            street:'',
            city: '',
            state: '',
            stars:'',
            freebies:'',
            type: '',
            total_rooms:'',
            rent: ''

        });
    }
    handleChange = (newDate) => {
        console.log("newDate", newDate);
        return this.setState({date: newDate});
    };

    ratingChanged = (newRating) => {
        console.log(newRating)
      this.setState({stars:newRating});
    }

    freebiesChanged = (newFreebies) => {
        this.setState({
            freebies: newFreebies
        });
    }

    render() {
        const {date, format, mode, inputFormat} = this.state;
        return (
            <div className="fh5co-hero">
                <div className="container">
                    <div className="col-sm-12 col-md-12"><hr/><br/></div>
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
                                            label="name"
                                            placeholder="Enter hotel name"
                                            value={this.state.name}
                                            required
                                            onChange={(event) => {
                                                this.setState({
                                                    name: event.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Hotel City</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <input
                                        className="form-control"
                                        type="text"
                                        label="city"
                                        placeholder="Enter hotel city"
                                        value={this.state.city}
                                        onChange={(event) => {
                                            this.setState({
                                                city: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Star Ratings</label></div>
                                <div className="col-sm-8 col-md-8">

                                        <ReactStars count={5} onChange={this.ratingChanged} size={24} color2={'#ffd700'} />


                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Hotel Rent</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <input
                                        className="form-control"
                                        type="number"
                                        label="rent"
                                        min="1"
                                        max="1000"
                                        placeholder="Enter hotel rent"
                                        value={this.state.rent}
                                        onChange={(event) => {
                                            this.setState({
                                                rent: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Hotel Type</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <input
                                        className="form-control"
                                        type="text"
                                        label="type"
                                        placeholder="Enter hotel type"
                                        value={this.state.type}
                                        onChange={(event) => {
                                            this.setState({
                                                type: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <br/>
                        </div>
                        <br/>

                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                            </div>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Hotel Street</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <input
                                        className="form-control"
                                        type="text"
                                        label="street"
                                        placeholder="Enter hotel street"
                                        value={this.state.street}
                                        onChange={(event) => {
                                            this.setState({
                                                street: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Hotel State</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <input
                                        className="form-control"
                                        type="text"
                                        label="state"
                                        placeholder="Enter hotel state"
                                        value={this.state.state}
                                        onChange={(event) => {
                                            this.setState({
                                                state: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Hotel Freebies</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <CheckboxGroup
                                        checkboxDepth={2}
                                        name="freebies"
                                        value={this.state.freebies}
                                        onChange={this.freebiesChanged}>

                                        <Checkbox value="free breakfast"/> Free Breakfast
                                      <Checkbox value="free wifi"/> Free Wifi
                                        <Checkbox value="free parking"/> Free Parking
                                       <Checkbox value="free internet"/> Free Internet
                                        <Checkbox value="free airport shuttle"/> Free Airport Shuttle
                                        <Checkbox value="free cancellation"/> Free Cancellation
                                    </CheckboxGroup>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Total Rooms</label></div>
                                <div className="col-sm-8 col-md-8">
                                    <input
                                        className="form-control"
                                        type="number"
                                        label="total_rooms"
                                        min="0"
                                        max="1000"
                                        placeholder="Enter hotel total rooms"
                                        value={this.state.total_rooms}
                                        onChange={(event) => {
                                            this.setState({
                                                total_rooms: event.target.value
                                            });
                                        }}
                                    />

                                </div>
                            </div>
                            <br/>
                        </div>
                            <div className="col-sm-6 col-md-6">

                                <div className="input-field">
                                    <button
                                        className="btn btn-warning"
                                        type="button"
                                        onClick={() => this.adminAddHotels(this.state)}>
                                        Add Hotels
                                    </button>
                                </div>
                                <br/>
                            </div>
                        <div className="col-sm-12 col-md-12">
                            <Message message={this.state.message}/>

                        </div>

                    </div>
                </div>

        );
    }
}

export default withRouter(AdminAddHotels);
