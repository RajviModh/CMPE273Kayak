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
        origFlightData: [  {
            f_id: 'AI-1',
            airline_name: 'Air India',
            fare_e: 10,
            fare_child_e: 5,
            capacity_e: 200,
            time_s: '23:23',
            time_e: '01:25',
            duration: '2:02' },
            {
                f_id: 'AI-2',
                airline_name: 'Indigo',
                fare_e: 500,
                fare_child_e: 20,
                capacity_e: 250,
                time_s: '00:00',
                time_e: '02:00',
                duration: '2:00' },
            {
                f_id: 'AI-3',
                airline_name: 'Indigo',
                fare_e: 300,
                fare_child_e: 20,
                capacity_e: 250,
                time_s: '02:00',
                time_e: '04:00',
                duration: '2:00' },
            {
                f_id: 'AI-4',
                airline_name: 'Indigo',
                fare_e: 200,
                fare_child_e: 20,
                capacity_e: 250,
                time_s: '04:00',
                time_e: '06:00',
                duration: '2:00' },
            {
                f_id: 'AI-5',
                airline_name: 'Indigo',
                fare_e: 400,
                fare_child_e: 20,
                capacity_e: 250,
                time_s: '12:00',
                time_e: '14:00',
                duration: '2:00' },
            {
                f_id: 'AI-248',
                airline_name: 'Indigo',
                fare_e: 250,
                fare_child_e: 20,
                capacity_e: 250,
                time_s: '15:00',
                time_e: '17:00',
                duration: '2:00' },
            {
                f_id: 'AI-6',
                airline_name: 'Indigo',
                fare_e: 250,
                fare_child_e: 20,
                capacity_e: 100,
                time_s: '23:00',
                time_e: '01:00',
                duration: '2:00' }

        ],
        flightData : [  {
            f_id: 'AI-1',
            airline_name: 'Air India',
            fare_e: 10,
            fare_child_e: 5,
            capacity_e: 200,
            time_s: '23:23:00',
            time_e: '01:25',
            duration: '2:02:00' },
            {
                f_id: 'AI-2',
                airline_name: 'Indigo',
                fare_e: 500,
                fare_child_e: 20,
                capacity_e: 250,
                time_s: '00:00',
                time_e: '02:00',
                duration: '2:00' },
            {
                f_id: 'AI-3',
                airline_name: 'Indigo',
                fare_e: 300,
                fare_child_e: 20,
                capacity_e: 250,
                time_s: '00:00',
                time_e: '02:00',
                duration: '2:00' },
            {
                f_id: 'AI-4',
                airline_name: 'Indigo',
                fare_e: 200,
                fare_child_e: 20,
                capacity_e: 250,
                time_s: '00:00',
                time_e: '02:00',
                duration: '2:00' },
            {
                f_id: 'AI-5',
                airline_name: 'Indigo',
                fare_e: 400,
                fare_child_e: 20,
                capacity_e: 250,
                time_s: '00:00',
                time_e: '02:00',
                duration: '2:00' },
            {
                f_id: 'AI-248',
                airline_name: 'Indigo',
                fare_e: 250,
                fare_child_e: 20,
                capacity_e: 250,
                time_s: '00:00',
                time_e: '02:00',
                duration: '2:00' },
            {
                f_id: 'AI-6',
                airline_name: 'Indigo',
                fare_e: 250,
                fare_child_e: 20,
                capacity_e: 100,
                time_s: '00:00',
                time_e: '02:00',
                duration: '2:00' }

        ],
        fromCity : ['SFO','SJC','LAX'],
        toCity : ['SFO','SJC','LAX'],
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
        e4:false
    };

    componentWillMount(){
        this.setState({

        });
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
                    if (flight[i].fare_e >= newRange[0] && flight[i].fare_e <= newRange[1]) {
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

   /* handleChangeArrival = () => {
        var newData = []
        var flight =this.state.origFlightData
        if(this.state.e1){
            for(var i=0;i<flight.length;i++)
            {
                console.log(flight[i].time_e>="00:00")
                if(flight[i].time_e>="00:00" && flight[i].time_e<="05:59")
                {
                    newData.push(flight[i])
                }
            }
        }
        if(this.state.e2){
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].time_e>="06:00" && flight[i].time_e<="11:59")
                {
                    newData.push(flight[i])
                }
            }
        }
        if(this.state.e3){
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].time_e>="12:00" && flight[i].time_e<="17:59")
                {
                    newData.push(flight[i])
                }
            }
        }
        if(this.state.e4){
            for(var i=0;i<flight.length;i++)
            {
                if(flight[i].time_e>="18:00" && flight[i].time_e<="23:59")
                {
                    newData.push(flight[i])
                }
            }
        }
        if(this.state.e1===false && this.state.e2===false && this.state.e3===false && this.state.e4===false )
            newData=flight
        this.setState({flightData:newData})
    }*/

    render() {

        var RoomTypes = [];
        console.log('files render');
        var status,url;


        RoomTypes = this.state.flightData.map(function(item,index){
            return(
                <tr>
                    <td> {item.f_id} </td>
                    <td> {item.airline_name} </td>
                    <td> {item.fare_e} </td>
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
                                        <label>  <input type="radio" name="optradio" onChange={()=>this.setState({return_enable:false})} />One-Way</label>
                                        <label><input type="radio" name="optradio" onChange={()=>this.setState({return_enable:true})}/>Round-Trip</label>

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
                                            <div class="container vertical-divider" onClick={()=>itemChange(flight.f_id)}>
                                                <div class="column one-third">
                                                    <div className="col-md-3 hotel-left-one">
                                                        <img src="../images/place-4.jpg" height={10} alt="" />
                                                    </div>
                                                    <div className="col-md-7">
                                                        <span className="glyphicon glyphicon-bed" aria-hidden="true"></span>{flight.f_id}
                                                        <span className="dot-inner" aria-hidden="true"> &nbsp; {flight.time_s}----{flight.time_e}</span>
                                                        &nbsp; &nbsp;
                                                        <p>Duration : {flight.duration} Hours</p>
                                                    </div>
                                                    <div className="col-md-2 text-right">
                                                        <h4>${flight.fare_e}</h4>
                                                        <p>Price</p>
                                                        <button className="btn btn-primary btn-block" style={btnStyle1} onClick={()=>alert(flight.f_id)}>Book</button>
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
                                {/*{this.state.flightData.map(flight=>
                                    <div className="col-md-12 search-grid-right" data-toggle="collapse">
                                        <div className="hotel-rooms">
                                            <div className="hotel-left" onClick={()=>itemChange(flight.f_id)}>
                                                <a href="single.html"><span class="glyphicon glyphicon-bed" aria-hidden="true"></span>{flight.f_id}</a><br></br>
                                                <p style={{marginRight:110}}> &nbsp; {flight.time_s}----{flight.time_e}</p>
                                                <div className="hotel-left-grids">
                                                    <div className="hotel-left-one">
                                                        <img src="../images/place-4.jpg" width={25} height={100} alt="" />
                                                    </div>
                                                    <div className="hotel-left-two">

                                                        <span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span> Duration : {flight.duration} Hours<br></br><br></br>

                                                    </div>
                                                    <div class="clearfix"></div>
                                                </div>
                                            </div>

                                            <div className="hotel-right text-right">
                                                <h4>${flight.fare_e}</h4>
                                                <p>Best price</p>
                                                <button className="btn btn-primary btn-block" style={btnStyle1} onClick={()=>alert(flight.f_id)}>Book</button>
                                            </div>
                                            <div className="clearfix"></div>
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

                                )}*/}

                            </div>

                        </div>

                    </div></div></div>

        );
    }
}



export default Flights;
