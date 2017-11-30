import React, {Component} from 'react';
import '../css/hotel-style.css';
import '../css/bootstrap.css';
import CustomizedRange from './CustomizedRange';
import ReactStars from 'react-stars'
import ReactBootstrapSlider from 'react-bootstrap-slider'
import hotel1 from '../images/fb1.png';
import DateTimeField from 'react-bootstrap-datetimepicker';
import {Checkbox} from 'react-bootstrap';
import car from '../images/car-2.jpg';
import $ from 'jquery';
import Slider from 'rc-slider';
import { Link,Route, withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import axios from "axios";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class FlightBooking extends Component {

    state = {
        flightData : [],
        fromCity : [],
        toCity : [],
        selectedFrom : '',
        selectedTo:'',
        goingDate : new Date(),
        comingDate : new Date(),
        selectedClass:'',
        noAdults:0,
        noChild:0,
        return_enable:false,
        hotel_name: 'Hilton',
        random:0
    };

    flight_booking = () => {
      console.log(localStorage.getItem('goingD'));
      console.log(this.props.select.selectedFlight.fare);
      console.log(((this.props.select.Adult.length*this.props.select.selectedFlight.fare)+(this.props.select.Child.length*this.props.select.selectedFlight.fare/10)));
      var self=this;
      axios.get('http://localhost:3001/flights/flight_booking_direct',{params:{f_id:this.props.select.selectedFlight.f_id,user_id:"1",flight_start_s:localStorage.getItem('goingD'),class:localStorage.getItem('Sclass'),duration:this.props.select.selectedFlight.duration,booked_seats:this.props.select.Adult.length,passenger:this.props.select.Adult.concat(this.props.select.Child),fare:((this.props.select.Adult.length*this.props.select.selectedFlight.fare)+(this.props.select.Child.length*this.props.select.selectedFlight.fare_child))}})
          .then(function (response) {
              console.log(response);
          })
          .catch(function (error) {
              console.log(error);
          });
    }

    render() {

        return (

            <div className="container-fluid">

                <div className="row">
                    <div className="col-md-12">
                        <h1 style={{color:"Orange"}}> <b>Booking Summary</b> </h1><br/><br/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h4> Passenger Details </h4><br/>
                    </div>
                </div>

                <div className="row">
                    <div className="center-block col-md-5">
                        <table id="tableMenu" className="table">
                            <tbody>
                            <tr>
                                <th style={{textAlign: 'center'}}>Name of the Passengers:</th>
                                <th style={{textAlign: 'center'}}>Age : &nbsp;</th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {
                  this.props.select.Adult.map
                  (Adult=>
                    <div className="row">
                        <div className="center-block col-md-5">
                            <table id="tableMenu" className="table">
                                <tbody>
                                <tr className="spaceUnder">
                                    <th style={{textAlign: 'center'}}>{Adult.name}</th>
                                    <th style={{textAlign: 'center'}}>{Adult.age}</th>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                  )
                }

                {
                  this.props.select.Child.map
                  (Child=>
                    <div className="row">
                        <div className="center-block col-md-5">
                            <table id="tableMenu" className="table">
                                <tbody>
                                <tr>
                                    <th style={{textAlign: 'center', 'border-collapse': 'collapse'}}>{Child.name}</th>
                                    <th style={{textAlign: 'center'}}>{Child.age}</th>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                  )
                }

                <div className="row">
                    <div className="col-md-12">
                        <hr/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h4> Terms and Conditions </h4><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> Unlimited free miles included.</p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> Rental fees are due at pick up.</p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> Car rental companies require the driver to supply a credit card in his/her name in order to pick up the car.</p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> Additional restrictions and fees may apply based on drivers age.</p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> Additional charges may apply for required insurance, optional items, or additional drivers. These services can be purchased from the rental car company at the time of rental.</p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> Debit cards are not accepted for pre-paid reservations or security deposits</p><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p> --> he credit card used for booking must be presented at the rental counter for confirmation of this reservation</p><br/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <hr/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h4> Booking Details </h4><br/>
                    </div>
                </div>

                <div className="row">

                    <div id="centerbarmain" className="center-block col-md-6">
                        <form id="userdatachangeform">

                            <div>
                                <p id="validatenm"></p>
                            </div>

                            <div className="form-group">
                                <input id="fnudch"
                                       className="form-control"
                                       type="text"
                                       label="Card Number"
                                       placeholder="Card Number"
                                       value=""
                                       onChange={(event) => {

                                       }}
                                />
                            </div>

                            <div>
                                <p id="changesuccess"></p>
                            </div>

                            <div className="form-group">
                                <input id="fnudch"
                                       className="form-control"
                                       type="text"
                                       label="Expiry"
                                       placeholder="Expiry"
                                       value=""
                                       onChange={(event) => {

                                       }}
                                />
                            </div>

                            <div>
                                <p id="changesuccess"></p>
                            </div>

                            <div className="form-group">
                                <input id="fnudch"
                                       className="form-control"
                                       type="text"
                                       label="CVV"
                                       placeholder="CVV"
                                       value=""
                                       onChange={(event) => {

                                       }}
                                />
                            </div>

                            <div>
                                <p id="changesuccess"></p>
                            </div>

                            <div className="form-group">
                                <input id="fnudch"
                                       className="form-control"
                                       type="text"
                                       label="Card Holders Name"
                                       placeholder="Card Holders Name"
                                       value=""
                                       onChange={(event) => {

                                       }}
                                />
                            </div>

                            <div>
                                <p id="changesuccess"></p>
                            </div>

                            <div id="change" className="form-group">
                                <button id="change"
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={() => this.flight_booking()}>
                                    Book Now
                                </button>
                            </div>
                        </form>
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
        setFromCity: (data) => {
          dispatch({
              type: "setFromCity",
              payload :{data:data}
          });
        },
        setSelectedFlight: (data) => {
          dispatch({
              type: "setSelectedFlight",
              payload :{data:data}
          });
        },
        setSelectedFlightR: (data) => {
            dispatch({
                type: "setSelectedFlightR",
                payload :{data:data}
            });
        },
        setAdult: (data) => {
          dispatch({
              type: "setAdult",
              payload :{data:data}
          });
        },
        setChild: (data) => {
          dispatch({
              type: "setChild",
              payload :{data:data}
          });
        },
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FlightBooking));
