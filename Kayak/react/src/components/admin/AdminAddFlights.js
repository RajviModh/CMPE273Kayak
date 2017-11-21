import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../../api/API';
import TimePicker from 'react-bootstrap-time-picker';

var DateTimeField = require('react-bootstrap-datetimepicker');


class AdminAddFlights extends Component {
    static propTypes = {};

    state = {
        flightId: '',
        endTime: '',
        firstClassFare: '',
        buisnessFare:'',
        economyFare:'',
        date: "2017-06-05",
        format: "YYYY-MM-DD",
        inputFormat: "DD/MM/YYYY",
        mode: "date",
        startTime:''
    };
    AddFlights = (flightdata) => {
        alert("in AdminAdd flights react" + JSON.stringify(flightdata));
        API.adminAddFlights(flightdata)
            .then((res) => {
                alert("back in AdminAdd flights react response : " + JSON.stringify(res));
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
            flightId: '',
            endTime: '',
            firstClassFare: '',
            buisnessFare:'',
            economyFare:'',
            startTime:''
        });
    }
    handleChange = (newDate) => {
        console.log("newDate", newDate);
        return this.setState({date: newDate});
    };
    /*handleTimeChange = (time) => {
        console.log(time);     // <- prints "3600" if "01:00" is picked
        this.setState({ time });
    };*/

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
                                <div className="col-sm-4 col-md-4"><label>Flight ID : </label></div>
                                <div className="col-sm-8 col-md-8">
                                    <div className="input-field">

                                        <input
                                            className="form-control"
                                            type="text"
                                            label="flightId"
                                            placeholder="Enter Flight ID"
                                            value={this.state.flightId}
                                            onChange={(event) => {
                                                this.setState({
                                                    flightId: event.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Start Time : </label></div>
                                <div className="col-sm-8 col-md-8">

                                    <div className="input-field">
                                        <select name="select" onChange={(event) => {
                                            this.setState({
                                                startTime: event.target.value
                                            });
                                        }} style={{width: 150}}>
                                            <option>0</option>
                                            <option>1</option>
                                            <option>2</option>
                                        </select>

                                        {/*<input type="number" name="time" value={this.state.time} min="0" max="24"/>*/}
                                        {/*<input
                                        type="time" name="time" value={this.state.time}
                                        onChange={(event)=>{this.setState({time:event.target.value})}}
                                        style={{fontSize:24 , width:300, height:35, lineHeight:0.7}} />*/}
                                        {/*<TimePicker onChange={this.handleTimeChange} value={this.state.time}/>*/}
                                        {/*<DateTimeField timeFormat={true} dateFormat={false} viewMode="time" onChange={this.handleTimeChange}/>*/}
                                       {/* <DateTimeField mode="time"
                                                       format={format}
                                                       onChange={this.handleTimeChange}/>*/}

                                    </div>
                                </div>
                            </div>
                            <br/>
                        </div>


                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                            </div>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Flight Date : </label></div>
                                <div className="col-sm-8 col-md-8">


                                    <div className="input-field">
                                        <DateTimeField  mode="date"
                                                        dateTime={date}
                                                        defaultText="Enter flight date"
                                                        daysOfWeekDisabled={[0]}
                                                        format={format}
                                                        viewMode={mode}
                                                        inputFormat={inputFormat}
                                                        onChange={this.handleChange}/>

                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>End Time : </label></div>
                                <div className="col-sm-8 col-md-8">
                                    <div className="input-field">
                                        <select name="select" onChange={(event) => {
                                            this.setState({
                                                endTime: event.target.value
                                            });
                                        }} style={{width: 150}}>
                                            <option>0</option>
                                            <option>1</option>
                                            <option>2</option>
                                        </select>

                                    </div>
                                </div>
                            </div>

                            <br/>
                        </div>
                        <div className="col-sm-4 col-md-4">

                        <div className="row">
                            <div className="col-sm-4 col-md-4"><label>First Class Fare :</label></div>
                            <div className="col-sm-8 col-md-8">

                                <div className="input-field">
                                    <input
                                        className="form-control"
                                        type="text"
                                        label="firstClassFare"
                                        placeholder="Enter First Class fare"
                                        value={this.state.firstClassFare}
                                        onChange={(event) => {
                                            this.setState({
                                                firstClassFare: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                            <br/>
                        </div>

                        <div className="col-sm-4 col-md-4">

                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Buisness Fare :</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <div className="input-field">
                                        <input
                                            className="form-control"
                                            type="text"
                                            label="buisnessFare"
                                            placeholder="Enter Buisness fare"
                                            value={this.state.buisnessFare}
                                            onChange={(event) => {
                                                this.setState({
                                                    buisnessFare: event.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <br/>
                        </div>

                        <div className="col-sm-4 col-md-4">

                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Economy Fare :</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <div className="input-field">
                                        <input
                                            className="form-control"
                                            type="text"
                                            label="economyFare"
                                            placeholder="Enter Economy fare"
                                            value={this.state.economyFare}
                                            onChange={(event) => {
                                                this.setState({
                                                    economyFare: event.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <br/>
                        </div>



                            <div className="col-sm-6 col-md-6">

                                <div className="input-field">
                                    <button
                                        className="btn btn-warning"
                                        type="button"
                                        onClick={() => this.AddFlights(this.state)}>
                                        Add Flights
                                    </button>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AdminAddFlights);