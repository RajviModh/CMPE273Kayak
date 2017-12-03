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
        var self=this;
        axios.get('http://localhost:3001/my_hotel_bookings/my_hotel_bookings',{withCredentials:true})
            .then( (response) => {
                console.log("res",response);
                console.log("res data",response.data);
                console.log(response.data.data);
                this.setState({flight_bookings:response.data.data})
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
                                <th style={color}>Hotel Name </th>
                                <th style={color}>From</th>
                                <th style={color}>To </th>
                                <th style={color}>Total Rooms</th>
                                <th style={color}>Room Type</th>
                                <th style={color}>Booking Date</th>
                                <th style={color}>Amount($)</th>
                                <th style={color}>Name</th>
                                <th style={color}>Age</th>
                            </tr>
                            {this.state.flight_bookings.map(flight=>

                                <tr >
                                    <td style={padding}>{flight.hotelName}</td>
                                    <td style={padding}>{flight.bookedFrom.slice(0,10)}</td>
                                    <td style={padding}>{flight.bookedTo.slice(0,10)}</td>
                                    <td style={padding}>{flight.roomsBooked}</td>
                                    <td style={padding}>{flight.roomType}</td>
                                    <td style={padding}>{flight.bookedOn.slice(0,10)}</td>
                                    <td style={padding}>{flight.totalAmount}</td>
                                </tr>

                            )}
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>


        );
    }
}
export default withRouter(MyBookingsF);