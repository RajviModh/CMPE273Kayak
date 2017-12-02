import React, {Component} from 'react';
import '../css/hotel-style.css';
import '../css/bootstrap.css';
import * as API from '../api/API';
import ReactStars from 'react-stars';
import DateTimeField from 'react-bootstrap-datetimepicker';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';
import Login from './Login';
import Signup from './Signup';
import {Modal} from 'react-bootstrap';

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
var newRange=[100,2000];
var newRating1=0;


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
        origHotelData : [],
        HotelData :[],
        goingDate: new Date(),
        comingDate: new Date(),
        format: "YYYY-MM-DD",
        inputFormat: "DD/MM/YYYY",
        mode: "date",
        checkindate: "",
        checkoutdate: "",
        showLoginModal: false,
        showSignupModal: false,
    };

    componentWillMount(){
        this.setState({
            origHotelData : this.props.select.hotels,
            HotelData: this.props.select.hotels
        })
    }

    close1 = (data) => {

        if (data === 'login') {
            //alert("in login of close");
            this.setState({showLoginModal: false});
        }
        else if (data === 'signup') {
            alert("in signup of close");
            this.setState({showSignupModal: false});
        }
    };
    open1 = (data) => {
        if (data === 'login') {
            alert("in login of open");
            this.setState({showLoginModal: true});
        }
        else if (data === 'signup') {
            alert("in signup of open");
            this.setState({showSignupModal: true});
        }
    };
    handleSubmit = (userdata) => {
        var isEmailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(userdata.username)

        if(userdata.userdata==="" || userdata.password===""){
            alert("Please insert all the fields")
        }
        else if(!isEmailValid)
        {
            alert("Email id invalid. Please try again.")
        }
        else
        {
            var self=this
            API.doLogin(userdata)
                .then((res) => {
                    //alert("back in newer homepage : " + JSON.stringify(res));
                    if (res.status === '201') {
                        localStorage.setItem("isLoggedIn",true)
                        alert(localStorage.getItem("isLoggedIn"))
                        localStorage.setItem("isUser",true)
                        alert(localStorage.getItem("isUser"))
                        this.close1('login')
                        // window.location.replace()
                        self.props.history.push('/hotelbooking');
                    } else if (res.status === '401') {
                        localStorage.setItem("isLoggedIn",false)
                        alert(localStorage.getItem("isLoggedIn"))
                        alert("Wrong username or password. Try again..!!")
                    }
                });}
    };
    handleSignUp = (userdata) => {

        var isEmailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(userdata.username)

        if(userdata.userdata==="" || userdata.password===""){
            alert("Please insert all the fields")
        }
        else if(!isEmailValid)
        {
            alert("Email id invalid. Please try again.")
        }
        else
        {

            API.doSignup(userdata)
                .then((res) => {
                    alert("back in handle signup response : " + JSON.stringify(res));
                    if (res.code === '201') {
                        alert("You have sign up successfully")
                        this.open1('login')
                    }
                    else if (res.code === '401' && res.value === "User already exists") {
                        alert("You cannot regiister. User already exists with this email id.")

                    }
                    else {
                        alert("Try Again. Error happened.")

                    }

                })
        }
    };


    handlehotelChange = (newDate) => {
        this.state.checkindate = newDate;
        formdata["fromDate"] = newDate;
    };
    handlehotelChange1 = (newDate) => {
        this.state.checkoutdate = newDate;
        formdata["toDate"] = newDate;
    };
    displayhotelbookingmodal = (HID, RID, hotelname, roomtype, rent) => {

        var selectedHotel = {HID, RID, name: hotelname, type: roomtype, rent: rent};

        var bookingclick = document.getElementById("modalforhotelbooking");

        if (bookingclick.style.display == "none") {
            bookingclick.style.display = 'block';
        } else {
            bookingclick.style.display = 'none';
        }
        this.props.selectedOption(selectedHotel);
    }
    searchHotels = () => {
        var city = document.getElementById("city").value;
        var rooms = document.getElementById("noofrooms").value;

        if (city == "") {
            window.alert("Please enter city name")
        } else if (this.state.checkindate == "") {
            window.alert("Please enter check in date")
        } else if (this.state.checkoutdate == "") {
            window.alert("Please enter check out date")
        } else if (rooms == "") {
            window.alert("Please enter number of rooms")
        } else if (rooms <= 0) {
            window.alert("Please enter valid number of rooms")
        } else {
            var bookingdetails = {userid: 1, city:city,rooms:rooms,checkin:this.state.checkindate,checkout:this.state.checkoutdate}
            this.props.storeHotelBookingRequest(bookingdetails)
            let responseStatus;
            API.searchHotels(formdata)
                .then((res) => {
                    responseStatus = res.status;
                    try {
                        return res.json();
                    }
                    catch(err){
                        window.alert("Some error..Please try again later")
                    }
                }).then(jsonData => {
                if (responseStatus === 200) {
                    try {
                        console.log("Before storing")
                        this.props.storeHotels(jsonData.availableHotels);
                        console.log("After storing")
                    }
                    catch (err) {
                        window.alert("Some error. Please try again later..")
                    }
                    this.props.history.push("/hotels");

                } else if (responseStatus === 500) {
                    window.alert("Bad request. Please try again later..")
                }
            });
        }
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

            var isLoggedIn = localStorage.getItem("isLoggedIn")
            if(isLoggedIn)
            {
                var details = {firstname: firstname, lastname:lastname, email: email, contact: contact};
                this.props.storeDetails(details);
                this.props.history.push('/hotelbooking');
            }
            else
            {
                this.open1('login')
            }


        }

    }
    getStars = (star) => {
        var stars = [];

        for (var i = 1; i <= star; i++) {
            stars.push(<span>☆</span>);
        }
        return stars;
    };
    getRooms = (hotelIndex, HID, hotelname) => {

        var rooms = this.props.select.hotels[hotelIndex].rooms;

        rooms = rooms.map((room, index) => {

            return ( <tr>
                <td> {room.type}</td>
                <td> {room.rent}</td>
                <td> {room.availableRooms}</td>
                <button className="btn btn-primary" id="download" type="button"
                        onClick={() => this.displayhotelbookingmodal(HID, room.RID, hotelname, room.type, room.rent)}>
                    Continue
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

    sliderChanged = (newRange1) => {
        newRange=newRange1
        this.handleFilter()
    }

    ratingChanged = (newRating) => {
        console.log(newRating);
        newRating1=newRating
        this.handleFilter()
    }

    handleFilter = () => {
        var newData = []
        var newData1 = []
        var newData2 = []
        console.log(newRating1);
        for (var i = 0; i < this.state.origHotelData.length; i++) {

            if (this.state.origHotelData[i].rooms[0].rent >= newRange[0] && this.state.origHotelData[i].rooms[0].rent <= newRange[1]) {
                newData1.push(this.state.origHotelData[i])
            }

        }

        for (var i = 0; i < this.state.origHotelData.length; i++) {
            if (this.state.origHotelData[i].stars >= newRating1) {
                newData2.push(this.state.origHotelData[i])
            }
        }


        var newArr = []
            newArr[0]=newData1
            newArr[1]=newData2
        let result;
        if(newArr.length!=0){
            result = newArr.shift().filter(function(v) {
                return newArr.every(function(a) {
                    return a.indexOf(v) !== -1;
                });
            });
            newData=result
        }

        console.log("Changed Data",newData)

        this.setState({HotelData:newData})

    }


    render() {


        var status, url;


        console.log(this.props.select.hotels);
        return (
            <div>

                <div className="search-page" style={padding}>
                    <div className="container">


                        <div className="tab-content" style={borderStyle}>
                            <div role="tabpanel" className="tab-pane active" id="flights">

                                &nbsp; &nbsp;

                               <div className="row">
                                 <div className="col-xs-2 mt">
                                   <div className="input-field">
                                     <input type="text" className="form-control"
                                            id="city"
                                            placeholder="Los Angeles, USA"
                                            onChange={(event) => formdata["city"] = event.target.value}/>
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

                                        <input placeholder="Rooms" style={w} type='number' id="noofrooms" onChange={(event) => {
                                            formdata["requiredNoOfRooms"] = Number(event.target.value)
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
                                           tipFormatter={value => `$${value}`} onChange={this.sliderChanged}/>
                                </div>

                                <div className="range-two">
                                    <h3 className="sear-head">Filter by Stars</h3>
                                    <ReactStars count={5} onChange={this.ratingChanged} size={24} color2={'#ffd700'}/>

                                </div>
                            </div>
                            <br/>

                            <div className="col-md-9 search-grid-right">

                                {this.state.HotelData.map((item, index) => {
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
                                                        <a onClick={() => this.displayhotelbookingmodal(item.HID, item.rooms[0].RID, item.name, item.rooms[0].type, item.rooms[0].rent)}>Continue</a>
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
                                                            <th style={{textAlign: 'center'}}>Price</th>
                                                            <th style={{textAlign: 'center'}}>Available Rooms</th>
                                                            <th style={{textAlign: 'center'}}></th>
                                                        </tr>
                                                        {this.getRooms(index, item.HID, item.name)}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        )
                                    }
                                )}
                              {(this.state.HotelData.length === 0) ? <div className="alert alert-danger" role="alert">
                                <strong>No such hotels found!</strong>
                              </div> :  ''}
                            </div>

                            <div>
                                <Modal show={this.state.showLoginModal} onHide={() => {
                                    this.close('login')
                                }}>
                                    {/* <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>*/}
                                    <Modal.Body>
                                        <Login handleSubmit={this.handleSubmit}/>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <div className="col-sm-10 col-md-10">
                                            Don't have an account ?
                                            <button onClick={() => {
                                                this.close1('login')
                                                this.open1('signup')
                                            }}>Sign Up
                                            </button>
                                            <button onClick={() => {
                                                this.close1('login')
                                            }}>Close
                                            </button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>

                            </div>
                            <div>
                                <Modal show={this.state.showSignupModal} onHide={() => {
                                    this.close('signup')
                                }}>
                                    <Modal.Body>
                                        <Signup handleSignUp={this.handleSignUp}/>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <div className="col-sm-10 col-md-10">
                                            Already have an account ?
                                            <button onClick={() => {
                                                this.close1('signup')
                                                this.open1('login')
                                            }}>Sign in
                                            </button>
                                            <button onClick={() => {
                                                this.close1('signup')
                                            }}>Close
                                            </button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>

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
        selectedOption: (data) => {
            dispatch({
                type: "STORESELECTEDHOTELS",
                payload: {data: data}
            });
        },
        storeDetails: (data) => {
            dispatch({
                type: "STOREUSERDETAILS",
                payload: {data: data}
            });
        },
        storeHotelBookingRequest: (data) => {
        console.log("data is " + data);
        dispatch({
          type: "STOREHOTELBOOKINGREQUEST",
          payload: {data: data}
        });
       },
       storeHotels: (data) => {
        console.log("data is " + data);
        dispatch({
          type: "STOREHOTELS",
          payload: {data: data}
        });
       },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hotels));