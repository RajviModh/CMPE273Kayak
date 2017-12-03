import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../../api/API';
import TimePicker from 'react-bootstrap-time-picker';
import Message from "../Message";

var DateTimeField = require('react-bootstrap-datetimepicker');


class AdminAddFlights extends Component {
    static propTypes = {};

    state = {
        message:'',
        flightId: '',
        airlineName:'',
        flightSource:'',
        flightDestination:'',
        firstClassFare: '',
        buisnessFare:'',
        economyFare:'',
        firstClassChildFare: '',
        buisnessChildFare:'',
        economyChildFare:'',
        capacityFirstClass: '',
        capacityBuisness:'',
        capacityEconomy:'',
        startTimeHours:'',
        startTimeMinutes:'',
        endTimeHours: '',
        endTimeMinutes: '',
        flightDate:''
        // date: "2017-06-05",
        // format: "YYYY-MM-DD",
        // inputFormat: "DD/MM/YYYY",
        // mode: "date",


    };
    AddFlights = (flightdata) => {
        if(this.state.flightId==="" || this.state.airlineName==="" || this.state.flightSource==="" || this.state.flightDestination==="" || this.state.firstClassFare==="" || this.state.buisnessFare==="" || this.state.economyFare==="" || this.state.firstClassChildFare==="" || this.state.buisnessChildFare===""
            || this.state.economyChildFare==="" || this.state.capacityFirstClass==="" || this.state.capacityBuisness===""|| this.state.capacityEconomy==="" || this.state.startTimeHours==="" || this.state.startTimeMinutes===""|| this.state.endTimeHours==="" || this.state.endTimeMinutes===""|| this.state.flightDate=="")
            alert("Please add all the fields");

        else {
            // alert("in AdminAdd flights react" + JSON.stringify(flightdata));
            API.adminAddFlights(flightdata)
                .then((res) => {
                    alert("back in AdminAdd flights react response : " + JSON.stringify(res));
                    if (res.status === '201') {
                        this.setState({
                            message: "Data Added successfully"
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

                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Flight ID :</label></div>
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

                                <br/>
                        </div>
                        </div>

                        <div className="col-sm-6 col-md-6">

                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Flight Name : </label></div>
                                <div className="col-sm-8 col-md-8">

                                    <div className="input-field">

                                        <input
                                            className="form-control"
                                            type="text"
                                            label="airlineName"
                                            placeholder="Enter Flight Name"
                                            value={this.state.airlineName}
                                            onChange={(event) => {
                                                this.setState({
                                                    airlineName: event.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                </div>

                            </div>
                            <br/>
                        </div>




                        <div className="col-sm-6 col-md-6">

                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Flight Source :</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <div className="input-field">

                                        <input
                                            className="form-control"
                                            type="text"
                                            label="flightSource"
                                            placeholder="Enter Flight Source"
                                            value={this.state.flightSource}
                                            onChange={(event) => {
                                                this.setState({
                                                    flightSource: event.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                </div>

                            </div>

                            <br/>
                        </div>

                        <div className="col-sm-6 col-md-6">

                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Flight Destination :</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <div className="input-field">

                                        <input
                                            className="form-control"
                                            type="text"
                                            label="flightDestination"
                                            placeholder="Enter Flight Destination"
                                            value={this.state.flightDestination}
                                            onChange={(event) => {
                                                this.setState({
                                                    flightDestination: event.target.value
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
                                <div className="col-sm-4 col-md-4"><label>Flight Date :</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <select name="select" onChange={(event) => {
                                        this.setState({
                                            flightDate: event.target.value
                                        });
                                    }} style={{width: 150}}>
                                        <option value="0">Sunday</option>
                                        <option value="1">Monday</option>
                                        <option value="2">Tuesday</option>
                                        <option value="3">Wednesday</option>
                                        <option value="4">Thursday</option>
                                        <option value="5">Friday</option>
                                        <option value="6">Saturday</option>
                                    </select>

                                {/*    <div className="input-field">
                                        <DateTimeField  mode="date"
                                                        dateTime={date}
                                                        defaultText="Enter flight date"
                                                        daysOfWeekDisabled={[0]}
                                                        format={format}
                                                        viewMode={mode}
                                                        inputFormat={inputFormat}
                                                        onChange={this.handleChange}/>

                                    </div>*/}
                                </div>
                            </div>
                            <br/>
                        </div>

                        <div className="col-sm-4 col-md-4">

                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>Start Time : </label></div>
                                <div className="col-sm-8 col-md-8">

                                            <div className="input-field">
                                                <select name="select" onChange={(event) => {
                                                    this.setState({
                                                        startTimeHours: event.target.value
                                                    });
                                                }} style={{width: 150}}>
                                                    <option disabled={true} checked={true}>select</option>
                                                    <option >0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
                                                    <option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option>
                                                    <option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option>
                                                    <option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option>
                                                </select>
                                                <select name="select" onChange={(event) => {
                                                    this.setState({
                                                        startTimeMinutes: event.target.value
                                                    });
                                                }} style={{width: 150}}>
                                                    <option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
                                                    <option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option>
                                                    <option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option>
                                                    <option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option>
                                                    <option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option>
                                                    <option>30</option><option>31</option><option>32</option><option>33</option><option>34</option><option>35</option>
                                                    <option>36</option><option>37</option><option>38</option><option>39</option><option>40</option><option>41</option>

                                                    <option>42</option><option>43</option><option>44</option><option>45</option><option>46</option><option>47</option>
                                                    <option>48</option><option>49</option><option>50</option><option>51</option><option>52</option><option>53</option>

                                                    <option>54</option><option>55</option><option>56</option><option>57</option><option>57</option><option>58</option>
                                                    <option>59</option>



                                                </select>

                                </div>
                            </div>
                            <br/>
                        </div>
                        </div>

                        <div className="col-sm-4 col-md-4">

                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>End Time :</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <div className="input-field">
                                        <select name="select" onChange={(event) => {
                                            this.setState({
                                                endTimeHours: event.target.value
                                            });
                                        }} style={{width: 150}}>
                                            <option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
                                            <option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option>
                                            <option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option>
                                            <option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option>
                                        </select>
                                        <select name="select" onChange={(event) => {
                                            this.setState({
                                                endTimeMinutes: event.target.value
                                            });
                                        }} style={{width: 150}}>
                                            <option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
                                            <option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option>
                                            <option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option>
                                            <option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option>
                                            <option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option>
                                            <option>30</option><option>31</option><option>32</option><option>33</option><option>34</option><option>35</option>
                                            <option>36</option><option>37</option><option>38</option><option>39</option><option>40</option><option>41</option>

                                            <option>42</option><option>43</option><option>44</option><option>45</option><option>46</option><option>47</option>
                                            <option>48</option><option>49</option><option>50</option><option>51</option><option>52</option><option>53</option>

                                            <option>54</option><option>55</option><option>56</option><option>57</option><option>57</option><option>58</option>
                                            <option>59</option>



                                        </select>

                                    </div>
                                </div>
                                <br/>
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
                                        type="number"
                                        min="1"
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
                                            type="number"
                                            min="1"
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
                                <div className="col-sm-4 col-md-4"><label>Economy Child Fare :</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <div className="input-field">
                                        <input
                                            className="form-control"
                                            type="number"
                                            min="1"
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

                        <div className="col-sm-4 col-md-4">

                            <div className="row">
                                <div className="col-sm-4 col-md-4"><label>First Class Child Fare :</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <div className="input-field">
                                        <input
                                            className="form-control"
                                            type="number"
                                            min="1"
                                            label="firstClassChildFare"
                                            placeholder="Enter First Class Child fare"
                                            value={this.state.firstClassChildFare}
                                            onChange={(event) => {
                                                this.setState({
                                                    firstClassChildFare: event.target.value
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
                                <div className="col-sm-4 col-md-4"><label>Buisness Child Fare :</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <div className="input-field">
                                        <input
                                            className="form-control"
                                            type="number"
                                            min="1"
                                            label="buisnessChildFare"
                                            placeholder="Enter Buisness Child fare"
                                            value={this.state.buisnessChildFare}
                                            onChange={(event) => {
                                                this.setState({
                                                    buisnessChildFare: event.target.value
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
                                <div className="col-sm-4 col-md-4"><label>Economy Child Fare :</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <div className="input-field">
                                        <input
                                            className="form-control"
                                            type="number"
                                            min="1"
                                            label="economyChildFare"
                                            placeholder="Enter Economy Child fare"
                                            value={this.state.economyChildFare}
                                            onChange={(event) => {
                                                this.setState({
                                                    economyChildFare: event.target.value
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
                                <div className="col-sm-4 col-md-4"><label>First Class Capacity :</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <div className="input-field">
                                        <input
                                            className="form-control"
                                            type="number"
                                            min="1"
                                            label="capacityFirstClass"
                                            placeholder="Enter capacity of First Class"
                                            value={this.state.capacityFirstClass}
                                            onChange={(event) => {
                                                this.setState({
                                                    capacityFirstClass: event.target.value
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
                                <div className="col-sm-4 col-md-4"><label>Buisness Class Capacity :</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <div className="input-field">
                                        <input
                                            className="form-control"
                                            type="number"
                                            min="1"
                                            label="capacityBuisness"
                                            placeholder="Enter capacity of Buisness Class"
                                            value={this.state.capacityBuisness}
                                            onChange={(event) => {
                                                this.setState({
                                                    capacityBuisness: event.target.value
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
                                <div className="col-sm-4 col-md-4"><label>Economy Class Capacity :</label></div>
                                <div className="col-sm-8 col-md-8">

                                    <div className="input-field">
                                        <input
                                            className="form-control"
                                            type="number"
                                            min="1"
                                            label="capacityEconomy"
                                            placeholder="Enter capacity of Economy Class"
                                            value={this.state.capacityEconomy}
                                            onChange={(event) => {
                                                this.setState({
                                                    capacityEconomy: event.target.value
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
                                <br/>
                            </div>
                        <div className="col-sm-12 col-md-12">
                                <Message message={this.state.message}/>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AdminAddFlights);