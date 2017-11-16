import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { Link,Route, withRouter } from 'react-router-dom';
class Message extends Component {

    static propTypes = {
        message: PropTypes.string.isRequired
    };

    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-md-3">
                    {this.props.message && ( //Just a change here
                        <div className="alert alert-warning" role="alert">
                            {this.props.message}
                        </div>
                    )}
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


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Message));