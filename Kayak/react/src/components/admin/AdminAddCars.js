import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../../api/API';
import Message from "../Message";

class AdminAddCars extends Component {

    state = {
        message:'',
        cId: '',
        carModel: '',
        carMake: '',
        carBags:'',
        carType:'',
        carCategory: '',
        carCapacity: '',
        carDoors: '',
        pickupPoint:''
    };
    adminAddCars = (cardata) => {
        if(this.state.carModel==="" || this.state.carMake==="" || this.state.carBags==="" || this.state.carType==="" || this.state.carCategory==="" || this.state.carCapacity==="" || this.state.carDoors==="" || this.state.pickupPoint==="")
            alert("Please add all the fields");

        else {
            // alert("in AdminAdd cars react" + JSON.stringify(cardata));
            API.adminAddCars(cardata)
                .then((res) => {
                    alert("back in AdminAdd cars react response : " + JSON.stringify(res));
                    if (res.status === '201') {
                        this.setState({
                            message: "Data Added successfully",
                            cId: '',
                            carModel: '',
                            carMake: '',
                            carBags: '',
                            pickupPoint: ''
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
            cId: '',
            carModel: '',
            carMake: '',
            carBags:'',
            carType:'',
            carCategory: '',
            carCapacity: '',
            carDoors: '',
            pickupPoint:''
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
                                            placeholder="Enter car id"
                                            value={this.state.cId}
                                            onChange={(event) => {
                                                this.setState({
                                                    cId: event.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <br/>


                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Car Model</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <input
                                        className="form-control"
                                        type="text"
                                        label="carModel"
                                        placeholder="Enter car model"
                                        value={this.state.carModel}
                                        onChange={(event) => {
                                            this.setState({
                                                carModel: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </div>

                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Car Doors</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <select name="select" onChange={(event) => {
                                        this.setState({
                                            carDoors: event.target.value
                                        });
                                    }} style={{width: 300}}>
                                        <option>select</option>
                                        <option>2</option>
                                        <option>4</option>
                                    </select>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Car Type</label></div>
                                <div className="col-sm-8 col-md-8">
                                    <select name="select" onChange={(event) => {
                                        this.setState({
                                            carType: event.target.value
                                        });
                                    }} style={{width: 300}}>
                                        <option>select</option>
                                        <option>small</option>
                                        <option>medium</option>
                                        <option>large</option>
                                        <option>SUV</option>
                                        <option>luxury</option>
                                        <option>van</option>
                                        <option>convertible</option>
                                        <option>PickupTruck</option>
                                    </select>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Pickup Point</label></div>
                                <div className="col-sm-8 col-md-8">
                                    <input
                                        className="form-control"
                                        type="text"
                                        label="pickupPoint"
                                        placeholder="Enter pickup point"
                                        value={this.state.pickupPoint}
                                        onChange={(event) => {
                                            this.setState({
                                                pickupPoint: event.target.value
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
                                <div className="col-sm-4 col-md-4"><label>Car Make</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <input
                                        className="form-control"
                                        type="text"
                                        label="carMake"
                                        placeholder="Enter car make"
                                        value={this.state.carMake}
                                        onChange={(event) => {
                                            this.setState({
                                                carMake: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Car Capacity</label></div>
                                <div className="col-sm-8 col-md-8">
                                    <select name="select" onChange={(event) => {
                                        this.setState({
                                            carCapacity: event.target.value
                                        });
                                    }} style={{width: 300}}>
                                        <option>select</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                    </select>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Number Of Bags</label></div>
                                <div className="col-sm-8 col-md-8">


                                    <select name="select" onChange={(event) => {
                                        this.setState({
                                            carBags: event.target.value
                                        });
                                    }} style={{width: 300}}>
                                        <option>select</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                            </div>

                            <br/>

                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Car Category</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <select name="select" onChange={(event) => {
                                        this.setState({
                                            carCategory: event.target.value
                                        });
                                    }} style={{width: 300}}>
                                        <option>select</option>
                                        <option>economy</option>
                                        <option>compact</option>
                                        <option>intermediate</option>
                                        <option>standard</option>
                                    </select>
                                </div>
                            </div>
                            <br/>
                        </div>
                            <div className="col-sm-6 col-md-6">

                                <div className="input-field">
                                    <button
                                        className="btn btn-warning"
                                        type="button"
                                        onClick={() => this.adminAddCars(this.state)}>
                                        Add Cars
                                    </button>
                                </div>
                                <br/>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <Message message={this.state.message} />
                            </div>
                        </div>
                    </div>
                </div>

                );
    }
}
export default withRouter(AdminAddCars);