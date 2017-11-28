import React, {Component} from 'react';
import '../css/hotel-style.css';
import '../css/bootstrap.css';
import ReactStars from 'react-stars';
import DateTimeField from 'react-bootstrap-datetimepicker';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

var imgs = ["../images/place-2.jpg", "../images/place-3.jpg", "../images/place-4.jpg", "../images/place-6.jpg"];
var amount = {border: 0, color: '#ffffff'};
var amount1 = {border: '0', color: '#ffffff'};

var color = {color: "black"}
var colorBlue = {color: "blue"}
var w = {width: 80, height: 40, color: "black"}
var optStyle = {color: "Black", height: 40}
var optStyle1 = {height: 30}
var padding = {padding: 0}
var btnStyle = {height: 40, width: 20}
var btnStyle1 = {height: 30, textAlign: "center"}
var borderStyle = {border: "thin solid #F78536", padding: 0}
const emailRegex = require('email-regex')
var re = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
var regex = /\d/g;
var formdata = {};


const ratingChanged = (newRating) => {
    console.log(newRating);
}

const sliderChanged = (newRange) => {
    console.log(newRange);
}

const itemChange = (newItem) => {

    var toggle = document.getElementById(newItem);

    if (toggle.style.display == 'none') {
        toggle.style.display = 'block';
    } else {
        toggle.style.display = 'none';
    }
}

const handleClose = () => {

    var close = document.getElementById("modalforhotelbooking");

    if (close.style.display == 'none') {
        close.style.display = 'block';
    } else {
        close.style.display = 'none';
    }
}

const bookHotel = (hotelName) => {

}

class Hotels extends Component {

    state = {
        /*flightData: [{
            f_id: '#AI-1',
            airline_name: 'Air India',
            fare_e: 1000000,
            fare_child_e: 5,
            capacity_e: 200,
            time_s: '23:23:00',
            time_e: '01:25',
            duration: '2:02:00'
        },
            {
                f_id: '#AI-2',
                airline_name: 'Jet Airways',
                fare_e: 1000000,
                fare_child_e: 5,
                capacity_e: 200,
                time_s: '23:23:00',
                time_e: '01:25',
                duration: '2:02:00'
            }

        ],*/
        /*fromCity: ['SFO', 'SJC', 'LAX'],
        toCity: ['SFO', 'SJC', 'LAX'],
        selectedFrom: '',
        selectedTo: '',*/
        goingDate: new Date(),
        comingDate: new Date(),
        format: "YYYY-MM-DD",
        inputFormat: "DD/MM/YYYY",
        mode: "date"
        /*selectedClass: '',
        noAdults: 0,
        noChild: 0,
        return_enable: false,
        hotel_name: 'Hilton'*/
    };

    handlehotelChange = (newDate) => {
        formdata["checkindate"] = newDate;
    };
    handlehotelChange1 = (newDate) => {
        formdata["checkoutdate"] = newDate;
    };
    displayhotelbookingmodal = () => {

        var bookingclick = document.getElementById("modalforhotelbooking");

        if (bookingclick.style.display == "none") {
            bookingclick.style.display = 'block';
        } else {
            bookingclick.style.display = 'none';
        }
    }
    searchHotels = () => {

        console.log(formdata)

    }
    handlehotelbooking = () => {

        document.getElementById('messfirstname').style.display = 'none';
        document.getElementById('messlastname').style.display = 'none';
        document.getElementById('messemail').style.display = 'none';
        document.getElementById('messcontact').style.display = 'none';

        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var email = document.getElementById("email").value;
        var contact = document.getElementById("contact").value;


        if (firstname == "") {
            document.getElementById('messfirstname').style.display = 'block';
            document.getElementById("messfirstname").innerHTML = 'Please enter first name';
        } else if (regex.test(firstname)) {
            document.getElementById('messfirstname').style.display = 'block';
            document.getElementById("messfirstname").innerHTML = 'Name cannot contain digits';
        } else if (lastname == "") {
            document.getElementById('messlastname').style.display = 'block';
            document.getElementById("messlastname").innerHTML = 'Please enter last name';
        } else if (regex.test(lastname)) {
            document.getElementById('messlastname').style.display = 'block';
            document.getElementById("messlastname").innerHTML = 'Name cannot contain digits';
        } else if (email == "") {
            document.getElementById('messemail').style.display = 'block';
            document.getElementById("messemail").innerHTML = 'Please enter email';
        } else if (!re.test(email)) {
            document.getElementById('messemail').style.display = 'block';
            document.getElementById("messemail").innerHTML = 'Invalid email';
        } else if (contact == "") {
            document.getElementById('messcontact').style.display = 'block';
            document.getElementById("messcontact").innerHTML = 'Please enter contact';
        } else {
            this.props.history.push('/hotelbooking')
        }

    }

    componenetWillMount() {
        this.setState({});
    }

    getStars = (star) => {
        var stars = [];

        for (var i = 1; i <= star; i++) {
            stars.push(<span>☆</span>);
        }
        return stars;
    };

    getRooms = (hotelIndex) => {

        var rooms = this.props.select.hotels[hotelIndex].rooms;

        rooms = rooms.map((room, index) => {
            return ( <tr>
                <td> {room.type}</td>
                <td> {room.rent}</td>
                <td> {room.availableRooms}</td>
                <button className="btn btn-primary" id="download" type="button"
                        onClick={() => this.handleBook(room)}>Continue
                </button>
            </tr>);
        });
        return rooms;
    }

    getFreebies = (hotelIndex) => {
        var freebies = this.props.select.hotels[hotelIndex].freebies;

        freebies = freebies.map((freebie, index) => {
            return (<div><span className="glyphicon glyphicon-ok"
                               aria-hidden="true"> {freebie}</span><br/></div>);
        });
        return freebies;

    }

    render() {


        var status, url;


        // roomTypes = this.props.select.rooms.map(function (item, index) {
        //     if (!index == 0) {
        //         return (
        //             <tr>
        //                 <td> {item.type}</td>
        //                 <td> {item.rent}</td>
        //                 <td> {item.availableRooms}</td>
        //                 <button className="btn btn-primary" id="download" type="button"
        //                         onClick={() => this.handleBook(item)}>Continue
        //                 </button>
        //             </tr>
        //         );
        //     }
        // }.bind(this));

        //     freebies = this.props.select.freebies.map(function (item, index) {
        //     return (
        //     <span className="glyphicon glyphicon-ok"
        //     aria-hidden="true"> {item}</span>
        //     );
        // }.bind(this));

        console.log(this.props.select.hotels);
        return (
            <div>

                <div className="search-page" style={padding}>
                    <div className="container">


                        <div className="tab-content" style={borderStyle}>
                            <div role="tabpanel" className="tab-pane active" id="flights">

                                &nbsp; &nbsp;

                                <div className="row">
                                    <div className="col-xs-2 mt" style={padding}>
                                        <div className="input-field">
                                            <select style={optStyle}
                                                    onChange={(event) => formdata["city"] = event.target.value}
                                                    className="cs-select cs-skin-border" name="" id="">

                                                <option style={color} name="" id="">City</option>
                                                {
                                                    /* this.state.fromCity.map(city =>
                                                         <option style={color} value={city}>{city}</option>
                                                     )*/
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
                                                               defaultText="Check in"
                                                               format={this.state.format}
                                                               viewMode={this.state.mode}
                                                               inputFormat={this.state.inputFormat}
                                                               onChange={this.handlehotelChange}/>

                                            </div>
                                        </div>
                                    </div>

                                    &nbsp; &nbsp;

                                    <div className="col-xs-2 mt" style={padding}>

                                        <div className="input-field">

                                            <div className="input-field">
                                                <DateTimeField mode="date"
                                                               dateTime={this.state.comingDate}
                                                               minDate={this.state.startDate}
                                                               defaultText="Check out"
                                                               format={this.state.format}
                                                               viewMode={this.state.mode}
                                                               inputFormat={this.state.inputFormat}
                                                               onChange={this.handlehotelChange1}/>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-4 mt" style={padding}>


                                        &nbsp; &nbsp;

                                        <input placeholder="Rooms" style={w} type='number' onChange={(event) => {
                                            formdata["noofrooms"] = event.target.value
                                        }}
                                        />

                                    </div>

                                    <div className="col-xs-1" style={padding}>
                                        <button className="btn btn-primary btn-block" style={btnStyle}
                                                onClick={() => this.searchHotels()}>-->
                                        </button>
                                        {/*<input type="submit"
                                                                           className="btn btn-primary btn-block"
                                                                           value="Search Flight"/>*/}
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="search-grids">
                            <div className="col-md-3 search-grid-left" style={{marginTop: 25}}>

                                <div className="range">
                                    <h3 className="sear-head">Filter by Price</h3><br/>
                                    <Range min={100} max={2000} defaultValue={[150, 500]}
                                           tipFormatter={value => `$${value}`} onChange={sliderChanged}/>
                                </div>

                                <div className="range-two">
                                    <h3 className="sear-head">Filter by Stars</h3>
                                    <ReactStars count={5} onChange={ratingChanged} size={24} color2={'#ffd700'}/>

                                </div>
                            </div>
                            <br/>

                            <div className="col-md-9 search-grid-right">

                                {this.props.select.hotels.map((item, index) => {
                                        return (
                                            <div className="col-md-12 search-grid-right" data-toggle="collapse">
                                                <div className="hotel-rooms">
                                                    <div className="hotel-left" onClick={() => itemChange(item.HID)}>
                                                        <a style={{fontSize: 25, color: '#DC143C'}}><span
                                                            class="glyphicon glyphicon-bed"
                                                            aria-hidden="true">{item.name}</span></a><br></br>
                                                        <p style={{marginRight: 110}}>{item.city}</p>
                                                        <div className="hotel-left-grids">
                                                            <div className="hotel-left-one">
                                                                <img src={imgs[Math.floor(Math.random() * imgs.length)]}
                                                                     width={50} height={200} alt=""/>
                                                            </div>
                                                            <div className="hotel-left-two">
                                                                <div className="rating text-left">
                                                                    {this.getStars(item.stars)}
                                                                </div>
                                                                <span className="glyphicon glyphicon-map-marker"
                                                                      aria-hidden="true">{item.street}</span><br></br><br></br>
                                                                {this.getFreebies(index)}
                                                            </div>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                    </div>

                                                    <div className="hotel-right text-right">
                                                        <h4>{item.rooms[0].rent}</h4>
                                                        <p>Best price</p>
                                                        <a onClick={() => this.displayhotelbookingmodal()}>Continue</a>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>

                                                <div id={item.HID} style={{display: 'none'}} class="collapse">
                                                    <table id="tableMenu" className="table">
                                                        <thead>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <th style={{textAlign: 'center'}}>Room Type</th>
                                                            <th style={{textAlign: 'center'}}>Reviews</th>
                                                            <th style={{textAlign: 'center'}}>Price</th>
                                                            <th style={{textAlign: 'center'}}></th>
                                                        </tr>
                                                        {this.getRooms(index)}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        )
                                    }
                                )}

                            </div>

                            <div id="modalforhotelbooking" className="modal" style={{display: 'none'}}>
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title">
                                                <center>Booking Details</center>
                                            </h4>
                                            <button type="button" className="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <input type="text" id="firstname" placeholder="First Name"></input>
                                            <p id="messfirstname"></p>
                                            <hr></hr>
                                            <input type="text" id="lastname" placeholder="Last Name"></input>
                                            <p id="messlastname"></p>
                                            <hr></hr>
                                            <input type="text" id="email" placeholder="Email"></input>
                                            <p id="messemail"></p>
                                            <hr></hr>
                                            <input type="text" id="contact" placeholder="Phone Number"></input>
                                            <p id="messcontact"></p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary"
                                                    onClick={() => this.handlehotelbooking()}>Book Now
                                            </button>
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                                    onClick={() => handleClose()}>Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        select: state.reducerHotels
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        storeRestore: () => {
            dispatch({
                type: "RESTORE"
            });
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hotels));