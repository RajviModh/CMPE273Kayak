import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/hotel-style.css';
import '../css/bootstrap.css';
import CustomizedRange from './CustomizedRange';
import ReactStars from 'react-stars'
import hotel1 from '../images/21.jpg';
import {connect} from "react-redux";

var amount = {border: 0, color:'#ffffff'};
var amount1 ={border: '0', color:'#ffffff'};

const ratingChanged = (newRating) => {
    console.log(newRating)
}

class Flights extends Component {

    state = {
      flightData : []
    };

    componentWillMount(){
      console.log(this.state.flightData);
        this.setState({
            flightData : JSON.parse(localStorage.getItem("searchedFlights"))
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



            <div className="search-page">
                <div className="container">
                    <div className="search-grids">
                        <div className="col-md-3 search-grid-left">
                            <div className="search-hotel">
                                <h3 className="sear-head">Name contains</h3>
                                <form>
                                    <input type="text" value={this.state.hotelname} placeholder="Hotel Name"  onChange={(event) => {
                                        this.setState({
                                            hotelname: event.target.value
                                        });
                                    }} required/>
                                    <input type="submit" value=" "/>
                                </form>
                            </div>
                            <div className="range">
                                <h3 className="sear-head">Average nightly rate</h3>
                                <ul className="dropdown-menu6">
                                    <li>

                                        {/*<div className="slider-range"></div>*/}
                                        <input type="text" id="amount" style={amount}/>
                                    </li>
                                </ul>
                                <CustomizedRange />
                            </div>
                            <div className="range-two">
                                <h3 className="sear-head">Distance from</h3>
                                <select className="sel">
                                    <option value="">Enter City Center</option>
                                    <option value="">Park View Center</option>
                                    <option value="">E Park Road</option>
                                    <option value="">Silver City</option>
                                </select>

                                <ul className="dropdown-menu5">
                                    <li>

                                        <div className="slider-range1"></div>
                                        <input type="text" id="amount1" style={amount1} />
                                    </li>
                                </ul>

                            </div>
                            <div className="single-star-bottom">
                                <h3 className="sear-head">Star rating</h3>
                                <ReactStars count={5} onChange={ratingChanged} size={24} color2={'#ffd700'} />
                            </div>
                        </div>



                            <div className="col-md-9 search-grid-right">
                                {this.state.flightData.map(flight=>
                                    <div className="col-md-12 search-grid-right">
                                        <div className="col-md-3 hotel-left-one">
                                            <a href="single.html"><img src={hotel1} alt="hi" /></a>
                                        </div>
                                        <div className="col-md-7">
                                            <span className="glyphicon glyphicon-bed" aria-hidden="true"></span>{flight.f_id}
                                            <span className="dot-inner" aria-hidden="true"> &nbsp; {flight.time_s}----{flight.time_e}</span>
                                            <span>Duration : {flight.duration} Hours</span>
                                        </div>
                                        <div className="col-md-2 text-right">
                                            <h4>${flight.fare_e}</h4>
                                            <p>Price</p>
                                            <a href="single.html">Book</a>
                                        </div>
                                    </div>
                                )}
                            </div>


                            {/* {this.state.flightData.map(flight=>
                                <div className="col-md-9 search-grid-right">
                                    <div className="hotel-rooms">
                                        <div class="container vertical-divider">
                                            <div class="column one-third">
                                                <div className="hotel-left">

                                                    <div className="hotel-left-grids">
                                                        <div className="col-md-3 hotel-left-one">
                                                            <a href="single.html"><img src={hotel1} alt="hi" /></a>
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

                        </div></div></div>

        );
    }
}

const mapStateToProps = (state) => {
    return{
        select: state.reducerFlights
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        setSelectedFrom: (data) => {
            console.log("data is "+data);
            dispatch({
                type: "setSelectedFrom",
                payload :{data:data}
            });
        },
        setSelectedTo: (data) => {
            dispatch({
                type: "setSelectedTo",
                payload :{data:data}
            });
        },
        setFlights: (data) => {
          console.log("flights are ",data);
            dispatch({
                type: "setFlights",
                payload :{data:data}
            });
        },
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Flights));
