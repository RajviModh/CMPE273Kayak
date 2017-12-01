import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../css/hotel-style.css';
import '../css/bootstrap.css';
import CustomizedRange from './CustomizedRange';
import ReactStars from 'react-stars'
import ReactBootstrapSlider from 'react-bootstrap-slider'
import hotel1 from '../images/fb1.png';
import DateTimeField from 'react-bootstrap-datetimepicker';
import {Checkbox} from 'react-bootstrap';
import hotel from '../images/place-4.jpg';
import $ from 'jquery';
import Slider from 'rc-slider';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {Route, withRouter, Link} from 'react-router-dom';

import * as API from '../api/API';
import Login from "./Login";
import Signup from "./Signup";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

var amount = {border: 0, color:'#ffffff'};
var amount1 ={border: '0', color:'#ffffff'};

var color = {color:"black"}
var colorBlue = {color:"blue"}
var w={width:80,height:40,color:"black"}
var optStyle = {color:"Black",height:40}
var optStyle1 = {height:30}
var padding = {padding:0}
var btnStyle= {height:40, width:20}
var btnStyle1 = {height:30, textAlign:"center"}
var borderStyle = {border:"thin solid #F78536", padding:0}
var newRange=[100,2000];
var name=[]
var age=[]
var name1=[],age1=[]

const ratingChanged = (newRating) => {
    console.log(newRating);
}

const itemChange = (newItem) => {

    var toggle = document.getElementById(newItem);

    if(toggle.style.display == 'none'){
        toggle.style.display = 'block';
    }else{
        toggle.style.display = 'none';
    }
}


class Flights extends Component {

    state = {
        roundData : [],
        passengers : [],
        children : [],
        origFlightData: [],
        flightData : [],
        flightData1 : [],
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
        c1:false,
        c2:false,
        c3:false,
        c4:false,
        e1:false,
        e2:false,
        e3:false,
        e4:false,
        show_modal:false,
        showLoginModal: false,
        showSignupModal: false,
    };

    componentWillMount(){
        var self=this;
        if(localStorage.getItem("return_enable")===null || localStorage.getItem("return_enable")===undefined || localStorage.getItem("return_enable")===''){
            self.setState({
                return_enable:false
            })
        }else{
            self.setState({
                return_enable:localStorage.getItem("return_enable")
            })
        }
        setTimeout(function(){
            self.setState({
                return_enable:self.props.select.return_enable
            })
            console.log("before ",self.props.select);
            console.log("localStorage ",typeof localStorage.getItem("fromCity"));
            var roundData = []
            //var len = this.state.flightData
            //var len1 = this.state.flightData1
            var len = [];
            var len1 = [];
            if(JSON.parse(localStorage.getItem("searchedFlights"))!==null){
                len = JSON.parse(localStorage.getItem("searchedFlights"))
            }
            if(JSON.parse(localStorage.getItem("searchedFlightsR"))!==null){
                len1  = JSON.parse(localStorage.getItem("searchedFlightsR"))
            }

            console.log("len ",len);
            console.log("len1 ",len1);
            for(var i=0;i<len.length;i++)
            {
                for(var j=0;j<len1.length;j++)
                {
                    var jsonObj = {}
                    jsonObj.flight1 = len[i]
                    jsonObj.flight2 = len1[j]
                    jsonObj.total  = len[i].fare+ len1[j].fare
                    roundData.push(jsonObj);
                }
            }
            console.log("outside.. ",roundData)
            //for caluculating number of text boxes for adults and children from localStorage

            var passData = []
            var passData1 = []
            var pass = {}
            var value = localStorage.getItem("adult")
            var valueC = localStorage.getItem("child");

            for(var i=0;i<value;i++){
                pass.name = ""
                pass.age = 0
                passData.push(pass)
            }
            for(var i=0;i<valueC;i++){
                pass.name = ""
                pass.age = 0
                passData1.push(pass)
            }

            self.setState({noAdults : value,noChild : valueC, passengers:passData,children:passData1, selectedClass:localStorage.getItem("Sclass"), fromCity:self.props.select.fromCity, toCity:self.props.select.toCity})
            self.setState({
                flightData : JSON.parse(localStorage.getItem("searchedFlights")),
                flightData1: JSON.parse(localStorage.getItem("searchedFlightsR")),
                origFlightData : JSON.parse(localStorage.getItem("searchedFlights"))
                //flightData:self.props.select.flights,
                //origFlightData:self.props.select.flights,
            });

            //over

            self.setState({
                roundData:roundData
            },function(){console.log("roundData ",this.state.roundData);});
        }, 500);

    }


    sliderChanged = (newRange1) => {
        newRange=newRange1
        this.handleChangeDepart()
    }

    handleC1 = () => {
        console.log("In handle c1")
        this.setState({c1:(!this.state.c1)},this.handleChangeDepart)
    }
    handleC2 = () => {
        console.log("In handle c2")
        this.setState({c2:(!this.state.c2)},this.handleChangeDepart)
    }
    handleC3 = () => {
        console.log("In handle c3")
        this.setState({c3:(!this.state.c3)},this.handleChangeDepart)
    }
    handleC4 = () => {
        console.log("In handle c4")
        this.setState({c4:(!this.state.c4)},this.handleChangeDepart)
    }

    handleChangeDepart = () => {
        var newData = []
        var newData1 = []
        var newData2 = []
        var newData3 = []
        var flight =this.state.origFlightData
        //var selectedClass = this.state.selectedClass;
        var selectedClass = "Economy"
        if(this.state.c1){
            console.log("In c1")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].time_s>="00:00" && flight[i].time_s<="05:59")
                {
                    newData1.push(flight[i])
                }
            }
        }
        if(this.state.c2){
            console.log("In c2")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].time_s>="06:00" && flight[i].time_s<="11:59")
                {
                    newData1.push(flight[i])
                }
            }
        }
        if(this.state.c3){
            console.log("In c3")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].time_s>="12:00" && flight[i].time_s<="17:59")
                {
                    newData1.push(flight[i])
                }
            }
        }
        if(this.state.c4){
            console.log("In c4")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].time_s>="18:00" && flight[i].time_s<="23:59")
                {
                    newData1.push(flight[i])
                }
            }
        }
        if(this.state.e1){
            console.log("In e1")

            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].time_e>="00:00" && flight[i].time_e<="05:59")
                {
                    newData2.push(flight[i])
                }
            }
        }
        if(this.state.e2){
            console.log("In e2")

            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].time_e>="06:00" && flight[i].time_e<="11:59")
                {
                    newData2.push(flight[i])
                }
            }

        }
        if(this.state.e3){

            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].time_e>="12:00" && flight[i].time_e<="17:59")
                {
                    newData2.push(flight[i])
                }
            }
        }
        if(this.state.e4){
            console.log("In 41")

            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].time_e>="18:00" && flight[i].time_e<="23:59")
                {
                    newData2.push(flight[i])
                }
            }
        }
        if(selectedClass==="Economy")
        {
            console.log("In economy")

            for (var i = 0; i < flight.length; i++) {
                if (flight[i].fare >= newRange[0] && flight[i].fare <= newRange[1]) {
                    newData3.push(flight[i])
                }
            }

            console.log("Changed Data",newData)
        }
        else if(selectedClass==="First")
        {

            for (var i = 0; i < flight.length; i++) {
                if (flight[i].fare_f >= newRange[0] && flight[i].fare_f <= newRange[1]) {
                    newData3.push(flight[i])
                }
            }

            console.log("Changed Data",newData)
        }
        else if(selectedClass==="Business")
        {

            for (var i = 0; i < flight.length; i++) {
                if (flight[i].fare_b >= newRange[0] && flight[i].fare_b <= newRange[1]) {
                    newData3.push(flight[i])
                }
            }

            console.log("Changed Data",newData)
        }
        var newArr = []
        if(newData3.length!=0 && newData2.length!=0 && newData1.length!=0)
        {
            newArr[0]=newData1
            newArr[1]=newData2
            newArr[2]=newData3
        }
        else if(newData1.length!=0 && newData2.length!=0)
        {
            newArr[0]=newData1
            newArr[1]=newData2
        }
        else if(newData2.length!=0 && newData3.length!=0)
        {
            newArr[0]=newData3
            newArr[1]=newData2
        }
        else if(newData1.length!=0 && newData3.length!=0)
        {
            newArr[0]=newData1
            newArr[1]=newData3
        }
        if(newArr.length!=0){
            var result = newArr.shift().filter(function(v) {
                return newArr.every(function(a) {
                    return a.indexOf(v) !== -1;
                });
            });
            newData=result
        }
        else {
            if (newData1.length != 0) {
                newData = newData1
            }
            else if (newData2.length != 0) {
                newData = newData2
            }
            else if (newData3.length != 0) {
                newData = newData3
            }
        }

        /*  var arr1 = [1,5,3]
          var arr2 = [2,3,5]
          var arr3 = [3,5,9]

          /!*var arrays = arr1.concat(arr2, arr3);*!/
          var arrays = []
          arrays[0] = arr1
          arrays[1] = arr2
          arrays[2] = arr3
          alert(arrays.length)*/

        if(this.state.e1===false && this.state.e2===false && this.state.e3===false && this.state.e4===false && this.state.c1===false && this.state.c2===false && this.state.c3===false && this.state.c4===false && newRange[0]===100 && newRange===2000)
        {
            console.log("No filter")
            newData=this.state.origFlightData
        }
        this.setState({flightData:newData})
    }

    handleE1 = () => {
        console.log("In handle e1")
        this.setState({e1:(!this.state.e1)},this.handleChangeDepart)
    }
    handleE2 = () => {
        console.log("In handle e2")
        this.setState({e2:(!this.state.e2)},this.handleChangeDepart)
    }
    handleE3 = () => {
        console.log("In handle e3")
        this.setState({e3:(!this.state.e3)},this.handleChangeDepart)
    }
    handleE4 = () => {
        console.log("In handle e4")
        this.setState({e4:(!this.state.e4)},this.handleChangeDepart)
    }

    open = () => {
        alert("in open")
        this.setState({show_modal: true})
    }

    close = () => {
        this.setState({show_modal: false});
    };

    passenger = (e) => {
        var passData = []
        var pass = {}

        for(var i=0;i<e.target.value;i++){
            pass.name = ""
            pass.age = 0
            pass.email = "",
                pass.number = ""
            passData.push(pass)
        }

        this.setState({noAdults : e.target.value, passengers:passData})

    };

    handleNameChange = (e,i) => {



        var self=this;
        var passData = this.state.passengers
        var finalPassData = []
        for(var i=0;i<passData.length;i++)
        {
            var obj = {name:name[i],age:age[i]}
            if(name[i]===undefined || age[i]===undefined || name[i]===null || age[i]===null || name[i]==='' || age[i]==='')
            { continue; }
            else
                finalPassData.push(obj)
        }

        var passData1 = this.state.children
        var finalPassData1 = []
        for(var i=0;i<passData1.length;i++)
        {
            var obj = {name:name1[i],age:age1[i]}
            if(name1[i]===undefined || age1[i]===undefined || name1[i]===null || age1[i]===null || name1[i]==='' || age1[i]==='')
            { continue; }
            else
                finalPassData1.push(obj)
        }
        if(finalPassData.length===0){
            alert("Please insert at least one passenger!!")
        }else{


            this.setState({passengers:finalPassData})
            this.props.setAdult(finalPassData);
            this.setState({children:finalPassData1})
            this.props.setChild(finalPassData1);


            var isLoggedIn = localStorage.getItem("isLoggedIn")
            if(isLoggedIn)
            {
                self.props.history.push("/flight_booking")
                console.log("adults",this.props.select.Adult);
                console.log("child",this.props.select.Child);
            }
            else
            {
                this.open1('login')
            }
        }
    }

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
                        self.props.history.push('/flight_booking')
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

    renderOneWay(){

        var RoomTypes = [];
        console.log('files render');
        var status,url;


        RoomTypes = this.state.flightData.map(function(item,index){
            return(
                <tr>
                    <td> {item.f_id} </td>
                    <td> {item.airline_name} </td>
                    <td> {item.fare} </td>
                    <button className="btn btn-primary"  id="download" type="button" onClick ={() => this.handleBook(item)}>Continue</button>
                </tr>
            );
        }.bind(this));

        return (
            <div>

                <div className="search-page" style={padding}>
                    <div className="container">


                        <div className="tab-content" style={borderStyle}>
                            <div role="tabpanel" className="tab-pane active" id="flights">

                                <div className="row">
                                    <div className="radio col-xs-1 mt" style={padding}>
                                    </div>

                                </div>


                                <div className="row">
                                    <div className="col-xs-3 mt" style={padding}>
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
                                    <div className="col-xs-2 mt" style={{display: this.state.return_enable ? 'inline-block' : 'none' ,padding:0}}>
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
                                    <div className="col-xs-4 mt" style={padding}>


                                        <select style={optStyle}
                                                onChange={(event)=>this.setState({selectedClass:event.target.value})}  className="cs-select cs-skin-border" name="" id="">
                                            <option style={color} value="class">Class</option>
                                            <option style={color} value="economy">Economy</option>
                                            <option style={color} value="first">First</option>
                                            <option style={color} value="business">Business</option>
                                        </select>

                                        &nbsp; &nbsp;
                                        <input placeholder="Adult" style={w} type='number' onChange={(event) => {
                                            this.passenger(event)
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
                                        {/*<input type="submit"
                                                                           className="btn btn-primary btn-block"
                                                                           value="Search Flight"/>*/}
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div>
                            <Modal show={this.state.show_modal} onHide={() => {
                                this.close()
                            }}>

                                <Modal.Body>
                                    <div>

                                        {this.state.passengers.map(function(item,i){
                                            return(
                                                <div>
                                                    <table>
                                                        <tr><th>Adult {i+1}:</th></tr>
                                                        <tr>
                                                            <td>Name</td>
                                                            <input key={i} type="text"
                                                                   onChange={(event) =>
                                                                   {    name[i] =event.target.value
                                                                   }}
                                                            />
                                                        </tr>
                                                        &nbsp;
                                                        <tr>
                                                            <td>Age</td>
                                                            <input type="number"
                                                                   onChange={(event) =>
                                                                   {    age[i] =event.target.value
                                                                   }}
                                                            />
                                                        </tr>
                                                        &nbsp;
                                                    </table>
                                                </div>
                                            )
                                        })}
                                        {this.state.children.map(function(item,j){
                                            return(
                                                <div>
                                                    <table>
                                                        <tr><th>Child {j+1}:</th></tr>
                                                        <tr>
                                                            <td>Name</td>
                                                            <input key={j} type="text"
                                                                   onChange={(event) =>
                                                                   {    name1[j] =event.target.value
                                                                   }}
                                                            />

                                                        </tr>
                                                        &nbsp;
                                                        <tr>
                                                            <td>Age</td>
                                                            <input type="number" min={0}
                                                                   onChange={(event) =>
                                                                   {    age1[j] =event.target.value
                                                                   }}
                                                            />
                                                        </tr>
                                                        &nbsp;
                                                    </table>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    &nbsp; &nbsp;
                                    <button onClick={()=>{this.handleNameChange()}}>Book</button>
                                </Modal.Body>
                                <Modal.Footer>
                                    <div className="col-sm-5 col-md-5">
                                        <button onClick={() => {
                                            this.close()
                                        }}>Close
                                        </button>
                                    </div>
                                </Modal.Footer>
                            </Modal>

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


                        <div className="search-grids">
                            <div className="col-md-3 search-grid-left" style={{marginTop:25}}>
                                <h3 className="sear-head">Top Filters</h3>
                                <div className="range">
                                    <h3 className="sear-head">Price</h3><br></br>
                                    <Range min={100} max={2000} defaultValue={[100, 2000]} tipFormatter={value => `${value}`} onChange={this.sliderChanged}/>
                                </div>
                                <div className="range">
                                    <h3 className="sear-head">Departure Time</h3><br></br>
                                    <input type="checkbox" onChange={this.handleC1}/>00:00 - 06:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleC2}/>06:00 - 12:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleC3}/>12:00 - 18:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleC4}/>18:00 - 23:59
                                </div>
                                <div className="range">
                                    <h3 className="sear-head">Arrival Time</h3><br></br>
                                    <input type="checkbox" onChange={this.handleE1}/>00:00 - 06:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleE2}/>06:00 - 12:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleE3}/>12:00 - 18:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleE4}/>18:00 - 23:59
                                </div>

                            </div>
                            <br/>

                            <div className="col-md-9 search-grid-right">

                                {this.state.flightData.map(flight=>
                                    <div className="col-md-12 search-grid-right" data-toggle="collapse">
                                        <div class="container vertical-divider">
                                            <div class="column one-third">
                                                <div className="col-md-3">
                                                    <img src="../images/place-4.jpg" height={50} width={50} alt="" />
                                                </div>
                                                <div className="col-md-7"  onClick={()=>itemChange(flight.f_id)}>
                                                    <span className="glyphicon glyphicon-bed" aria-hidden="true"></span>{flight.f_id}
                                                    <span className="dot-inner" aria-hidden="true"> &nbsp; {flight.time_s}----{flight.time_e}</span>
                                                    &nbsp; &nbsp;
                                                    <p>Duration : {flight.duration} Hours</p>
                                                </div>
                                                <div className="col-md-2 text-right">
                                                    <h4>${flight.fare}</h4>
                                                    <p>Price</p>
                                                    <button className="btn btn-primary btn-block" style={btnStyle1} onClick={()=>{ this.props.setSelectedFlight(flight);this.open();console.log("selected flight",this.props.select.selectedFlight);}}>Book</button>
                                                    <br/>
                                                </div>
                                            </div>
                                        </div>


                                        <div id={flight.f_id} style={{display:'none'}} class="collapse">
                                            <table id="tableMenu" className="table"  >
                                                <thead>
                                                </thead>
                                                <tbody>
                                                <tr>

                                                    <th style={{textAlign: 'center'}}>Room Type</th>
                                                    <th style={{textAlign: 'center'}}>Reviews</th>
                                                    <th style={{textAlign: 'center'}}>Price</th>
                                                    <th style={{textAlign: 'center'}}></th>
                                                </tr>
                                                {RoomTypes}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}


                            </div>

                        </div>

                    </div></div></div>

        );
    }

    renderRoundTrip(){

        var RoomTypes = [];
        console.log('files render');
        var status,url;
        var self=this;


        RoomTypes = this.state.flightData.map(function(item,index){
            return(
                <tr>
                    <td> {item.f_id} </td>
                    <td> {item.airline_name} </td>
                    <td> {item.fare} </td>
                    <button className="btn btn-primary"  id="download" type="button" onClick ={() => this.handleBook(item)}>Continue</button>
                </tr>
            );
        }.bind(this));




        return (
            <div>

                <div className="search-page" style={padding}>
                    <div className="container">


                        <div className="tab-content" style={borderStyle}>
                            <div role="tabpanel" className="tab-pane active" id="flights">

                                <div className="row">
                                    <div className="radio col-xs-1 mt" style={padding}>
                                    </div>

                                </div>


                                <div className="row">
                                    <div className="col-xs-3 mt" style={padding}>
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
                                    <div className="col-xs-2 mt" style={{display: this.state.return_enable ? 'inline-block' : 'none' ,padding:0}}>
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
                                    <div className="col-xs-4 mt" style={padding}>


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
                                        {/*<input type="submit"
                                                                           className="btn btn-primary btn-block"
                                                                           value="Search Flight"/>*/}
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div>
                            <Modal show={this.state.show_modal} onHide={() => {
                                this.close()
                            }}>

                                <Modal.Body>
                                    <div>

                                        {this.state.passengers.map(function(item,i){
                                            return(
                                                <div>
                                                    <table>
                                                        <tr><th>Adult {i+1}:</th></tr>
                                                        <tr>
                                                            <td>Name</td>
                                                            <input key={i} type="text"
                                                                   onChange={(event) =>
                                                                   {    name[i] =event.target.value
                                                                   }}
                                                            />
                                                        </tr>
                                                        &nbsp;
                                                        <tr>
                                                            <td>Age</td>
                                                            <input type="number"
                                                                   onChange={(event) =>
                                                                   {    age[i] =event.target.value
                                                                   }}
                                                            />
                                                        </tr>
                                                        &nbsp;
                                                    </table>
                                                </div>
                                            )
                                        })}
                                        {this.state.children.map(function(item,j){
                                            return(
                                                <div>
                                                    <table>
                                                        <tr><th>Child {j+1}:</th></tr>
                                                        <tr>
                                                            <td>Name</td>
                                                            <input key={j} type="text"
                                                                   onChange={(event) =>
                                                                   {    name1[j] =event.target.value
                                                                   }}
                                                            />

                                                        </tr>
                                                        &nbsp;
                                                        <tr>
                                                            <td>Age</td>
                                                            <input type="number" min={0}
                                                                   onChange={(event) =>
                                                                   {    age1[j] =event.target.value
                                                                   }}
                                                            />
                                                        </tr>
                                                        &nbsp;
                                                    </table>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    &nbsp; &nbsp;
                                    <button onClick={()=>{this.handleNameChange()}}>Book</button>
                                </Modal.Body>
                                <Modal.Footer>
                                    <div className="col-sm-5 col-md-5">
                                        <button onClick={() => {
                                            this.close()
                                        }}>Close
                                        </button>
                                    </div>
                                </Modal.Footer>
                            </Modal>

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


                        <div className="search-grids">
                            <div className="col-md-3 search-grid-left" style={{marginTop:25}}>
                                <h3 className="sear-head">Top Filters</h3>
                                <div className="range">
                                    <h3 className="sear-head">Price</h3><br></br>
                                    <Range min={100} max={2000} defaultValue={[100, 2000]} tipFormatter={value => `${value}`} onChange={this.sliderChanged}/>
                                </div>
                                <div className="range">
                                    <h3 className="sear-head">Departure Time</h3><br></br>
                                    <input type="checkbox" onChange={this.handleC1}/>00:00 - 06:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleC2}/>06:00 - 12:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleC3}/>12:00 - 18:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleC4}/>18:00 - 23:59
                                </div>
                                <div className="range">
                                    <h3 className="sear-head">Arrival Time</h3><br></br>
                                    <input type="checkbox" onChange={this.handleE1}/>00:00 - 06:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleE2}/>06:00 - 12:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleE3}/>12:00 - 18:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleE4}/>18:00 - 23:59
                                </div>
                                <div className="range">
                                    <h3 className="sear-head">Departure Time</h3><br></br>
                                    <input type="checkbox" onChange={this.handleC1}/>00:00 - 06:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleC2}/>06:00 - 12:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleC3}/>12:00 - 18:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleC4}/>18:00 - 23:59
                                </div>
                                <div className="range">
                                    <h3 className="sear-head">Arrival Time</h3><br></br>
                                    <input type="checkbox" onChange={this.handleE1}/>00:00 - 06:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleE2}/>06:00 - 12:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleE3}/>12:00 - 18:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleE4}/>18:00 - 23:59
                                </div>


                            </div>
                            <br/>

                            <div className="col-md-9 search-grid-right">
                                {
                                    this.state.roundData.map(function (flight) {

                                        return (
                                            <div>
                                                <div className="col-md-12 search-grid-right" data-toggle="collapse">
                                                    <div class="container vertical-divider">
                                                        <div class="column one-third">
                                                            <div className="col-md-3">
                                                                <img src="../images/place-4.jpg" height={50} width={50} alt="" />
                                                            </div>
                                                            <div className="col-md-7">
                                                                <span className="glyphicon glyphicon-bed" aria-hidden="true"></span>{flight.flight1.f_id}
                                                                <span className="dot-inner" aria-hidden="true"> &nbsp; {flight.flight1.time_s}----{flight.flight1.time_e}</span>
                                                                &nbsp; &nbsp;
                                                                <p>Duration : {flight.flight1.duration} Hours</p>
                                                            </div>
                                                            <div className="col-md-2 text-right">
                                                                <h4>${flight.flight1.fare}</h4>
                                                                <p>Price</p>
                                                                <br/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-12 search-grid-right" data-toggle="collapse">
                                                    <div class="container vertical-divider">
                                                        <div class="column one-third">
                                                            <div className="col-md-3">
                                                                <img src="../images/place-4.jpg" height={50} width={50} alt="" />
                                                            </div>
                                                            <div className="col-md-7">
                                                                <span className="glyphicon glyphicon-bed" aria-hidden="true"></span>{flight.flight2.f_id}
                                                                <span className="dot-inner" aria-hidden="true"> &nbsp; {flight.flight2.time_s}----{flight.flight2.time_e}</span>
                                                                &nbsp; &nbsp;
                                                                <p>Duration : {flight.flight2.duration} Hours</p>
                                                            </div>
                                                            <div className="col-md-2 text-right">
                                                                <h4>${flight.flight2.fare}</h4>
                                                                <p>Price</p>
                                                                <br/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-12 search-grid-right" data-toggle="collapse">
                                                    <div className="col-md-3">

                                                    </div>
                                                    <div className="col-md-7">

                                                    </div>
                                                    <div className="col-md-2 text-right">
                                                        <h4>${flight.total}</h4>
                                                        <p>Total Fare</p>
                                                        <button className="btn btn-primary btn-block" style={btnStyle1} onClick={()=>{ self.open();self.props.setSelectedFlight(flight.flight1);self.props.setSelectedFlightR(flight.flight2);console.log("selected flight",self.props.select.selectedFlight);console.log("selected flightR",self.props.select.selectedFlightR);}}>Book</button>
                                                        <br/>
                                                    </div>
                                                </div>


                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>

                    </div></div></div>

        );
    }

    render() {
        if(this.state.return_enable)
        { return this.renderRoundTrip();}
        else
        {
            { return this.renderOneWay();}
        }

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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Flights));
