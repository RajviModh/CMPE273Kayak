import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../../api/API';

class AdminAddCars extends Component {

    state = {
        car_id: '',
        car_type: '',
        car_name: '',
        no_of_people:'',
        no_of_bags:'',
        no_of_doors: '',
        car_owner: '',
        car_location: ''
    };
    adminAddCars = (cardata) => {
        alert("in AdminAdd cars react" + JSON.stringify(cardata));
        API.adminAddCars(cardata)
            .then((res) => {
                alert("back in AdminAdd cars react response : " + JSON.stringify(res));
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
            car_id: '',
            car_type: '',
            car_name: '',
            no_of_people:'',
            no_of_bags:'',
            no_of_doors: '',
            car_owner: '',
            car_location: ''
        });
    }
    render() {
        return (
            <div className="fh5co-hero">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                            </div>

                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Car Id</label></div>
                                <div className="col-sm-8 col-md-8">
                                    <div className="input-field">

                                        <input
                                            className="form-control"
                                            type="text"
                                            label="carId"
                                            placeholder="Enter Car Id"
                                            value={this.state.car_id}
                                            onChange={(event) => {
                                                this.setState({
                                                    car_id: event.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <br/>


                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Car Type</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <input
                                        className="form-control"
                                        type="text"
                                        label="carType"
                                        placeholder="Enter car type"
                                        value={this.state.car_type}
                                        onChange={(event) => {
                                            this.setState({
                                                car_type: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </div>

                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Car Location</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <input
                                        className="form-control"
                                        type="text"
                                        label="carLocation"
                                        placeholder="Enter car location"
                                        value={this.state.car_location}
                                        onChange={(event) => {
                                            this.setState({
                                                car_location: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Number Of Bags</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <input
                                        className="form-control"
                                        type="text"
                                        label="numberOfBags"
                                        placeholder="Enter number of bags"
                                        value={this.state.no_of_bags}
                                        onChange={(event) => {
                                            this.setState({
                                                no_of_bags: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                            </div>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Car Name</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <input
                                        className="form-control"
                                        type="text"
                                        label="carName"
                                        placeholder="Enter car name"
                                        value={this.state.car_name}
                                        onChange={(event) => {
                                            this.setState({
                                                car_name: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Car Owner</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <input
                                        className="form-control"
                                        type="text"
                                        label="carOwner"
                                        placeholder="Enter car owner"
                                        value={this.state.car_owner}
                                        onChange={(event) => {
                                            this.setState({
                                                car_owner: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Number Of People</label></div>
                                <div className="col-sm-8 col-md-8">
                                    <input
                                        className="form-control"
                                        type="text"
                                        label="numberOfPeople"
                                        placeholder="Enter number of people"
                                        value={this.state.no_of_people}
                                        onChange={(event) => {
                                            this.setState({
                                                no_of_people: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </div>

                            <br/>

                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Number Of Doors</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <input
                                        className="form-control"
                                        type="text"
                                        label="numberOfDoors"
                                        placeholder="Enter number of doors"
                                        value={this.state.no_of_doors}
                                        onChange={(event) => {
                                            this.setState({
                                                no_of_doors: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className="col-sm-6 col-md-6">

                                <div className="input-field">
                                    <button
                                        className="btn btn-warning"
                                        type="button"
                                        onClick={() => this.adminAddCars(this.state)}>
                                        Add Cars
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
export default withRouter(AdminAddCars);