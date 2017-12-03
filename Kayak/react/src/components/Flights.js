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
import axios from "axios";
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
var borderStyle = {border:"thin solid #ff5c24", padding:0}
var newRange=[100,2000];
var newRangeRound=[100,2000];
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
        origRoundData : [],
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
        inputFormat: "DD/MM/YYYY",
        date: "2017-11-21",
        format: "YYYY-MM-DD",
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

        p1:false,p2:false,p3:false,p4:false,
        q1:false,q2:false,q3:false,q4:false,
        r1:false,r2:false,r3:false,r4:false,
        s1:false,s2:false,s3:false,s4:false,

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
              roundData:roundData, origRoundData:roundData
          },function(){console.log("roundData ",this.state.roundData);});
      }, 500);

    }

    searchFlight = () => {
        if (this.state.return_enable === true) {
            console.log(this.props.select);
            var inputData = "from city " + this.state.selectedFrom + "to city " + this.state.selectedTo + "going date" + this.state.goingDate + "coming date" + this.state.comingDate + " class " + this.state.selectedClass + " Adults" + this.state.noAdults + " Child " + this.state.noChild;
            var today = new Date()
            var now = new Date(this.state.goingDate)
            var going = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
            var now1 = new Date(this.state.comingDate)
            var coming = new Date(now1.getUTCFullYear(), now1.getUTCMonth(), now1.getUTCDate(), now1.getUTCHours(), now1.getUTCMinutes(), now1.getUTCSeconds());

            //alert(inputData);
            var from = this.state.selectedFrom
            var to = this.state.selectedTo
            var goingD = this.state.goingDate
            var comingD = this.state.comingDate
            var Sclass = this.state.selectedClass
            var adult = this.state.noAdults
            var child = this.state.noChild

            localStorage.setItem("Sclass", this.state.selectedClass);
            localStorage.setItem("adult", this.state.noAdults);
            localStorage.setItem("child", this.state.noChild);

            if (from === "" || to === "" || goingD === "" || comingD === "" || Sclass === "" || adult === 0)
                alert("Please select all the fields")
            else if ( adult<0 )
                alert("No of passengers cannot be negative")
            else if (from === to)
                alert("From city cannot be same as To city")
            else if ((new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())) < (new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())))
                alert("Selected date cannot be less than today's date")
            else if (coming < going)
                alert("Arrival date cannot be less than Departure date");
            else {
                var self = this;
                axios.get('http://localhost:3001/flights/search', {
                    params: {
                        from: document.getElementById('selectedFrom').value,
                        to: document.getElementById('selectedTo').value,
                        number_of_seats: document.getElementById('noAdults').value,
                        number_of_seats_c: document.getElementById('noChild').value,
                        category: document.getElementById('category').value,
                        date: this.state.goingDate
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        self.props.setFlights(response.data.returnFlightS);
                        localStorage.setItem("searchedFlights", JSON.stringify(response.data.returnFlightS));
                        console.log("after setting localStorage ", JSON.stringify(response.data.returnFlightS));
                        localStorage.setItem("goingD", goingD);
                        localStorage.setItem("Sclass", Sclass);
                        self.props.history.push("/");
                        self.props.history.push("/flights_search");
                        //window.location.replace("/flights_search");
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                axios.get('http://localhost:3001/flights/round', {
                    params: {
                        to: document.getElementById('selectedFrom').value,
                        from: document.getElementById('selectedTo').value,
                        number_of_seats: document.getElementById('noAdults').value,
                        number_of_seats_c: document.getElementById('noChild').value,
                        category: document.getElementById('category').value,
                        date: this.state.comingDate
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        self.props.setFlights(response.data.returnFlightR);
                        localStorage.setItem("searchedFlightsR", JSON.stringify(response.data.returnFlightR));
                        console.log("after setting localStorage1 ", JSON.stringify(response.data.returnFlightR));
                        localStorage.setItem("comingD", comingD);
                        localStorage.setItem("Sclass", Sclass);
                        self.props.history.push("/");
                        self.props.history.push("/flights_search");
                        //window.location.replace("/flights_search");
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        } else {
            console.log(this.props.select);
            var inputData = "from city " + this.state.selectedFrom + "to city " + this.state.selectedTo + "going date" + this.state.goingDate + "coming date" + this.state.comingDate + " class " + this.state.selectedClass + " Adults" + this.state.noAdults + " Child " + this.state.noChild;
            var today = new Date()
            var now = new Date(this.state.goingDate)
            var going = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
            var coming = new Date(this.state.comingDate)

            //alert(inputData);
            var from = this.state.selectedFrom
            var to = this.state.selectedTo
            var goingD = this.state.goingDate
            var comingD = this.state.comingDate
            var Sclass = this.state.selectedClass
            var adult = this.state.noAdults
            var child = this.state.noChild

            localStorage.setItem("Sclass", this.state.selectedClass);
            localStorage.setItem("adult", this.state.noAdults);
            localStorage.setItem("child", this.state.noChild);

            if (from === "" || to === "" || goingD === "" || Sclass === "" || adult === "")
                alert("Please select all the fields")
            else if (from === to)
                alert("From city cannot be same as To city")
            else if ((new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())) < (new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())))
                alert("Selected date cannot be less than today's date")
            else {
                var self = this;
                axios.get('http://localhost:3001/flights/search', {
                    params: {
                        from: document.getElementById('selectedFrom').value,
                        to: document.getElementById('selectedTo').value,
                        number_of_seats: document.getElementById('noAdults').value,
                        number_of_seats_c: document.getElementById('noChild').value,
                        category: document.getElementById('category').value,
                        date: this.state.goingDate
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        self.props.setFlights(response.data.returnFlightS);
                        localStorage.setItem("searchedFlights", JSON.stringify(response.data.returnFlightS));
                        localStorage.setItem("goingD", goingD);
                        localStorage.setItem("Sclass", Sclass);
                        self.props.history.push("/");
                        self.props.history.push("/flights_search");
                        //window.location.replace("/flights_search");
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }

    handleChange = (newDate) => {
        return this.setState({goingDate: newDate});
    };

    handleChange1 = (newDate) => {
        return this.setState({comingDate: newDate});
    };


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

    sliderChangedRound = (newRange1) => {
        newRangeRound=newRange1;
        console.log("slider changed",newRangeRound)

        this.handleRoundFilter()
    }

    handleP1 = () => {
        console.log("In handle p1")
        this.setState({p1:(!this.state.p1)},this.handleRoundFilter)
    }
    handleP2 = () => {
        console.log("In handle p2")
        this.setState({p2:(!this.state.p2)},this.handleRoundFilter)
    }
    handleP3 = () => {
        console.log("In handle p3")
        this.setState({p3:(!this.state.p3)},this.handleRoundFilter)
    }
    handleP4 = () => {
        console.log("In handle p4")
        this.setState({p4:(!this.state.p4)},this.handleRoundFilter)
    }

    handleQ1 = () => {
        console.log("In handle q1")
        this.setState({q1:(!this.state.q1)},this.handleRoundFilter)
    }
    handleQ2 = () => {
        console.log("In handle q2")
        this.setState({q2:(!this.state.q2)},this.handleRoundFilter)
    }
    handleQ3 = () => {
        console.log("In handle q3")
        var q3 = !this.state.q3
        console.log(q3)
        this.setState({q3:q3},this.handleRoundFilter)
    }
    handleQ4 = () => {
        console.log("In handle q4")
        this.setState({q4:(!this.state.q4)},this.handleRoundFilter)
    }

    handleR1 = () => {
        console.log("In handle r1")
        this.setState({r1:(!this.state.r1)},this.handleRoundFilter)
    }
    handleR2 = () => {
        console.log("In handle r2")
        this.setState({r2:(!this.state.r2)},this.handleRoundFilter)
    }
    handleR3 = () => {
        console.log("In handle r3")
        this.setState({r3:(!this.state.r3)},this.handleRoundFilter)
    }
    handleR4 = () => {
        console.log("In handle r4")
        this.setState({r4:(!this.state.r4)},this.handleRoundFilter)
    }

    handleS1 = () => {
        console.log("In handle s1")
        this.setState({s1:(!this.state.s1)},this.handleRoundFilter)
    }
    handleS2 = () => {
        console.log("In handle s2")
        this.setState({s2:(!this.state.s2)},this.handleRoundFilter)
    }
    handleS3 = () => {
        console.log("In handle s3")
        this.setState({s3:(!this.state.s3)},this.handleRoundFilter)
    }
    handleS4 = () => {
        console.log("In handle s4")
        this.setState({s4:(!this.state.s4)},this.handleRoundFilter)
    }

    handleRoundFilter = () => {
        var flag1=false,flag2=false,flag3=false,flag4=false,flag5=false
        if (this.state.p1 === true || this.state.p2 === true || this.state.p3 === true || this.state.p4 === true)
            flag2=true
        if (this.state.q1 === true || this.state.q2 === true || this.state.q3 === true || this.state.q4 === true)
            flag3=true
        if (this.state.r1 === true || this.state.r2 === true || this.state.r3 === true || this.state.r4 === true)
            flag4=true
        if (this.state.s1 === true || this.state.s2 === true || this.state.s3 === true || this.state.s4 === true)
            flag5=true
        if(newRangeRound[0]===100 && newRangeRound[1]===2000)
        {
            console.log("in if")
            flag1=false;
        }
        else
        {
            flag1=true
            console.log("in else")
        }

        var newData = []
        var newData1 = []
        var newData2 = []
        var newData3 = []
        var newData4 = []
        var newData5 = []

        var flight = this.state.origRoundData

        if(this.state.p1){
            console.log("In p1")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].flight1.time_s>="00:00" && flight[i].flight1.time_s<="05:59")
                {
                    newData2.push(flight[i])
                }
            }
        }
        if(this.state.p2){
            console.log("In p2")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].flight1.time_s>="06:00" && flight[i].flight1.time_s<="11:59")
                {
                    newData2.push(flight[i])
                }
            }
        }
        if(this.state.p3){
            console.log("In p3")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].flight1.time_s>="12:00" && flight[i].flight1.time_s<="17:59")
                {
                    newData2.push(flight[i])
                }
            }
        }
        if(this.state.p4){
            console.log("In c4")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].flight1.time_s>="18:00" && flight[i].flight1.time_s<="23:59")
                {
                    newData2.push(flight[i])
                }
            }
        }


        if(this.state.q1){
            console.log("In q1")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].flight1.time_e>="00:00" && flight[i].flight1.time_e<="05:59")
                {
                    newData3.push(flight[i])
                }
            }
        }
        if(this.state.q2){
            console.log("In q2")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].flight1.time_e>="06:00" && flight[i].flight1.time_e<="11:59")
                {
                    newData3.push(flight[i])
                }
            }
        }
        if(this.state.q3){
            console.log("In q3")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].flight1.time_e>="12:00" && flight[i].flight1.time_e<="17:59")
                {
                    newData3.push(flight[i])
                }
            }
        }
        if(this.state.q4){
            console.log("In c4")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].flight1.time_e>="18:00" && flight[i].flight1.time_e<="23:59")
                {
                    newData3.push(flight[i])
                }
            }
        }

        if(this.state.r1){
            console.log("In r1")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].flight2.time_s>="00:00" && flight[i].flight2.time_s<="05:59")
                {
                    newData4.push(flight[i])
                }
            }
        }
        if(this.state.r2){
            console.log("In r2")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].flight2.time_s>="06:00" && flight[i].flight2.time_s<="11:59")
                {
                    newData4.push(flight[i])
                }
            }
        }
        if(this.state.r3){
            console.log("In r3")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].flight2.time_s>="12:00" && flight[i].flight2.time_s<="17:59")
                {
                    newData4.push(flight[i])
                }
            }
        }
        if(this.state.r4){
            console.log("In r4")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].flight2.time_s>="18:00" && flight[i].flight2.time_s<="23:59")
                {
                    newData2.push(flight[i])
                }
            }
        }

        if(this.state.s1){
            console.log("In s1")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].flight2.time_e>="00:00" && flight[i].flight2.time_e<="05:59")
                {
                    newData5.push(flight[i])
                }
            }
        }
        if(this.state.s2){
            console.log("In s2")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].flight2.time_e>="06:00" && flight[i].flight2.time_e<="11:59")
                {
                    newData5.push(flight[i])
                }
            }
        }
        if(this.state.s3){
            console.log("In s3")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].flight2.time_e>="12:00" && flight[i].flight2.time_e<="17:59")
                {
                    newData5.push(flight[i])
                }
            }
        }
        if(this.state.s4){
            console.log("In c4")
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].flight2.time_e>="18:00" && flight[i].flight2.time_e<="23:59")
                {
                    newData5.push(flight[i])
                }
            }
        }

        for (var i = 0; i < flight.length; i++) {
            if (flight[i].total >= newRangeRound[0] && flight[i].total <= newRangeRound[1]) {
                newData1.push(flight[i])
            }
        }

        var n = 0;
        var newArr = []

        if(flag1===true)
        {
            newArr[n] = newData1
            n++;
        }
        if(flag2===true)
        {
            newArr[n] = newData2
            n++;
        }
        if(flag3===true)
        {
            newArr[n] = newData3
            n++;
        }
        if(flag4===true)
        {
            newArr[n] = newData4
            n++;
        }
        if(flag5===true)
        {
            newArr[n] = newData5
            n++;
        }

        if(newArr.length!=0){
            var result = newArr.shift().filter(function(v) {
                return newArr.every(function(a) {
                    return a.indexOf(v) !== -1;
                });
            });
            newData=result
        }
        else
        {
            newData=this.state.origRoundData
        }

        console.log("Changed Data",newData)

        this.setState({roundData:newData})

    }




    open = () => {
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
          else if(age[i]<0)
              alert("Age cannot be negative")
          else if(age[i]<=3)
              alert("Age cannot be less than 3")
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
          else if(age1[i]<0)
              alert("Age cannot be negative")
          else if(age1[i]>3)
              alert("Child Age cannot be greater than 3")
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
                    if (res.status === 201) {
                        localStorage.setItem("isLoggedIn",true)
                        localStorage.setItem("isUser",true)
                        this.close1('login')
                        //window.location.replace()
                       self.props.history.push('/flight_booking')
                    } else if (res.status === 401) {
                        localStorage.setItem("isLoggedIn",false)
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
            this.setState({showLoginModal: false});
        }
        else if (data === 'signup') {
            this.setState({showSignupModal: false});
        }
    };
    open1 = (data) => {
        if (data === 'login') {
            this.setState({showLoginModal: true});
        }
        else if (data === 'signup') {
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

              <div className="fh5co-hero" style={{marginTop:100}}>
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
                                                    onChange={(event) => {
                                                        this.props.setSelectedFrom(event.target.value);
                                                        this.setState({selectedFrom: event.target.value})
                                                    }}  className="cs-select cs-skin-border" name="" id="selectedFrom">
                                                <option style={color} name="" id="">From City</option>
                                                {
                                                    this.state.fromCity.map(city=>
                                                        <option style={color} value={city}>{city}</option>

                                                    )
                                                }

                                            </select>

                                            &nbsp; &nbsp;


                                            <select style={optStyle}
                                                    onChange={(event) => {
                                                        this.props.setSelectedTo(event.target.value);
                                                        this.setState({selectedTo: event.target.value})
                                                    }}  className="cs-select cs-skin-border" name="" id="selectedTo">
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
                                                onChange={(event)=>this.setState({selectedClass:event.target.value})}  className="cs-select cs-skin-border" name="" id="category">
                                            <option style={color} value="class">Class</option>
                                            <option style={color} value="economy">Economy</option>
                                            <option style={color} value="first">First</option>
                                            <option style={color} value="business">Business</option>
                                        </select>

                                        &nbsp; &nbsp;
                                        <input placeholder="Adult" style={w} id="noAdults" type='number' onChange={(event) => {
                                            this.setState({
                                                noAdults: event.target.value
                                            });

                                        }}
                                        />

                                        &nbsp; &nbsp;

                                        <input placeholder="Children" style={w} id="noChild" type='number' onChange={(event) => {
                                            this.setState({
                                                noChild: event.target.value
                                            });

                                        }}
                                        />


                                    </div>

                                    <div className="col-xs-1" style={padding}>
                                        <button className="btn btn-primary btn-block" style={{btnStyle, padding: 0, height: 40, width: 40, borderRadius: 0}} onClick={()=>this.searchFlight()}><svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor"><path d="M31.88 12.32l-1.43 1.4L39.56 23H20v2h19.56l-9.11 9.27 1.43 1.41L43.35 24 31.88 12.32M11 23h6v2h-6zM5 23h3v2H5z"/></svg></button>
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
                                                    <span aria-hidden="true"></span>{flight.f_id}
                                                    <span className="dot-inner" aria-hidden="true"> &nbsp; <tr>{flight.time_s}</tr>---- <tr>{flight.time_e}</tr></span><br/>
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

                                                    <th style={{textAlign: 'center'}}>Flight</th>
                                                    <th style={{textAlign: 'center'}}>From</th>
                                                    <th style={{textAlign: 'center'}}>To</th>
                                                    <th style={{textAlign: 'center'}}>Duration</th>
                                                    <th style={{textAlign: 'center'}}>Price</th>
                                                    <th style={{textAlign: 'center'}}></th>
                                                </tr>
                                                <tr>
                                                    <td> {flight.f_id} </td>
                                                    <td>{this.props.select.selectedFrom}</td>
                                                    <td>{this.props.select.selectedTo}</td>
                                                    <td> {flight.duration} </td>
                                                    <td> {flight.fare} </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                              {(this.state.flightData.length === 0) ? <div className="alert alert-danger" role="alert">
                                <strong>No such flights found!</strong>
                              </div> : ''}

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

              <div className="fh5co-hero" style={{marginTop:100}}>
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
                                                    onChange={(event) => {
                                                        this.props.setSelectedFrom(event.target.value);
                                                        this.setState({selectedFrom: event.target.value})
                                                    }}  className="cs-select cs-skin-border" name="" id="selectedFrom">
                                                <option style={color} name="" id="">From City</option>
                                                {
                                                    this.state.fromCity.map(city=>
                                                        <option style={color} value={city}>{city}</option>

                                                    )
                                                }

                                            </select>

                                            &nbsp; &nbsp;


                                            <select style={optStyle}
                                                    onChange={(event) => {
                                                        this.props.setSelectedTo(event.target.value);
                                                        this.setState({selectedTo: event.target.value})
                                                    }}  className="cs-select cs-skin-border" name="" id="selectedTo">
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
                                                onChange={(event)=>this.setState({selectedClass:event.target.value})}  className="cs-select cs-skin-border" name="" id="category">
                                            <option style={color} value="class">Class</option>
                                            <option style={color} value="economy">Economy</option>
                                            <option style={color} value="first">First</option>
                                            <option style={color} value="business">Business</option>
                                        </select>

                                        &nbsp; &nbsp;
                                        <input placeholder="Adult" style={w} type='number' id="noAdults" onChange={(event) => {
                                            this.setState({
                                                noAdults: event.target.value
                                            });

                                        }}
                                        />

                                        &nbsp; &nbsp;

                                        <input placeholder="Children" style={w} type='number' id="noChild" onChange={(event) => {
                                            this.setState({
                                                noChild: event.target.value
                                            });

                                        }}
                                        />


                                    </div>

                                    <div className="col-xs-1" style={padding}>
                                        <button className="btn btn-primary btn-block" style={{btnStyle, padding: 0, height: 40, width: 40, borderRadius: 0}} onClick={()=>this.searchFlight()}><svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor"><path d="M31.88 12.32l-1.43 1.4L39.56 23H20v2h19.56l-9.11 9.27 1.43 1.41L43.35 24 31.88 12.32M11 23h6v2h-6zM5 23h3v2H5z"></path></svg></button>
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
                                    <Range min={100} max={2000} defaultValue={[100, 2000]} tipFormatter={value => `${value}`} onChange={this.sliderChangedRound}/>
                                </div>
                                <div className="range">
                                    <h3 className="sear-head">Departure Time</h3><br></br>
                                    <input type="checkbox" onChange={this.handleP1}/>00:00 - 06:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleP2}/>06:00 - 12:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleP3}/>12:00 - 18:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleP4}/>18:00 - 23:59
                                </div>
                                <div className="range">
                                    <h3 className="sear-head">Arrival Time</h3><br></br>
                                    <input type="checkbox" onChange={this.handleQ1}/>00:00 - 06:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleQ2}/>06:00 - 12:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleQ3}/>12:00 - 18:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleQ4}/>18:00 - 23:59
                                </div>
                                <div className="range">
                                    <h3 className="sear-head">Departure Time</h3><br></br>
                                    <input type="checkbox" onChange={this.handleR1}/>00:00 - 06:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleR2}/>06:00 - 12:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleR3}/>12:00 - 18:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleR4}/>18:00 - 23:59
                                </div>
                                <div className="range">
                                    <h3 className="sear-head">Arrival Time</h3><br></br>
                                    <input type="checkbox" onChange={this.handleS1}/>00:00 - 06:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleS2}/>06:00 - 12:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleS3}/>12:00 - 18:00
                                    <br/>
                                    <input type="checkbox" onChange={this.handleS4}/>18:00 - 23:59
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
                                                            <span aria-hidden="true"></span>{flight.flight1.f_id}
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
                                                                <span aria-hidden="true"></span>{flight.flight2.f_id}
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
                              {(this.state.roundData.length === 0) ? <div className="alert alert-danger" role="alert">
                                <strong>No such flights found!</strong>
                              </div> : ''}
                            </div>

                        </div>

                  </div></div></div></div>

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
