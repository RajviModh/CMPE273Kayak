import React, {Component} from 'react';
import '../css/hotel-style.css';
import '../css/bootstrap.css';
import flight1 from '../images/fb1.png';
import DateTimeField from 'react-bootstrap-datetimepicker';
import {Checkbox} from 'react-bootstrap';

var amount = {border: 0, color:'#ffffff'};
var amount1 ={border: '0', color:'#ffffff'};

var color = {color: "black"}
var colorBlue = {color: "blue"}
var w = {width: 80, height: 40, color: "black"}
var optStyle = {color: "Black", height: 40}
var optStyle1 = {height: 30}
var padding = {padding: 0}
var btnStyle = {height: 40, width: 20}
var btnStyle1 = {height: 30, textAlign: "center"}
var borderStyle = {border: "thin solid #F78536", padding: 0}

const ratingChanged = (newRating) => {
    console.log(newRating)
}

class Flights extends Component {

    state = {
        flightData: [{
            f_id: 'AI-1',
            airline_name: 'Air India',
            fare_e: 1000000,
            fare_child_e: 5,
            capacity_e: 200,
            time_s: '23:23:00',
            time_e: '01:25',
            duration: '2:02:00' },
            {
                f_id: 'AI-2',
                airline_name: 'Indigo',
                fare_e: 250,
                fare_child_e: 20,
                capacity_e: 250,
                time_s: '00:00',
                time_e: '02:00',
                duration: '2:00'
            },
            {
                f_id: 'AI-3',
                airline_name: 'Indigo',
                fare_e: 250,
                fare_child_e: 20,
                capacity_e: 250,
                time_s: '00:00',
                time_e: '02:00',
                duration: '2:00'
            },
            {
                f_id: 'AI-4',
                airline_name: 'Indigo',
                fare_e: 250,
                fare_child_e: 20,
                capacity_e: 250,
                time_s: '00:00',
                time_e: '02:00',
                duration: '2:00'
            },
            {
                f_id: 'AI-5',
                airline_name: 'Indigo',
                fare_e: 250,
                fare_child_e: 20,
                capacity_e: 250,
                time_s: '00:00',
                time_e: '02:00',
                duration: '2:00'
            },
            {
                f_id: 'AI-248',
                airline_name: 'Indigo',
                fare_e: 250,
                fare_child_e: 20,
                capacity_e: 250,
                time_s: '00:00',
                time_e: '02:00',
                duration: '2:00'
            }

        ],
        fromCity: ['SFO', 'SJC', 'LAX'],
        toCity: ['SFO', 'SJC', 'LAX'],
        selectedFrom: '',
        selectedTo: '',
        goingDate: new Date(),
        comingDate: new Date(),
        selectedClass: '',
        noAdults: 0,
        noChild: 0,
        return_enable: false
    };

    componenetWillMount(){
        this.setState({

        });
    }



    render() {
        return (
            <div>

                {/*<div>
                    {this.state.flightData.map(flight=>
                        <div className="col-md-9 search-grid-right">
                                <div className="col-md-3 hotel-left-one">
                                    <a href="single.html"><img src={hotel1} alt="hi" /></a>
                                </div>
                                <div className="col-md-6">
                                    <span className="glyphicon glyphicon-bed" aria-hidden="true"></span>{flight.f_id}
                                    <span className="dot-inner" aria-hidden="true"> &nbsp; {flight.time_s}----{flight.time_e}</span>
                                    <span>Duration : {flight.duration} Hours</span>
                                </div>
                                <div className="col-md-3 text-right">
                                    <h4>$ {flight.fare_e}</h4>
                                    <p>Economy Price</p>
                                    <a href="single.html">Book</a>
                                </div>
                            </div>
                    )}
                </div>*/}
                {/* <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="flights">
                        <div className="row">
                            <div className="col-xs-2 mt" style={padding}>
                                <div className="input-field">
                                    <select style={optStyle}
                                            onChange={(event)=>this.setState({selectedFrom:event.target.value})}  className="cs-select cs-skin-border" name="" id="">
                                        <option style={color} name="" id="">From City</option>
                                        {
                                            this.state.fromCity.map(city=>
                                                <option style={color} value={city}>{city}</option>

                                            )
                                        }

                                    </select>

                                    &nbsp; &nbsp;

                                    <select style={optStyle}
                                            onChange={(event)=>this.setState({selectedTo:event.target.value})}  className="cs-select cs-skin-border" name="" id="">
                                        <option style={color} name="" id="">To City</option>
                                        {
                                            this.state.toCity.map(city=>
                                                <option style={color} value={city}>{city}</option>

                                            )
                                        }

                                    </select>

                                </div>
                            </div>

                            <div className="col-xs-2 mt" style={padding}>
                                <div className="input-field">

                                    <div className="input-field">
                                        <DateTimeField  mode="date"
                                                        style={optStyle1}
                                                        dateTime={this.state.goingDate}
                                                        minDate={this.state.startDate}
                                                        defaultText="Departure Date"
                                                        format={this.state.format}
                                                        viewMode={this.state.mode}
                                                        inputFormat={this.state.inputFormat}
                                                        onChange={this.handleChange}/>

                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-2 mt" style={padding}>
                                <div className="input-field">

                                    <div className="input-field">
                                        <DateTimeField  mode="date"
                                                        dateTime={this.state.comingDate}
                                                        minDate={this.state.startDate}
                                                        defaultText="Arrival Date"
                                                        format={this.state.format}
                                                        viewMode={this.state.mode}
                                                        inputFormat={this.state.inputFormat}
                                                        onChange={this.handleChange1}/>

                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-3 mt" style={padding}>

                                    <select className="cs-select cs-skin-border">
                                                                            <option value="" disabled selected>Economy
                                                                            </option>
                                                                            <option value="economy">Economy</option>
                                                                            <option value="first">First</option>
                                                                            <option value="business">Business</option>

                                    <select style={optStyle}
                                            onChange={(event)=>this.setState({selectedClass:event.target.value})}  className="cs-select cs-skin-border" name="" id="">
                                        <option style={color} value="class">Class</option>
                                        <option style={color} value="economy">Economy</option>
                                        <option style={color} value="first">First</option>
                                        <option style={color} value="business">Business</option>
                                    </select>

                                    &nbsp; &nbsp;
                                    <input placeholder="Adult" style={w} type='number' onChange={(event) => {
                                        this.setState({
                                            noAdults: event.target.value
                                        });

                                    }}
                                    />

                                    &nbsp; &nbsp;

                                    <input placeholder="Children" style={w} type='number' onChange={(event) => {
                                        this.setState({
                                            noChild: event.target.value
                                        });

                                    }}
                                    />


                            </div>

                            <div className="col-xs-1" style={padding}>
                                <button className="btn btn-primary btn-block" style={btnStyle} onClick={()=>this.searchFlight()}>--></button>
                                <input type="submit"
                                                                           className="btn btn-primary btn-block"
                                                                           value="Search Flight"/>
                            </div>
                        </div>
                    </div>

                    <div role="tabpanel" className="tab-pane" id="hotels">
                        <div className="row">
                            <div className="col-xxs-12 col-xs-12 mt">
                                <div className="input-field">
                                    <label for="from">City:</label>
                                    <input type="text" className="form-control"
                                           id="from-place"
                                           placeholder="Los Angeles, USA"/>
                                </div>
                            </div>
                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                <div className="input-field">
                                    <label for="date-start">Return:</label>
                                    <input type="text" className="form-control"
                                           id="date-start"
                                           placeholder="mm/dd/yyyy"/>
                                </div>
                            </div>
                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                <div className="input-field">
                                    <label for="date-end">Check Out:</label>
                                    <input type="text" className="form-control"
                                           id="date-end" placeholder="mm/dd/yyyy"/>
                                </div>
                            </div>
                            <div className="col-sm-12 mt">
                                <section>
                                    <label for="className">Rooms:</label>
                                    <select className="cs-select cs-skin-border">
                                        <option value="" disabled selected>1
                                        </option>
                                        <option value="economy">1</option>
                                        <option value="first">2</option>
                                        <option value="business">3</option>
                                    </select>
                                </section>
                            </div>
                            <div className="col-xxs-12 col-xs-6 mt">
                                <section>
                                    <label for="className">Adult:</label>
                                    <select className="cs-select cs-skin-border">
                                        <option value="" disabled selected>1
                                        </option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </section>
                            </div>
                            <div className="col-xxs-12 col-xs-6 mt">
                                <section>
                                    <label for="className">Children:</label>
                                    <select className="cs-select cs-skin-border">
                                        <option value="" disabled selected>1
                                        </option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </section>
                            </div>
                            <div className="col-xs-12">
                                <input type="submit"
                                       className="btn btn-primary btn-block"
                                       value="Search Hotel"/>
                            </div>
                        </div>
                    </div>

                    <div role="tabpanel" className="tab-pane" id="packages">
                        <div className="row">
                            <div className="col-xxs-12 col-xs-6 mt">
                                <div className="input-field">
                                    <label for="from">City:</label>
                                    <input type="text" className="form-control"
                                           id="from-place"
                                           placeholder="Los Angeles, USA"/>
                                </div>
                            </div>
                            <div className="col-xxs-12 col-xs-6 mt">
                                <div className="input-field">
                                    <label for="from">Destination:</label>
                                    <input type="text" className="form-control"
                                           id="to-place"
                                           placeholder="Tokyo, Japan"/>
                                </div>
                            </div>
                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                <div className="input-field">
                                    <label for="date-start">Departs:</label>
                                    <input type="text" className="form-control"
                                           id="date-start"
                                           placeholder="mm/dd/yyyy"/>
                                </div>
                            </div>
                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                <div className="input-field">
                                    <label for="date-end">Return:</label>
                                    <input type="text" className="form-control"
                                           id="date-end" placeholder="mm/dd/yyyy"/>
                                </div>
                            </div>
                            <div className="col-sm-12 mt">
                                <section>
                                    <label for="className">Rooms:</label>
                                    <select className="cs-select cs-skin-border">
                                        <option value="" disabled selected>1
                                        </option>
                                        <option value="economy">1</option>
                                        <option value="first">2</option>
                                        <option value="business">3</option>
                                    </select>
                                </section>
                            </div>
                            <div className="col-xxs-12 col-xs-6 mt">
                                <section>
                                    <label for="className">Adult:</label>
                                    <select className="cs-select cs-skin-border">
                                        <option value="" disabled selected>1
                                        </option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </section>
                            </div>
                            <div className="col-xxs-12 col-xs-6 mt">
                                <section>
                                    <label for="className">Children:</label>
                                    <select className="cs-select cs-skin-border">
                                        <option value="" disabled selected>1
                                        </option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </section>
                            </div>
                            <div className="col-xs-12">
                                <input type="submit"
                                       className="btn btn-primary btn-block"
                                       value="Search Packages"/>
                            </div>
                        </div>
                    </div>

                </div>
*/}
                <div className="search-page" style={padding}>
                    <div className="container">


                        <div className="tab-content" style={borderStyle}>
                            <div role="tabpanel" className="tab-pane active" id="flights">

                                <div className="row">
                                    <div className="radio col-xs-1 mt" style={padding}>
                                        <input type="radio" name="optradio"
                                               onChange={() => this.setState({return_enable: false})}/>One-Way
                                        <input type="radio" name="optradio"
                                               onChange={() => this.setState({return_enable: true})}/>Round-Trip

                                    </div>

                                </div>


                                <div className="row">
                                    <div className="col-xs-3 mt" style={padding}>
                                        <div className="input-field">
                                            <select style={optStyle}
                                                    onChange={(event) => this.setState({selectedFrom: event.target.value})}
                                                    className="cs-select cs-skin-border" name="" id="">
                                                <option style={color} name="" id="">From City</option>
                                                {
                                                    this.state.fromCity.map(city =>
                                                        <option style={color} value={city}>{city}</option>
                                                    )
                                                }

                                            </select>

                                            &nbsp; &nbsp;


                                            <select style={optStyle}
                                                    onChange={(event) => this.setState({selectedTo: event.target.value})}
                                                    className="cs-select cs-skin-border" name="" id="">
                                                <option style={color} name="" id="">To City</option>
                                                {
                                                    this.state.toCity.map(city =>
                                                        <option style={color} value={city}>{city}</option>
                                                    )
                                                }

                                            </select>

                                        </div>
                                    </div>

                                    <div className="col-xs-2 mt" style={padding}>
                                        <div className="input-field">

                                            <div className="input-field">
                                                <DateTimeField mode="date"
                                                               style={optStyle1}
                                                               dateTime={this.state.goingDate}
                                                               minDate={this.state.startDate}
                                                               defaultText="Departure Date"
                                                               format={this.state.format}
                                                               viewMode={this.state.mode}
                                                               inputFormat={this.state.inputFormat}
                                                               onChange={this.handleChange}/>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-2 mt" style={{
                                        display: this.state.return_enable ? 'inline-block' : 'none',
                                        padding: 0
                                    }}>
                                        <div className="input-field">

                                            <div className="input-field">
                                                <DateTimeField mode="date"
                                                               dateTime={this.state.comingDate}
                                                               minDate={this.state.startDate}
                                                               defaultText="Arrival Date"
                                                               format={this.state.format}
                                                               viewMode={this.state.mode}
                                                               inputFormat={this.state.inputFormat}
                                                               onChange={this.handleChange1}/>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-4 mt" style={padding}>


                                        <select style={optStyle}
                                                onChange={(event) => this.setState({selectedClass: event.target.value})}
                                                className="cs-select cs-skin-border" name="" id="">
                                            <option style={color} value="class">Class</option>
                                            <option style={color} value="economy">Economy</option>
                                            <option style={color} value="first">First</option>
                                            <option style={color} value="business">Business</option>
                                        </select>

                                        &nbsp; &nbsp;
                                        <input placeholder="Adult" style={w} type='number' onChange={(event) => {
                                            this.setState({
                                                noAdults: event.target.value
                                            });

                                        }}
                                        />

                                        &nbsp; &nbsp;

                                        <input placeholder="Children" style={w} type='number' onChange={(event) => {
                                            this.setState({
                                                noChild: event.target.value
                                            });

                                        }}
                                        />


                                    </div>

                                    <div className="col-xs-1" style={padding}>
                                        <button className="btn btn-primary btn-block" style={btnStyle}
                                                onClick={() => this.searchFlight()}>-->
                                        </button>
                                        {/*<input type="submit"
                                                                           className="btn btn-primary btn-block"
                                                                           value="Search Flight"/>*/}
                                    </div>
                                </div>
                            </div>

                            <div role="tabpanel" className="tab-pane" id="hotels">
                                <div className="row">
                                    <div className="col-xxs-12 col-xs-12 mt">
                                        <div className="input-field">
                                            <label for="from">City:</label>
                                            <input type="text" className="form-control"
                                                   id="from-place"
                                                   placeholder="Los Angeles, USA"/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt alternate">
                                        <div className="input-field">
                                            <label for="date-start">Return:</label>
                                            <input type="text" className="form-control"
                                                   id="date-start"
                                                   placeholder="mm/dd/yyyy"/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt alternate">
                                        <div className="input-field">
                                            <label for="date-end">Check Out:</label>
                                            <input type="text" className="form-control"
                                                   id="date-end" placeholder="mm/dd/yyyy"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 mt">
                                        <section>
                                            <label for="className">Rooms:</label>
                                            <select className="cs-select cs-skin-border">
                                                <option value="" disabled selected>1
                                                </option>
                                                <option value="economy">1</option>
                                                <option value="first">2</option>
                                                <option value="business">3</option>
                                            </select>
                                        </section>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <section>
                                            <label for="className">Adult:</label>
                                            <select className="cs-select cs-skin-border">
                                                <option value="" disabled selected>1
                                                </option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </section>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <section>
                                            <label for="className">Children:</label>
                                            <select className="cs-select cs-skin-border">
                                                <option value="" disabled selected>1
                                                </option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </section>
                                    </div>
                                    <div className="col-xs-12">
                                        <input type="submit"
                                               className="btn btn-primary btn-block"
                                               value="Search Hotel"/>
                                    </div>
                                </div>
                            </div>

                            <div role="tabpanel" className="tab-pane" id="packages">
                                <div className="row">
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label for="from">City:</label>
                                            <input type="text" className="form-control"
                                                   id="from-place"
                                                   placeholder="Los Angeles, USA"/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label for="from">Destination:</label>
                                            <input type="text" className="form-control"
                                                   id="to-place"
                                                   placeholder="Tokyo, Japan"/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt alternate">
                                        <div className="input-field">
                                            <label for="date-start">Departs:</label>
                                            <input type="text" className="form-control"
                                                   id="date-start"
                                                   placeholder="mm/dd/yyyy"/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt alternate">
                                        <div className="input-field">
                                            <label for="date-end">Return:</label>
                                            <input type="text" className="form-control"
                                                   id="date-end" placeholder="mm/dd/yyyy"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 mt">
                                        <section>
                                            <label for="className">Rooms:</label>
                                            <select className="cs-select cs-skin-border">
                                                <option value="" disabled selected>1
                                                </option>
                                                <option value="economy">1</option>
                                                <option value="first">2</option>
                                                <option value="business">3</option>
                                            </select>
                                        </section>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <section>
                                            <label for="className">Adult:</label>
                                            <select className="cs-select cs-skin-border">
                                                <option value="" disabled selected>1
                                                </option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </section>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <section>
                                            <label for="className">Children:</label>
                                            <select className="cs-select cs-skin-border">
                                                <option value="" disabled selected>1
                                                </option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </section>
                                    </div>
                                    <div className="col-xs-12">
                                        <input type="submit"
                                               className="btn btn-primary btn-block"
                                               value="Search Packages"/>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="search-grids">
                            <div className="col-md-3 search-grid-left">
                                {/*<div className="search-hotel">
                                <h3 className="sear-head">Name contains</h3>
                                <form>
                                    <input type="text" value={this.state.hotelname} placeholder="Hotel Name"  onChange={(event) => {
                                        this.setState({
                                            hotelname: event.target.value
                                        });
                                    }} required/>
                                    <input type="submit" value=" "/>
                                </form>
                            </div>*/}
                                <div className="range">
                                    <h3 className="sear-head">Filter Price</h3>
                                    <ul className="dropdown-menu6">
                                        <li>

                                            {/*<div className="slider-range"></div>*/}
                                            <input type="text" id="amount" style={amount}/>
                                        </li>
                                    </ul>
                                    <input type="number" placeholder="Min Range"></input>
                                    <br/>
                                    <input type="number" placeholder="Max Range"></input>
                                    <br/>

                                </div>

                                <div className="range-two">


                                    <h3 className="sear-head">Arrival Time</h3>


                                    <input type="checkbox" name="1"/>
                                    <input type="radio" name="1"/>
                                    <ul className="dropdown-menu5">
                                        <li>

                                            <div className="slider-range1"></div>
                                            <input type="text" id="amount1" style={amount1}/>
                                        </li>
                                    </ul>

                                </div>
                                {/*  <div className="single-star-bottom">
                                <h3 className="sear-head">Star rating</h3>
                                <ReactStars count={5} onChange={ratingChanged} size={24} color2={'#ffd700'} />
                            </div>*/}
                            </div>
                            <br/>
                            <div className="col-md-9 ">
                                <div className="search-grid-right ">
                                    <select style={optStyle}
                                            onChange={(event) => this.setState({sortPrice: event.target.value})}
                                            className="cs-select cs-skin-border" name="" id="">
                                        <option style={color} value="sortPrice">Price Sort</option>
                                        <option style={color} value="a">Low to High</option>
                                        <option style={color} value="d">High to Low</option>

                                    </select>

                                    &nbsp; &nbsp; &nbsp;

                                    <select style={optStyle}
                                            onChange={(event) => this.setState({sortArrivalTime: event.target.value})}
                                            className="cs-select cs-skin-border" name="" id="">
                                        <option style={color} value="sortAtime">Arrival Time</option>
                                        <option style={color} value="a">Ascending</option>
                                        <option style={color} value="d">Descending</option>

                                    </select>

                                    &nbsp; &nbsp; &nbsp;

                                    <select style={optStyle}
                                            onChange={(event) => this.setState({sortDepTime: event.target.value})}
                                            className="cs-select cs-skin-border" name="" id="">
                                        <option style={color} value="sortDtime">Price Sort</option>
                                        <option style={color} value="a">Ascending</option>
                                        <option style={color} value="d">Descending</option>

                                    </select>
                                </div>
                                <hr/>
                            </div>


                            <div className="col-md-9 search-grid-right">

                                {this.state.flightData.map(flight=>
                                    <div>

                                        <div className="col-md-12 search-grid-right" style={borderStyle}>

                                            <div class="container vertical-divider">
                                                <div class="column one-third">

                                                    <div className="col-md-3 hotel-left-one">
                                                        <a href="single.html"><img src={flight1} height={40} alt="hi"/></a>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <span className="glyphicon glyphicon-bed"
                                                              aria-hidden="true"></span>{flight.f_id}
                                                        <span className="dot-inner"
                                                              aria-hidden="true"> &nbsp; {flight.time_s}----{flight.time_e}</span>
                                                        <span>Duration : {flight.duration} Hours</span>
                                                    </div>
                                                    <div className="col-md-2 text-right">
                                                        <h4>${flight.fare_e}</h4>
                                                        <p>Price</p>
                                                        <button className="btn btn-primary btn-block" style={btnStyle1}
                                                                onClick={() => alert(flight.f_id)}>Book
                                                        </button>
                                                        <br/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                        <br/>
                                        <br/>
                                    </div>
                                )}

                            </div>


                            {/*{this.state.flightData.map(flight=>
                                <div className="col-md-9 search-grid-right">
                                    <div className="hotel-rooms">
                                        <div class="container vertical-divider">
                                            <div class="column one-third">
                                                <div className="hotel-left">

                                                    <div className="hotel-left-grids">
                                                        <div className="col-md-3 hotel-left-one">
                                                            <a href="single.html"><img src={flight1} alt="hi" /></a>
                                                        </div>
                                                        <div className="col-md-9">
                                                            <span className="glyphicon glyphicon-bed" aria-hidden="true"></span>{flight.f_id}
                                                            <span className="dot-inner" aria-hidden="true">{flight.time_s}----{flight.time_e}</span>
                                                            <span>Duration : {flight.duration} Hours</span>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hotel-right text-right">
                                                <h4>$ {flight.fare_e}</h4>
                                                <p>Economy Price</p>
                                                <a href="single.html">Book</a>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>


                                </div>


                            )}*/}
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}



export default Flights;