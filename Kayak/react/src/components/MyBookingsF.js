import React, {Component} from 'react';
import axios from "axios";
import { Link,Route, withRouter } from 'react-router-dom';


var padding = {padding:0}

var align = {float:'left'}

var color = {color:"#F78536"}

var left = {'text-align':'left'}

var right = {'text-align':'right'}

var btnStyle= {height:40, width:100}

class MyBookingsF extends Component{

    state = {
        flight_bookings:[]
    };

    componentWillMount(){
        var self=this
        axios.get('http://localhost:3001/bookings/my_bookings',{withCredentials:true})
            .then(function (response) {
                console.log("res",response);
                console.log("res data",response.data);
                self.setState({flight_bookings:response.data.data})
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    render(){
        return(
            <div className="search-page" style={padding}>
                <div className="container">
                    {/*<div className="search-grids">
                        <div className="col-md-3">

                        </div>

                    </div>*/}
                    <div><br/></div>
                    <div className="col-md-12 ">
                        <table id="tableMenu" className="table">
                            <tbody>
                            <tr>
                                <th style={color}>Booking ID </th>
                                <th style={color}>Booked On</th>
                                <th style={color}>Flight ID </th>
                                <th style={color}>Airline </th>
                                <th style={color}><tr>Departure City</tr><tr>(Time)</tr></th>
                                <th style={color}><tr>Arrival City</tr><tr>(Time)</tr></th>
                                <th style={color}>Duration</th>
                                <th style={color}>Journey Date</th>
                                <th style={color}><tr>Seats</tr><tr>(Economy/Business/First)</tr></th>
                                <th style={color}>Name</th>
                                <th style={color}>Age</th>
                            </tr>
                            {this.state.flight_bookings.map(flight=>

                                        <tr >
                                            <td style={padding}>{flight.bid}</td>
                                            <td style={padding}>{flight.booking_date.slice(0,10)}</td>
                                            <td style={padding}>{flight.f_id}</td>
                                            <td style={padding}>{flight.airline_name}</td>
                                            <td style={padding}><tr>{flight.from}</tr><tr>{flight.time_s}</tr></td>
                                            <td style={padding}><tr>{flight.to}</tr><tr>{flight.time_e}</tr></td>
                                            <td style={padding}>{flight.duration}</td>
                                            <td style={padding}>{flight.flight_date_s.slice(0,10)}</td>
                                            <td style={padding}>{flight.booked_seats_e}/{flight.booked_seats_b}/{flight.booked_seats_f}</td>
                                            <td style={padding}>{flight.p_name}</td>
                                            <td style={padding}>{flight.p_age}</td>
                                        </tr>
                                       
                            )}
                            </tbody>
                        </table>
                       {/* {this.state.flight_bookings.map(flight=>
                            <div className="row" style={padding}>

                                    <table id="tableMenu" className="table">
                                        <tbody>
                                        <tr >
                                            <td style={padding}>{flight.bid}</td>
                                            <td style={padding}>{flight.booking_date.slice(0,10)}</td>
                                            <td style={padding}>{flight.f_id}</td>
                                            <td style={padding}>{flight.airline_name}</td>
                                            <td style={padding}><tr>{flight.from}</tr><tr>{flight.time_s}</tr></td>
                                            <td style={padding}><tr>{flight.to}</tr><tr>{flight.time_e}</tr></td>
                                            <td style={padding}>{flight.duration}</td>
                                            <td style={padding}>{flight.flight_date_s.slice(0,10)}</td>
                                            <td style={padding}>{flight.booked_seats_e}/{flight.booked_seats_b}/{flight.booked_seats_f}</td>
                                            <td style={padding}>{flight.p_name}</td>
                                            <td style={padding}>{flight.p_age}</td>
                                        </tr>
                                        </tbody>
                                    </table>

                            </div>
                        )}*/}

                    </div>

                                  </div>
            </div>


        );
    }
}
export default withRouter(MyBookingsF);