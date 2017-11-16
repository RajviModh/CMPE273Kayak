import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../css/style.css';
import '../css/bootstrap.css';
import { Link,Route, withRouter } from 'react-router-dom';
import {connect} from "react-redux";


//var abc = {backgroundImage:'../images/cover_bg_1.jpg'};

var textbox = {width:'30px'};

class Login extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    };


    componentWillMount(){
        //
    }

    handleLogin = (userdata) => {
        //API call
        if(userdata.username == 'Rohan' && userdata.password == 'Rohan'){
            console.log('logged in');
        }
    };


    render() {
        return (

            <div className="row justify-content-md-center">
                <div className="col-sm-9 col-md-9">
                    <form>
                        <div className="form-group">
                            <hr/>
                            <p>---------------or continue with KAYAK--------------</p>
                        </div>
                        <div className="input-field">
                            <input
                                className="form-control"
                                type="text"
                                label="Username"
                                placeholder="Username"
                                value={this.props.select.username}
                                onChange={(event) => {
                                    this.props.userChange(event.target.value)
                                }}
                            />
                        </div>
                        <br/>
                        <div className="input-field">
                            <input
                                className="form-control"
                                type="password"
                                label="password"
                                placeholder="Password"
                                value={this.props.select.password}
                                onChange={(event) => {
                                    this.props.passChange(event.target.value)
                                }}
                            />
                        </div>
                        <br/>
                        <div className="input-field">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.handleLogin({username: this.props.select.username,password :this.props.select.password})}>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>



        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return{

        userChange: (username) => {
            dispatch({
                type: "CHANGEUSER",
                payload : {username:username}
            });
        },

        passChange: (password) => {
            dispatch({
                type: "CHANGEPASS",
                payload : {password:password}
            });
        },

    };
};

const mapStateToProps = (state) => {
    return{
        select: state.userReducer
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));