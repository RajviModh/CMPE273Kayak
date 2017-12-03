import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import { Link,Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import $ from 'jquery';


var padding = {padding:0}

var align = {float:'left'}

var color = {color:"#F78536",'text-align':'right'}

var left = {'text-align':'left'}

var right = {'text-align':'right'}

var btnStyle= {height:40, width:100}

class DisplayProfile extends Component{

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
            alert("fetch profile response" + JSON.stringify(response.data))
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
                zip:response.data.zip,
                profile_pic:response.data.profile_pic

            })
            $("#options").val(this.state.state);
            console.log("current state ",this.state)
        });

    };

    saveUserProfile = (userdata) => {
        alert("I am going to save profile" + JSON.stringify(userdata))

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
                        alert("User Profile Updated.")
                        alert("Your Profile has been updated.")
                    } else if (status === 401) {
                        alert("Error in user profile update")
                    }
                });
        }
    };

    handleEditProfile = () => {
        alert('hi');
        this.props.history.push('/edit_profile');
    }

    render(){
        let self = this;
        return(
            <div className="search-page" style={padding}>
                <div className="container">
                    <div className="search-grids">
                        <div className="col-md-3 search-grid-left">
                            <img src={"data:image/jpeg;base64,"+this.state.profile_pic} height={100} width={200} alt={this.state.profile_pic}/>
                        </div>

                    </div>

                    <div className="col-md-7 ">
                        <div className="clearfix">
                            <form>
                                <div className="form-group">
                                    <hr/>
                                </div>
                                <table>
                                <tr>
                                    <td>
                                        <h4 style={color}>First Name : </h4>
                                    </td>
                                    <td style={left}>
                                       &nbsp; {this.state.fname}
                                    </td>

                                </tr>

                                    <tr>
                                        <td>
                                            &nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4 style={color}>Last Name : </h4>
                                        </td>
                                        <td  style={left}>
                                            &nbsp;     {this.state.lname}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            &nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4 style={color}>Address Line 1 : </h4>
                                        </td>
                                        <td  style={left}>
                                            &nbsp; {this.state.add1}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            &nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4 style={color}>Address Line 2 : </h4>
                                        </td>
                                        <td style={left}>
                                            &nbsp; {this.state.add2}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            &nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4 style={color}>City : </h4>
                                        </td>
                                        <td style={left}>
                                            &nbsp; {this.state.city}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            &nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4 style={color}>State : </h4>
                                        </td>
                                        <td style={left}>
                                            &nbsp;{this.state.state}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            &nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4 style={color}>Zip : </h4>
                                        </td>
                                        <td style={left}>
                                            &nbsp;{this.state.zip}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            &nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4 style={color}>Contact No : </h4>
                                        </td>
                                        <td style={left}>
                                            &nbsp;{this.state.contact_no}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            &nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4 style={color}>Email : </h4>
                                        </td>
                                        <td style={left}>
                                            &nbsp;{this.state.email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            &nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            &nbsp;
                                        </td>
                                        <td style={left}>
                                            <button style={btnStyle} className="btn btn-primary btn-block" onClick={() => {this.handleEditProfile()}}>Edit
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            &nbsp;
                                        </td>
                                    </tr>
                                </table>



                                <div className="input-field">

                                </div>
                            </form>



                        </div>
                    </div>
                </div>
            </div>


        );
    }
}
export default withRouter(DisplayProfile);