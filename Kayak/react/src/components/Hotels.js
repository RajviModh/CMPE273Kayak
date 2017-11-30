import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../css/hotel-style.css';
import '../css/bootstrap.css';
import CustomizedRange from './CustomizedRange';
import ReactStars from 'react-stars'
import hotel1 from '../images/21.jpg';
import {connect} from "react-redux";
import {Route, withRouter, Link} from 'react-router-dom';

var amount = {border: 0, color:'#ffffff'};
var amount1 ={border: '0', color:'#ffffff'};

const ratingChanged = (newRating) => {
    console.log(newRating)
}

class Hotels extends Component {

    state = {
        hotelname: ''
    };

    componentWillMount(){
        console.log(this.props.select.selectedFrom);
    }



    render() {
        return (
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
                            <div className="hotel-rooms">
                                <div class="container vertical-divider">
                                    <div class="column one-third">
                                <div className="hotel-left">

                                    {/*<div className="text-left">
                                    <p>Jl. Pahlawan VII No.247-D Sidoarjo-Surabaya-Indonesia</p>
                                    </div>*/}

                                    <div className="hotel-left-grids">
                                        <div className="hotel-left-one">
                                            <a href="single.html"><img src={hotel1} alt="hi" /></a>
                                        </div>
                                        <div className="hotel-left-two">
                                            <a href="single.html"><span className="glyphicon glyphicon-bed" aria-hidden="true"></span>Grand Park Hyatt</a>
                                            <br/>


                                            <div className="rating text-left">
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                            </div>
                                            <a href="single.html"><span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span>Diamond Street</a>
                                            <p>2.5 km to Sed ut perspiciatis <span> 2.6 km to sit voluptatem</span></p>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                                    </div>
                                <div className="hotel-right text-right">
                                    <h4><span>$8,750</span> $4,850</h4>
                                    <p>Best price</p>
                                    <a href="single.html">Continue</a>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            </div>
                            <div className="hotel-rooms">
                                <div className="hotel-left">
                                    <a href="single.html"><span class="glyphicon glyphicon-bed" aria-hidden="true"></span>Royal Taj Coromandel</a>
                                    <p>Jl. Pahlawan VII No.247-D Sidoarjo-Surabaya-Indonesia</p>
                                    <div className="hotel-left-grids">
                                        <div className="hotel-left-one">
                                            <a href="single.html"><img src="../images/22.jpg" alt="" /></a>
                                        </div>
                                        <div className="hotel-left-two">
                                            <div className="rating text-left">
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                            </div>
                                            <a href="single.html"><span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span>Diamond Street</a>
                                            <p>2.5 km to Sed ut perspiciatis <span> 2.6 km to sit voluptatem</span></p>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div className="hotel-right text-right">
                                    <h4><span>$3,350</span> $1,450</h4>
                                    <p>Best price</p>
                                    <a href="single.html">Continue</a>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="hotel-rooms">
                                <div className="hotel-left">
                                    <a href="single.html"><span className="glyphicon glyphicon-bed" aria-hidden="true"></span>Crowne Plaza</a>
                                    <p>Jl. Pahlawan VII No.247-D Sidoarjo-Surabaya-Indonesia</p>
                                    <div className="hotel-left-grids">
                                        <div className="hotel-left-one">
                                            <a href="single.html"><img src="../images/23.jpg" alt="" /></a>
                                        </div>
                                        <div className="hotel-left-two">
                                            <div className="rating text-left">
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                            </div>
                                            <a href="single.html"><span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span>Diamond Street</a>
                                            <p>2.5 km to Sed ut perspiciatis <span> 2.6 km to sit voluptatem</span></p>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                                <div className="hotel-right text-right">
                                    <h4><span>$9,750</span> $5,700</h4>
                                    <p>Best price</p>
                                    <a href="single.html">Continue</a>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="hotel-rooms">
                                <div className="hotel-left">
                                    <a href="single.html"><span className="glyphicon glyphicon-bed" aria-hidden="true"></span>Modern Hilton Park</a>
                                    <p>Jl. Pahlawan VII No.247-D Sidoarjo-Surabaya-Indonesia</p>
                                    <div className="hotel-left-grids">
                                        <div className="hotel-left-one">
                                            <a href="single.html"><img src="../images/24.jpg" alt="" /></a>
                                        </div>
                                        <div className="hotel-left-two">
                                            <div className="rating text-left">
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                            </div>
                                            <a href="single.html"><span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span>Diamond Street</a>
                                            <p>2.5 km to Sed ut perspiciatis <span> 2.6 km to sit voluptatem</span></p>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                                <div className="hotel-right text-right">
                                    <h4><span>$9,750</span> $6,800</h4>
                                    <p>Best price</p>
                                    <a href="single.html">Continue</a>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="hotel-rooms">
                                <div className="hotel-left">
                                    <a href="single.html"><span className="glyphicon glyphicon-bed" aria-hidden="true"></span>Grand park Hotel</a>
                                    <p>Jl. Pahlawan VII No.247-D Sidoarjo-Surabaya-Indonesia</p>
                                    <div className="hotel-left-grids">
                                        <div className="hotel-left-one">
                                            <a href="single.html"><img src="../images/25.jpg" alt="" /></a>
                                        </div>
                                        <div className="hotel-left-two">
                                            <div className="rating text-left">
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                            </div>
                                            <a href="single.html"><span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span>Diamond Street</a>
                                            <p>2.5 km to Sed ut perspiciatis <span> 2.6 km to sit voluptatem</span></p>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                                <div className="hotel-right text-right">
                                    <h4><span>$8,750</span> $4,850</h4>
                                    <p>Best price</p>
                                    <a href="single.html">Continue</a>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="hotel-rooms">
                                <div className="hotel-left">
                                    <a href="single.html"><span className="glyphicon glyphicon-bed" aria-hidden="true"></span>Royal Park Hyatt</a>
                                    <p>Jl. Pahlawan VII No.247-D Sidoarjo-Surabaya-Indonesia</p>
                                    <div className="hotel-left-grids">
                                        <div className="hotel-left-one">
                                            <a href="single.html"><img src="../images/26.jpg" alt="" /></a>
                                        </div>
                                        <div className="hotel-left-two">
                                            <div className="rating text-left">
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                                <span>☆</span>
                                            </div>
                                            <a href="single.html"><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>Diamond Street</a>
                                            <p>2.5 km to Sed ut perspiciatis <span> 2.6 km to sit voluptatem</span></p>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                                <div className="hotel-right text-right">
                                    <h4><span>$4,650</span> $2,650</h4>
                                    <p>Best price</p>
                                    <a href="single.html">Continue</a>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Hotels));
