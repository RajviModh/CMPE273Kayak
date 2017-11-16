import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import { FormWithConstraints, FieldFeedbacks, FieldFeedback } from 'react-form-with-constraints';
import {connect} from "react-redux";
import { Link,Route, withRouter } from 'react-router-dom';

class Signup extends Component {

    static propTypes = {
        handleSignUp: PropTypes.func.isRequired
    };


    componentWillMount(){
            //
    }

    handleSignup = (userdata) => {
        //API call
        if(userdata.username == 'Rohan' && userdata.password == 'Rohan'){
            console.log('signed up');
        }
    };

    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-sm-9 col-md-9">
                    <form>
                        <div className="form-group">
                            <hr/>
                            <p>---------------or create a KAYAK account--------------</p>
                        </div>
                        <div className="input-field">
                            <input
                                className="form-control"
                                type="text"
                                label="Username"
                                placeholder="Username"
                                required
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
                                required
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
                                type="submit"
                                onClick={() => this.handleSignup({username: this.props.select.username,password :this.props.select.password})}>
                                Sign Up
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


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Signup));