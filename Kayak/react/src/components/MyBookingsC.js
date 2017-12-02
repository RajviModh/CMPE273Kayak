import React, {Component} from 'react';
import axios from "axios";


var padding = {padding:0}

var align = {float:'left'}

var color = {color:"#F78536",'text-align':'right'}

var left = {'text-align':'left'}

var right = {'text-align':'right'}

var btnStyle= {height:40, width:100}

class MyBookingsC extends Component{

    state = {
        flight_bookings:[]
    };

    componentWillMount(){

        axios.get('http://localhost:3001/bookings/my_bookings')
            .then(function (response) {
                console.log("res",response);
                console.log("res data",response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

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
                                <table>
                                    <tr>
                                        <td>
                                            <h4 style={color}>First Name : </h4>
                                        </td>
                                        <td style={left}>
                                            &nbsp;
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
                                            &nbsp;
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
                                            &nbsp;
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
                                            &nbsp;
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
                                            &nbsp;
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
                                            &nbsp;
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
                                            &nbsp;
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
                                            &nbsp;
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
                                            &nbsp;
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
                                            <button style={btnStyle} className="btn btn-primary btn-block" onClick={() => this.saveUserProfile(this.state)}>Edit
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
export default MyBookingsC;