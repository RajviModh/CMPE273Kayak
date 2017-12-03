import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import * as API from '../api/API';
import $ from 'jquery'
import { Link,Route, withRouter } from 'react-router-dom';


var padding = {padding:0}

var align = {float:'left'}

class UserProfile extends Component{

    state = {
        fname : '',
        lname : '',
        email:'',
        contact_no:'',
        add1:'',
        add2:'',
        city:'',
        state:'',
        zip:''
    };

    componentWillMount(){
        API.fetchUserProfile({}).then((response) => {
            //alert("fetch profile response" + JSON.stringify(response.data))
            this.setState({
                //profile_pic:response.data.profile_pic,
                fname:response.data.fname,
                lname:response.data.lname,
                contact_no:response.data.contact_no,
                email: response.data.email,
                add1:response.data.add1,
                add2:response.data.add2,
                city:response.data.city,
                state:response.data.state,
                zip:response.data.zip

            })
            $("#options").val(this.state.state);
            console.log("current state ",this.state)
        });

    };

    saveUserProfile = (userdata) => {
        //alert("I am going to save profile" + JSON.stringify(userdata))

        var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.zip);
        var isEmailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(this.state.email)

        if(this.state.fname==="")
            alert("First name cannot be empty")
        else if(this.state.lname==="")
            alert("Last name cannot be empty")
        else if(this.state.email==="")
            alert("Email cannot be empty")
        else if(!isEmailValid)
            alert("Invalid Email")
        else if(this.state.contact_no==="")
            alert("Contact number cannot be empty")
        else if(this.state.add1==="")
            alert("Address Line 1 cannot be empty")
        else if(this.state.city==="")
            alert("City cannot be empty")
        else if(this.state.state==="")
            alert("State cannot be empty")
        else if(!isValidZip)
            alert("Invalid Zip")
        else {
            alert("Everything is valid")
            const payload = new FormData();
            payload.append('mypic', this.refs.mypic.files[0]);
            payload.append('fname', this.state.fname)
            payload.append('lname', this.state.lname)
            payload.append('email', this.state.email)
            payload.append('contact_no', this.state.contact_no)
            payload.append('add1', this.state.add1)
            payload.append('add2', this.state.add2)
            payload.append('city', this.state.city)
            payload.append('state', this.state.state)
            payload.append('zip', this.state.zip)
            var data = {userdata: userdata, payload: payload}

            console.log("Payload ", payload)
            API.saveUserProfile(payload)
                .then((status) => {
                    console.log("response after saving profile ", status)
                    if (status.status === '201') {
                        alert("Your Profile has been updated.")
                        this.props.history.push('/view_profile')
                    } else if (status === 401) {
                        alert("Error in user profile update")
                    }
                });
        }
    };
    render(){
        return(
            <div className="search-page" style={padding}>
                <div className="container">
                    <div className="search-grids">
                        <div className="col-md-3 search-grid-left">

                            </div>

                        </div>

                    <div className="col-md-7 ">
                        <div className="clearfix">
                            <form>
                                <div className="form-group">
                                    <hr/>
                                </div>
                                <div className="input-field">

                                    <input className="form-control"
                                           placeholder="First Name"
                                           type="text"
                                           value={this.state.fname}
                                           onChange={(event)=>{
                                               this.setState({
                                                   fname:event.target.value
                                               });
                                           }}
                                           required
                                           autoFocus
                                    />
                                </div>
                                <br/>
                                <div className="input-field">
                                    <input className="form-control"
                                           placeholder="Last Name"
                                           type="text"
                                           value={this.state.lname}
                                           onChange={(event)=>{
                                               this.setState({
                                                   lname:event.target.value
                                               });
                                           }}
                                           required
                                    />
                                </div>
                                <br/>

                                <div className="input-field">
                                    <input className="form-control"
                                           placeholder="Address Line 1"
                                           type="text"
                                           value={this.state.add1}
                                           onChange={(event)=>{
                                               this.setState({
                                                   add1:event.target.value
                                               });
                                           }}

                                    />
                                </div>
                                <br/>

                                <div className="input-field">
                                    <input className="form-control"
                                           placeholder="Address Line 2"
                                           type="text"
                                           value={this.state.add2}
                                           onChange={(event)=>{
                                               this.setState({
                                                   add2:event.target.value
                                               });
                                           }}

                                    />
                                </div>
                                <br/>

                                <div className="input-field">
                                    <input className="form-control"
                                           placeholder="City"
                                           type="text"
                                           value={this.state.city}
                                           onChange={(event)=>{
                                               this.setState({
                                                   city:event.target.value
                                               });
                                           }}

                                    />
                                </div>
                                <br/>

                                <div className="input-field" style={align}>
                                    <select id="options" defaultValue={this.state.state} onChange={(event)=>this.setState({state:event.target.value})}>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </select>

                                </div>
                                <br/>
                                <br/>

                                <div className="input-field">
                                    <input className="form-control"
                                           placeholder="Zip"
                                           type="text"
                                           value={this.state.zip}
                                           onChange={(event)=>{
                                               this.setState({
                                                   zip:event.target.value
                                               });
                                           }}

                                    />
                                </div>
                                <br/>

                                <div className="input-field">
                                    <input className="form-control"
                                           placeholder="Email no"
                                           type="text"
                                           value={this.state.email}
                                           onChange={(event)=>{
                                               this.setState({
                                                   email:event.target.value
                                               });
                                           }}
                                           disabled
                                    />

                                </div>
                                <br/>


                                <div className="input-field">
                                    <input className="form-control"
                                           placeholder="Phone number"
                                           type="text"
                                           value={this.state.contact_no}
                                           onChange={(event)=>{
                                               this.setState({
                                                   contact_no:event.target.value
                                               });
                                           }}
                                           required
                                    />
                                </div>
                                <br/>


                                <br/>
                                <div className="input-field">
                                    <input
                                        className={'fileupload'}
                                        type="file"
                                        ref="mypic"
                                        name="mypic"
                                    />

                                </div>
                                <br/>

                                <br/>

                                <div className="input-field">
                                    <button className="btn btn-primary btn-block" onClick={() => this.saveUserProfile(this.state)}>Update
                                    </button>
                                </div>
                            </form>



                        </div>
                    </div>
                </div>
            </div>


        );
    }
}
export default withRouter(UserProfile);